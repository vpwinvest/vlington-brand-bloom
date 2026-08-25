using System.Collections.Concurrent;
using Tesseract;

namespace ScanSearch.Core.Ocr;

/// <summary>
/// OCR engine backed by the native Tesseract library. Trained-data (*.traineddata) files are
/// read from <paramref name="tessDataDirectory"/>; only languages whose file is present are used.
/// TesseractEngine instances are not thread-safe, so a small pool is kept (one engine per worker)
/// and reused across calls instead of recreating the native engine for every page.
/// </summary>
public sealed class TesseractOcrEngine : IOcrEngine, IDisposable
{
    private readonly string _tessDataDirectory;
    private readonly string _languages;
    private readonly ConcurrentBag<TesseractEngine> _pool = new();
    private readonly SemaphoreSlim _poolSlots;
    private bool _disposed;

    public IReadOnlyCollection<string> AvailableLanguages { get; }

    public TesseractOcrEngine(string tessDataDirectory, int maxConcurrency = 0)
    {
        _tessDataDirectory = tessDataDirectory;
        AvailableLanguages = Directory.Exists(tessDataDirectory)
            ? Directory.GetFiles(tessDataDirectory, "*.traineddata")
                .Select(Path.GetFileNameWithoutExtension)
                .Where(name => !string.IsNullOrWhiteSpace(name))
                .Select(name => name!)
                .ToArray()
            : Array.Empty<string>();

        if (AvailableLanguages.Count == 0)
        {
            throw new InvalidOperationException(
                $"Nenhum ficheiro de idioma (*.traineddata) encontrado em '{tessDataDirectory}'. " +
                "Descarregue pelo menos um idioma antes de importar documentos.");
        }

        _languages = string.Join('+', AvailableLanguages);
        var concurrency = maxConcurrency > 0 ? maxConcurrency : Math.Max(1, Environment.ProcessorCount / 2);
        _poolSlots = new SemaphoreSlim(concurrency, concurrency);
    }

    public async Task<string> RecognizeAsync(byte[] imageBytes, CancellationToken cancellationToken)
    {
        await _poolSlots.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            return await Task.Run(() => Recognize(imageBytes), cancellationToken).ConfigureAwait(false);
        }
        finally
        {
            _poolSlots.Release();
        }
    }

    private string Recognize(byte[] imageBytes)
    {
        var engine = RentEngine();
        try
        {
            using var pix = Pix.LoadFromMemory(imageBytes);
            using var page = engine.Process(pix);
            return page.GetText()?.Trim() ?? string.Empty;
        }
        finally
        {
            _pool.Add(engine);
        }
    }

    private TesseractEngine RentEngine()
    {
        if (_pool.TryTake(out var engine))
        {
            return engine;
        }

        return new TesseractEngine(_tessDataDirectory, _languages, EngineMode.Default);
    }

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        while (_pool.TryTake(out var engine))
        {
            engine.Dispose();
        }
        _poolSlots.Dispose();
    }
}
