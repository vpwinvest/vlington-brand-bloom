using ScanSearch.Core.Models;

namespace ScanSearch.App.ViewModels;

public sealed class DocumentResultViewModel
{
    public DocumentResultViewModel(SearchResult result)
    {
        Result = result;
        SnippetSegments = SnippetParser.Parse(result.Snippet);
    }

    public SearchResult Result { get; }

    public string FileName => Result.FileName;
    public string FolderPath => Path.GetDirectoryName(Result.Path) ?? string.Empty;
    public string PageInfo => Result.PageCount == 1 ? "1 página" : $"{Result.PageCount} páginas";
    public string SizeInfo => FormatSize(Result.SizeBytes);
    public string LastModifiedInfo => Result.LastModifiedUtc.ToLocalTime().ToString("dd/MM/yyyy HH:mm");
    public IReadOnlyList<SnippetSegment> SnippetSegments { get; }

    private static string FormatSize(long bytes)
    {
        string[] units = ["B", "KB", "MB", "GB"];
        double size = bytes;
        var unitIndex = 0;
        while (size >= 1024 && unitIndex < units.Length - 1)
        {
            size /= 1024;
            unitIndex++;
        }

        return $"{size:0.#} {units[unitIndex]}";
    }
}
