using ScanSearch.Core.Models;
using ScanSearch.Core.Search;
using Xunit;

namespace ScanSearch.Core.Tests;

public sealed class SearchIndexTests : IDisposable
{
    private readonly string _dbPath;
    private readonly SearchIndex _index;

    public SearchIndexTests()
    {
        _dbPath = Path.Combine(Path.GetTempPath(), $"scansearch-test-{Guid.NewGuid():N}.db");
        _index = new SearchIndex(_dbPath);
    }

    [Fact]
    public void Search_FindsDocumentByContent()
    {
        _index.Upsert(Doc("C:/scans/fatura-2024.pdf", "Fatura número 12345 referente ao contrato de arrendamento"));

        var results = _index.Search("contrato");

        Assert.Single(results);
        Assert.Equal("fatura-2024.pdf", results[0].FileName);
        Assert.Contains('⟪', results[0].Snippet);
    }

    [Fact]
    public void Search_IsCaseInsensitive()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Documento Confidencial"));

        Assert.Single(_index.Search("confidencial"));
        Assert.Single(_index.Search("CONFIDENCIAL"));
    }

    [Fact]
    public void Search_IgnoresDiacritics()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Informação sobre a sustentabilidade do projeto"));

        Assert.Single(_index.Search("informacao"));
        Assert.Single(_index.Search("sustentabilidade"));
    }

    [Fact]
    public void Search_SupportsPrefixMatching()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Certificado energético da fração autónoma"));

        Assert.Single(_index.Search("certif"));
    }

    [Fact]
    public void Search_RequiresAllTerms()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Contrato de compra e venda"));
        _index.Upsert(Doc("C:/scans/b.pdf", "Contrato de arrendamento"));

        var results = _index.Search("contrato arrendamento");

        Assert.Single(results);
        Assert.Equal("b.pdf", results[0].FileName);
    }

    [Fact]
    public void Search_WithBlankQuery_ReturnsNoResults()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Qualquer texto"));

        Assert.Empty(_index.Search("   "));
    }

    [Fact]
    public void Upsert_SamePathTwice_ReplacesPreviousEntry()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Versão antiga do documento"));
        _index.Upsert(Doc("C:/scans/a.pdf", "Versão nova do documento"));

        Assert.Equal(1, _index.DocumentCount());
        Assert.Empty(_index.Search("antiga"));
        Assert.Single(_index.Search("nova"));
    }

    [Fact]
    public void TryGetLastModified_ReflectsStoredValue()
    {
        var timestamp = new DateTime(2026, 1, 15, 10, 30, 0, DateTimeKind.Utc);
        _index.Upsert(new IndexedDocument
        {
            Path = "C:/scans/a.pdf",
            FileName = "a.pdf",
            Extension = ".pdf",
            SizeBytes = 100,
            LastModifiedUtc = timestamp,
            PageCount = 1,
            Content = "texto",
            IndexedAtUtc = DateTime.UtcNow,
        });

        Assert.True(_index.TryGetLastModified("C:/scans/a.pdf", out var stored));
        Assert.Equal(timestamp, stored);
        Assert.False(_index.TryGetLastModified("C:/scans/missing.pdf", out _));
    }

    [Fact]
    public void Remove_DeletesDocumentFromIndex()
    {
        _index.Upsert(Doc("C:/scans/a.pdf", "Texto qualquer"));
        _index.Remove("C:/scans/a.pdf");

        Assert.Equal(0, _index.DocumentCount());
    }

    private static IndexedDocument Doc(string path, string content) => new()
    {
        Path = path,
        FileName = Path.GetFileName(path),
        Extension = Path.GetExtension(path),
        SizeBytes = 1024,
        LastModifiedUtc = DateTime.UtcNow,
        PageCount = 1,
        Content = content,
        IndexedAtUtc = DateTime.UtcNow,
    };

    public void Dispose()
    {
        _index.Dispose();
        if (File.Exists(_dbPath)) File.Delete(_dbPath);
    }
}
