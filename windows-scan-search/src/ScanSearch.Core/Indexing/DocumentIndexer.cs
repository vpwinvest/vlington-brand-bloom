using System.Text;
using ScanSearch.Core.Models;
using ScanSearch.Core.Ocr;
using ScanSearch.Core.Rendering;
using ScanSearch.Core.Scanning;
using ScanSearch.Core.Search;

namespace ScanSearch.Core.Indexing;

/// <summary>
/// Imports a folder: finds every scan file, extracts its text (OCR for images and PDF pages),
/// and stores the result in the <see cref="SearchIndex"/>. Files whose size and modification
/// date already match what is in the index are skipped, so re-importing the same folder only
/// processes new or changed files.
/// </summary>
public sealed class DocumentIndexer
{
    private static readonly string[] PdfExtensions = [".pdf"];

    private readonly FolderScanner _scanner;
    private readonly IOcrEngine _ocrEngine;
    private readonly IPdfPageRenderer _pdfRenderer;
    private readonly SearchIndex _index;

    public DocumentIndexer(FolderScanner scanner, IOcrEngine ocrEngine, IPdfPageRenderer pdfRenderer, SearchIndex index)
    {
        _scanner = scanner;
        _ocrEngine = ocrEngine;
        _pdfRenderer = pdfRenderer;
        _index = index;
    }

    public async Task ImportFolderAsync(
        string rootFolder,
        IProgress<IndexingProgress> progress,
        CancellationToken cancellationToken)
    {
        var files = _scanner.FindScanFiles(rootFolder).ToList();
        var discovered = files.Count;
        progress.Report(new IndexingProgress { Stage = IndexingStage.Scanning, FilesDiscovered = discovered });

        var processed = 0;
        var skipped = 0;
        var failed = 0;
        var degreeOfParallelism = Math.Max(1, Environment.ProcessorCount / 2);

        await Parallel.ForEachAsync(
            files,
            new ParallelOptions { MaxDegreeOfParallelism = degreeOfParallelism, CancellationToken = cancellationToken },
            async (filePath, ct) =>
            {
                try
                {
                    var info = new FileInfo(filePath);
                    var lastModifiedUtc = info.LastWriteTimeUtc;

                    if (_index.TryGetLastModified(filePath, out var indexedModified) && indexedModified == lastModifiedUtc)
                    {
                        Interlocked.Increment(ref skipped);
                    }
                    else
                    {
                        var (text, pageCount) = await ExtractTextAsync(filePath, ct).ConfigureAwait(false);
                        _index.Upsert(new IndexedDocument
                        {
                            Path = filePath,
                            FileName = Path.GetFileName(filePath),
                            Extension = Path.GetExtension(filePath).ToLowerInvariant(),
                            SizeBytes = info.Length,
                            LastModifiedUtc = lastModifiedUtc,
                            PageCount = pageCount,
                            Content = text,
                            IndexedAtUtc = DateTime.UtcNow,
                        });
                    }
                }
                catch (OperationCanceledException)
                {
                    throw;
                }
                catch (Exception)
                {
                    Interlocked.Increment(ref failed);
                }
                finally
                {
                    var done = Interlocked.Increment(ref processed);
                    progress.Report(new IndexingProgress
                    {
                        Stage = IndexingStage.Processing,
                        FilesDiscovered = discovered,
                        FilesProcessed = done,
                        FilesSkipped = skipped,
                        FilesFailed = failed,
                        CurrentFile = Path.GetFileName(filePath),
                    });
                }
            }).ConfigureAwait(false);

        var finalStage = cancellationToken.IsCancellationRequested ? IndexingStage.Cancelled : IndexingStage.Completed;
        progress.Report(new IndexingProgress
        {
            Stage = finalStage,
            FilesDiscovered = discovered,
            FilesProcessed = processed,
            FilesSkipped = skipped,
            FilesFailed = failed,
        });
    }

    private async Task<(string Text, int PageCount)> ExtractTextAsync(string filePath, CancellationToken cancellationToken)
    {
        var extension = Path.GetExtension(filePath).ToLowerInvariant();

        if (PdfExtensions.Contains(extension))
        {
            var builder = new StringBuilder();
            var pageCount = 0;
            foreach (var pageImage in _pdfRenderer.RenderPages(filePath))
            {
                cancellationToken.ThrowIfCancellationRequested();
                var pageText = await _ocrEngine.RecognizeAsync(pageImage, cancellationToken).ConfigureAwait(false);
                builder.AppendLine(pageText);
                pageCount++;
            }

            return (builder.ToString(), pageCount);
        }

        var imageBytes = await File.ReadAllBytesAsync(filePath, cancellationToken).ConfigureAwait(false);
        var text = await _ocrEngine.RecognizeAsync(imageBytes, cancellationToken).ConfigureAwait(false);
        return (text, 1);
    }
}
