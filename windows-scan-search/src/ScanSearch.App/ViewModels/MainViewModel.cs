using System.Collections.ObjectModel;
using Avalonia.Media.Imaging;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ScanSearch.Core.Indexing;
using ScanSearch.Core.Language;
using ScanSearch.Core.Models;
using ScanSearch.Core.Ocr;
using ScanSearch.Core.Rendering;
using ScanSearch.Core.Scanning;
using ScanSearch.Core.Search;

namespace ScanSearch.App.ViewModels;

public sealed partial class MainViewModel : ObservableObject, IDisposable
{
    private readonly string _appDataDirectory;
    private readonly string _tessDataDirectory;
    private readonly SearchIndex _searchIndex;
    private readonly LanguageDataService _languageDataService;
    private readonly FolderScanner _folderScanner = new();
    private readonly IPdfPageRenderer _pdfPageRenderer = new PdfPageRenderer();

    private CancellationTokenSource? _importCancellation;

    public MainViewModel()
    {
        _appDataDirectory = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "ScanSearch");
        _tessDataDirectory = Path.Combine(_appDataDirectory, "tessdata");
        Directory.CreateDirectory(_appDataDirectory);

        _searchIndex = new SearchIndex(Path.Combine(_appDataDirectory, "index.db"));
        _languageDataService = new LanguageDataService(_tessDataDirectory);

        Languages = new ObservableCollection<LanguageViewModel>(
            LanguageDataService.SupportedLanguages.Select(
                l => new LanguageViewModel(l, _languageDataService, OnLanguagesChanged)));

        RefreshIndexCount();
    }

    public ObservableCollection<DocumentResultViewModel> Results { get; } = new();
    public ObservableCollection<LanguageViewModel> Languages { get; }

    public bool HasAnyLanguageInstalled => Languages.Any(l => l.IsInstalled);

    [ObservableProperty]
    private string? importedFolderPath;

    [ObservableProperty]
    [NotifyPropertyChangedFor(nameof(HasQuery))]
    private string searchQuery = string.Empty;

    public bool HasQuery => !string.IsNullOrWhiteSpace(SearchQuery);

    [ObservableProperty]
    private DocumentResultViewModel? selectedResult;

    [ObservableProperty]
    private Bitmap? previewImage;

    [ObservableProperty]
    private bool isPreviewLoading;

    [ObservableProperty]
    private bool isIndexing;

    [ObservableProperty]
    private string indexingStatusText = string.Empty;

    [ObservableProperty]
    private double indexingProgressPercent;

    [ObservableProperty]
    private string indexCountText = string.Empty;

    [ObservableProperty]
    private string? statusMessage;

    partial void OnSearchQueryChanged(string value) => RunSearch();

    async partial void OnSelectedResultChanged(DocumentResultViewModel? value)
    {
        PreviewImage = null;
        if (value is null) return;
        await LoadPreviewAsync(value.Result.Path);
    }

    private void RunSearch()
    {
        Results.Clear();
        if (!HasQuery) return;

        foreach (var result in _searchIndex.Search(SearchQuery))
        {
            Results.Add(new DocumentResultViewModel(result));
        }
    }

    public async Task StartImportAsync(string folderPath)
    {
        if (IsIndexing) return;

        if (!HasAnyLanguageInstalled)
        {
            StatusMessage = "Descarregue pelo menos um idioma de OCR antes de importar.";
            return;
        }

        ImportedFolderPath = folderPath;
        IsIndexing = true;
        IndexingProgressPercent = 0;
        IndexingStatusText = "A procurar ficheiros...";
        _importCancellation = new CancellationTokenSource();

        using var ocrEngine = new TesseractOcrEngine(_tessDataDirectory);
        var indexer = new DocumentIndexer(_folderScanner, ocrEngine, _pdfPageRenderer, _searchIndex);
        var progress = new Progress<IndexingProgress>(ReportIndexingProgress);

        try
        {
            await indexer.ImportFolderAsync(folderPath, progress, _importCancellation.Token);
        }
        catch (OperationCanceledException)
        {
            IndexingStatusText = "Importação cancelada.";
        }
        catch (Exception ex)
        {
            IndexingStatusText = $"Erro durante a importação: {ex.Message}";
        }
        finally
        {
            IsIndexing = false;
            RefreshIndexCount();
            RunSearch();
        }
    }

    [RelayCommand]
    private void CancelImport() => _importCancellation?.Cancel();

    private void ReportIndexingProgress(IndexingProgress progress)
    {
        switch (progress.Stage)
        {
            case IndexingStage.Scanning:
                IndexingStatusText = $"{progress.FilesDiscovered} ficheiros encontrados. A processar...";
                break;
            case IndexingStage.Processing:
                IndexingProgressPercent = progress.FilesDiscovered == 0
                    ? 0
                    : 100.0 * progress.FilesProcessed / progress.FilesDiscovered;
                IndexingStatusText =
                    $"{progress.FilesProcessed}/{progress.FilesDiscovered} — {progress.CurrentFile} " +
                    $"(ignorados: {progress.FilesSkipped}, falhas: {progress.FilesFailed})";
                break;
            case IndexingStage.Completed:
                IndexingProgressPercent = 100;
                IndexingStatusText =
                    $"Concluído: {progress.FilesProcessed} processados, {progress.FilesSkipped} sem alterações, " +
                    $"{progress.FilesFailed} com falhas.";
                break;
            case IndexingStage.Cancelled:
                IndexingStatusText = "Importação cancelada.";
                break;
        }
    }

    private void RefreshIndexCount()
    {
        var count = _searchIndex.DocumentCount();
        IndexCountText = count == 1 ? "1 documento indexado" : $"{count} documentos indexados";
    }

    private void OnLanguagesChanged()
    {
        OnPropertyChanged(nameof(HasAnyLanguageInstalled));
    }

    private async Task LoadPreviewAsync(string path)
    {
        IsPreviewLoading = true;
        try
        {
            var bytes = await Task.Run(() => RenderPreviewBytes(path));
            if (bytes is null) return;
            await using var stream = new MemoryStream(bytes);
            PreviewImage = new Bitmap(stream);
        }
        catch
        {
            PreviewImage = null;
        }
        finally
        {
            IsPreviewLoading = false;
        }
    }

    private byte[]? RenderPreviewBytes(string path)
    {
        var extension = Path.GetExtension(path).ToLowerInvariant();
        if (extension == ".pdf")
        {
            return _pdfPageRenderer.RenderPages(path).FirstOrDefault();
        }

        return File.Exists(path) ? File.ReadAllBytes(path) : null;
    }

    public async Task<bool> SaveDocumentCopyAsync(string sourcePath, string destinationPath)
    {
        try
        {
            await using var source = File.OpenRead(sourcePath);
            await using var destination = File.Create(destinationPath);
            await source.CopyToAsync(destination);
            StatusMessage = $"Cópia guardada em: {destinationPath}";
            return true;
        }
        catch (Exception ex)
        {
            StatusMessage = $"Falha ao guardar cópia: {ex.Message}";
            return false;
        }
    }

    public void Dispose()
    {
        _importCancellation?.Cancel();
        _importCancellation?.Dispose();
        _searchIndex.Dispose();
    }
}
