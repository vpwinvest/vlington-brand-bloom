using ScanSearch.Core.Rendering;

namespace ScanSearch.Core.Tests.Fakes;

/// <summary>Fakes PDF rasterization by returning one "page" per line of the file's text content,
/// so the indexing pipeline can be exercised without a real PDF or the native PDFium library.</summary>
public sealed class FakePdfPageRenderer : IPdfPageRenderer
{
    public int GetPageCount(string pdfPath) => File.ReadAllLines(pdfPath).Length;

    public IEnumerable<byte[]> RenderPages(string pdfPath, int dpi = 300) =>
        File.ReadAllLines(pdfPath).Select(line => System.Text.Encoding.UTF8.GetBytes(line));
}
