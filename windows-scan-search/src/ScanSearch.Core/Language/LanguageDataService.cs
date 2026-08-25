namespace ScanSearch.Core.Language;

public sealed record OcrLanguage(string Code, string DisplayName);

/// <summary>
/// Manages the Tesseract trained-data (*.traineddata) files the OCR engine needs.
/// Files live in a local folder (typically %LOCALAPPDATA%\ScanSearch\tessdata) and are
/// downloaded on demand from the official tesseract-ocr "tessdata_fast" dataset, since they
/// are too large (a few MB each) to bundle inside the application installer by default.
/// </summary>
public sealed class LanguageDataService
{
    public static readonly IReadOnlyList<OcrLanguage> SupportedLanguages =
    [
        new OcrLanguage("por", "Português"),
        new OcrLanguage("eng", "Inglês"),
        new OcrLanguage("spa", "Espanhol"),
        new OcrLanguage("fra", "Francês"),
        new OcrLanguage("deu", "Alemão"),
    ];

    private const string BaseUrl = "https://raw.githubusercontent.com/tesseract-ocr/tessdata_fast/main/";

    private readonly string _tessDataDirectory;
    private readonly HttpClient _httpClient;

    public LanguageDataService(string tessDataDirectory, HttpClient? httpClient = null)
    {
        _tessDataDirectory = tessDataDirectory;
        _httpClient = httpClient ?? new HttpClient();
        Directory.CreateDirectory(_tessDataDirectory);
    }

    public bool IsLanguageInstalled(string code) =>
        File.Exists(Path.Combine(_tessDataDirectory, code + ".traineddata"));

    public IReadOnlyCollection<string> GetInstalledLanguages() =>
        Directory.Exists(_tessDataDirectory)
            ? Directory.GetFiles(_tessDataDirectory, "*.traineddata")
                .Select(f => Path.GetFileNameWithoutExtension(f)!)
                .ToArray()
            : Array.Empty<string>();

    public async Task DownloadLanguageAsync(
        string code,
        IProgress<double>? progress,
        CancellationToken cancellationToken)
    {
        var url = BaseUrl + code + ".traineddata";
        var targetPath = Path.Combine(_tessDataDirectory, code + ".traineddata");
        var tempPath = targetPath + ".download";

        using var response = await _httpClient
            .GetAsync(url, HttpCompletionOption.ResponseHeadersRead, cancellationToken)
            .ConfigureAwait(false);
        response.EnsureSuccessStatusCode();

        var totalBytes = response.Content.Headers.ContentLength ?? -1L;
        await using (var source = await response.Content.ReadAsStreamAsync(cancellationToken).ConfigureAwait(false))
        await using (var target = File.Create(tempPath))
        {
            var buffer = new byte[81920];
            long readSoFar = 0;
            int bytesRead;
            while ((bytesRead = await source.ReadAsync(buffer, cancellationToken).ConfigureAwait(false)) > 0)
            {
                await target.WriteAsync(buffer.AsMemory(0, bytesRead), cancellationToken).ConfigureAwait(false);
                readSoFar += bytesRead;
                if (totalBytes > 0)
                {
                    progress?.Report((double)readSoFar / totalBytes);
                }
            }
        }

        File.Move(tempPath, targetPath, overwrite: true);
        progress?.Report(1.0);
    }
}
