using ScanSearch.Core.Indexing;
using ScanSearch.Core.Models;
using ScanSearch.Core.Scanning;
using ScanSearch.Core.Search;
using ScanSearch.Core.Tests.Fakes;
using Xunit;

namespace ScanSearch.Core.Tests;

public sealed class DocumentIndexerTests : IDisposable
{
    private readonly string _folder;
    private readonly string _dbPath;
    private readonly SearchIndex _index;
    private readonly FakeOcrEngine _ocr = new();
    private readonly DocumentIndexer _indexer;

    public DocumentIndexerTests()
    {
        _folder = Path.Combine(Path.GetTempPath(), $"scansearch-idx-{Guid.NewGuid():N}");
        Directory.CreateDirectory(_folder);
        _dbPath = Path.Combine(Path.GetTempPath(), $"scansearch-idx-{Guid.NewGuid():N}.db");
        _index = new SearchIndex(_dbPath);
        _indexer = new DocumentIndexer(new FolderScanner(), _ocr, new FakePdfPageRenderer(), _index);
    }

    [Fact]
    public async Task ImportFolderAsync_IndexesImageAndPdfFiles()
    {
        File.WriteAllText(Path.Combine(_folder, "recibo.jpg"), "Recibo de pagamento mensal");
        File.WriteAllText(Path.Combine(_folder, "contrato.pdf"), "Página um do contrato\nPágina dois do contrato");

        var progressReports = new List<IndexingProgress>();
        await _indexer.ImportFolderAsync(_folder, new Progress<IndexingProgress>(progressReports.Add), CancellationToken.None);

        Assert.Equal(2, _index.DocumentCount());
        Assert.Single(_index.Search("recibo"));
        Assert.Single(_index.Search("contrato"));

        var pdfResult = _index.Search("contrato").Single();
        Assert.Equal(2, pdfResult.PageCount);

        Assert.Contains(progressReports, p => p.Stage == IndexingStage.Completed);
    }

    [Fact]
    public async Task ImportFolderAsync_ReImportingUnchangedFile_SkipsOcr()
    {
        var filePath = Path.Combine(_folder, "recibo.jpg");
        File.WriteAllText(filePath, "Recibo de pagamento mensal");

        await _indexer.ImportFolderAsync(_folder, new Progress<IndexingProgress>(_ => { }), CancellationToken.None);
        var callsAfterFirstImport = _ocr.CallCount;

        await _indexer.ImportFolderAsync(_folder, new Progress<IndexingProgress>(_ => { }), CancellationToken.None);

        Assert.Equal(callsAfterFirstImport, _ocr.CallCount);
        Assert.Equal(1, _index.DocumentCount());
    }

    [Fact]
    public async Task ImportFolderAsync_ModifiedFile_IsReIndexed()
    {
        var filePath = Path.Combine(_folder, "recibo.jpg");
        File.WriteAllText(filePath, "Texto original");
        await _indexer.ImportFolderAsync(_folder, new Progress<IndexingProgress>(_ => { }), CancellationToken.None);

        File.SetLastWriteTimeUtc(filePath, DateTime.UtcNow.AddMinutes(5));
        File.WriteAllText(filePath, "Texto atualizado");
        await _indexer.ImportFolderAsync(_folder, new Progress<IndexingProgress>(_ => { }), CancellationToken.None);

        Assert.Empty(_index.Search("original"));
        Assert.Single(_index.Search("atualizado"));
    }

    public void Dispose()
    {
        _index.Dispose();
        if (Directory.Exists(_folder)) Directory.Delete(_folder, recursive: true);
        if (File.Exists(_dbPath)) File.Delete(_dbPath);
    }
}
