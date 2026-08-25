using PDFtoImage;
using SkiaSharp;

namespace ScanSearch.Core.Rendering;

/// <summary>Rasterizes PDF pages to PNG bytes at a resolution suitable for OCR.</summary>
public interface IPdfPageRenderer
{
    int GetPageCount(string pdfPath);

    IEnumerable<byte[]> RenderPages(string pdfPath, int dpi = 300);
}

public sealed class PdfPageRenderer : IPdfPageRenderer
{
    // PDFtoImage's string-typed overloads expect base64-encoded PDF content, not a file path,
    // so the file is read into memory and passed through the byte[] overloads instead.

    public int GetPageCount(string pdfPath) =>
        Conversion.GetPageCount(File.ReadAllBytes(pdfPath), password: null);

    public IEnumerable<byte[]> RenderPages(string pdfPath, int dpi = 300)
    {
        var pdfBytes = File.ReadAllBytes(pdfPath);
        var options = new RenderOptions { Dpi = dpi };
        foreach (var bitmap in Conversion.ToImages(pdfBytes, password: null, options: options))
        {
            using (bitmap)
            {
                using var data = bitmap.Encode(SKEncodedImageFormat.Png, quality: 100);
                yield return data.ToArray();
            }
        }
    }
}
