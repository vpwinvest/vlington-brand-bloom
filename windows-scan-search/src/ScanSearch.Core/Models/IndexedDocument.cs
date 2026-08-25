namespace ScanSearch.Core.Models;

/// <summary>A single scanned file (image or PDF) tracked by the index.</summary>
public sealed class IndexedDocument
{
    public required string Path { get; init; }
    public required string FileName { get; init; }
    public required string Extension { get; init; }
    public required long SizeBytes { get; init; }
    public required DateTime LastModifiedUtc { get; init; }
    public required int PageCount { get; init; }
    public required string Content { get; init; }
    public required DateTime IndexedAtUtc { get; init; }
}

/// <summary>A search hit: the document plus a highlighted snippet of the matching text.</summary>
public sealed class SearchResult
{
    public required string Path { get; init; }
    public required string FileName { get; init; }
    public required string Snippet { get; init; }
    public required int PageCount { get; init; }
    public required DateTime LastModifiedUtc { get; init; }
    public required long SizeBytes { get; init; }
}
