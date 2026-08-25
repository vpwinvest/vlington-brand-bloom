using ScanSearch.Core.Ocr;

namespace ScanSearch.Core.Tests.Fakes;

/// <summary>Returns a deterministic "recognized" string derived from the image bytes, so tests
/// can assert on OCR output without depending on the native Tesseract library.</summary>
public sealed class FakeOcrEngine : IOcrEngine
{
    public int CallCount { get; private set; }
    public IReadOnlyCollection<string> AvailableLanguages { get; } = ["eng"];

    public Task<string> RecognizeAsync(byte[] imageBytes, CancellationToken cancellationToken)
    {
        CallCount++;
        var text = System.Text.Encoding.UTF8.GetString(imageBytes);
        return Task.FromResult(text);
    }
}
