namespace ScanSearch.Core.Ocr;

/// <summary>Recognizes text inside a single page image (PNG/JPEG/BMP/TIFF bytes).</summary>
public interface IOcrEngine
{
    /// <summary>Languages this engine can currently recognize (e.g. "eng", "por"), based on the
    /// trained-data files that are actually present on disk.</summary>
    IReadOnlyCollection<string> AvailableLanguages { get; }

    Task<string> RecognizeAsync(byte[] imageBytes, CancellationToken cancellationToken);
}
