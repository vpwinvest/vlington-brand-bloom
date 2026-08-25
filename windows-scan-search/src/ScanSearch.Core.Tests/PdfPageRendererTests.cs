using ScanSearch.Core.Rendering;
using Xunit;

namespace ScanSearch.Core.Tests;

public sealed class PdfPageRendererTests : IDisposable
{
    private readonly string _pdfPath;

    public PdfPageRendererTests()
    {
        _pdfPath = Path.Combine(Path.GetTempPath(), $"scansearch-{Guid.NewGuid():N}.pdf");
        File.WriteAllBytes(_pdfPath, MinimalOnePagePdf.Bytes);
    }

    [Fact]
    public void GetPageCount_ReturnsOneForSinglePagePdf()
    {
        Assert.Equal(1, new PdfPageRenderer().GetPageCount(_pdfPath));
    }

    [Fact]
    public void RenderPages_ProducesOneNonEmptyPngImage()
    {
        var pages = new PdfPageRenderer().RenderPages(_pdfPath).ToList();

        Assert.Single(pages);
        Assert.True(pages[0].Length > 0);
        // PNG signature.
        Assert.Equal(new byte[] { 0x89, 0x50, 0x4E, 0x47 }, pages[0].Take(4));
    }

    public void Dispose()
    {
        if (File.Exists(_pdfPath)) File.Delete(_pdfPath);
    }
}

/// <summary>A hand-written, minimal valid single blank-page PDF (no fonts/content needed),
/// used to exercise the real PDFium-backed renderer without shipping a binary test fixture.</summary>
internal static class MinimalOnePagePdf
{
    public static readonly byte[] Bytes = System.Text.Encoding.ASCII.GetBytes("""
        %PDF-1.4
        1 0 obj
        << /Type /Catalog /Pages 2 0 R >>
        endobj
        2 0 obj
        << /Type /Pages /Kids [3 0 R] /Count 1 >>
        endobj
        3 0 obj
        << /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] >>
        endobj
        xref
        0 4
        0000000000 65535 f
        0000000009 00000 n
        0000000058 00000 n
        0000000115 00000 n
        trailer
        << /Size 4 /Root 1 0 R >>
        startxref
        190
        %%EOF
        """);
}
