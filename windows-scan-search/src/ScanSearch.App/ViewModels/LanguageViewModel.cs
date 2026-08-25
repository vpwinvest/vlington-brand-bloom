using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ScanSearch.Core.Language;

namespace ScanSearch.App.ViewModels;

public sealed partial class LanguageViewModel : ObservableObject
{
    private readonly LanguageDataService _languageDataService;
    private readonly Action _onChanged;

    public LanguageViewModel(OcrLanguage language, LanguageDataService languageDataService, Action onChanged)
    {
        Language = language;
        _languageDataService = languageDataService;
        _onChanged = onChanged;
        IsInstalled = languageDataService.IsLanguageInstalled(language.Code);
    }

    public OcrLanguage Language { get; }
    public string DisplayName => Language.DisplayName;

    [ObservableProperty]
    private bool isInstalled;

    [ObservableProperty]
    private bool isDownloading;

    [ObservableProperty]
    private double downloadProgress;

    [ObservableProperty]
    private string? errorMessage;

    [RelayCommand]
    private async Task DownloadAsync()
    {
        if (IsInstalled || IsDownloading) return;

        IsDownloading = true;
        ErrorMessage = null;
        try
        {
            var progress = new Progress<double>(p => DownloadProgress = p * 100);
            await _languageDataService.DownloadLanguageAsync(Language.Code, progress, CancellationToken.None);
            IsInstalled = true;
            _onChanged();
        }
        catch (Exception ex)
        {
            ErrorMessage = $"Falha ao descarregar: {ex.Message}";
        }
        finally
        {
            IsDownloading = false;
        }
    }
}
