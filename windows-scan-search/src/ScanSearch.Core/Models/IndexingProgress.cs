namespace ScanSearch.Core.Models;

public enum IndexingStage
{
    Scanning,
    Processing,
    Completed,
    Cancelled,
}

public sealed class IndexingProgress
{
    public required IndexingStage Stage { get; init; }
    public int FilesDiscovered { get; init; }
    public int FilesProcessed { get; init; }
    public int FilesSkipped { get; init; }
    public int FilesFailed { get; init; }
    public string? CurrentFile { get; init; }
}

public sealed class DocumentIndexingException : Exception
{
    public string FilePath { get; }

    public DocumentIndexingException(string filePath, string message, Exception? inner = null)
        : base(message, inner)
    {
        FilePath = filePath;
    }
}
