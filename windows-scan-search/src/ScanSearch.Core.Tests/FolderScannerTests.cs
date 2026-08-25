using ScanSearch.Core.Scanning;
using Xunit;

namespace ScanSearch.Core.Tests;

public sealed class FolderScannerTests : IDisposable
{
    private readonly string _root;

    public FolderScannerTests()
    {
        _root = Path.Combine(Path.GetTempPath(), $"scansearch-scan-{Guid.NewGuid():N}");
        Directory.CreateDirectory(_root);
    }

    [Fact]
    public void FindScanFiles_ReturnsOnlySupportedExtensions_Recursively()
    {
        var subFolder = Path.Combine(_root, "2024", "faturas");
        Directory.CreateDirectory(subFolder);

        File.WriteAllText(Path.Combine(_root, "doc.pdf"), "x");
        File.WriteAllText(Path.Combine(_root, "photo.jpg"), "x");
        File.WriteAllText(Path.Combine(_root, "notes.txt"), "x");
        File.WriteAllText(Path.Combine(subFolder, "scan.PNG"), "x");
        File.WriteAllText(Path.Combine(subFolder, "readme.md"), "x");

        var found = new FolderScanner().FindScanFiles(_root).Select(Path.GetFileName).ToHashSet();

        Assert.Equal(new HashSet<string?> { "doc.pdf", "photo.jpg", "scan.PNG" }, found);
    }

    [Fact]
    public void FindScanFiles_OnMissingFolder_ReturnsEmpty()
    {
        var missing = Path.Combine(_root, "does-not-exist");

        Assert.Empty(new FolderScanner().FindScanFiles(missing));
    }

    public void Dispose()
    {
        if (Directory.Exists(_root)) Directory.Delete(_root, recursive: true);
    }
}
