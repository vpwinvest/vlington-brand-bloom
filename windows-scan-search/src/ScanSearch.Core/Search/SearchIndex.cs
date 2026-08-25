using System.Globalization;
using System.Text;
using Microsoft.Data.Sqlite;
using ScanSearch.Core.Models;

namespace ScanSearch.Core.Search;

/// <summary>
/// Persists indexed documents and their OCR text in a local SQLite FTS5 full-text index,
/// and answers search queries against it. One instance owns one connection and is safe to
/// share; SQLite serializes writes internally.
/// </summary>
public sealed class SearchIndex : IDisposable
{
    private readonly SqliteConnection _connection;
    private readonly object _writeLock = new();

    public SearchIndex(string databasePath)
    {
        var directory = Path.GetDirectoryName(databasePath);
        if (!string.IsNullOrEmpty(directory))
        {
            Directory.CreateDirectory(directory);
        }

        _connection = new SqliteConnection($"Data Source={databasePath}");
        _connection.Open();
        Initialize();
    }

    private void Initialize()
    {
        using var command = _connection.CreateCommand();
        command.CommandText = """
            CREATE VIRTUAL TABLE IF NOT EXISTS documents USING fts5(
                path UNINDEXED,
                file_name,
                content,
                size_bytes UNINDEXED,
                last_modified_utc UNINDEXED,
                page_count UNINDEXED,
                indexed_at_utc UNINDEXED,
                tokenize = 'unicode61 remove_diacritics 2'
            );
            """;
        command.ExecuteNonQuery();
    }

    public int DocumentCount()
    {
        using var command = _connection.CreateCommand();
        command.CommandText = "SELECT COUNT(*) FROM documents;";
        return Convert.ToInt32(command.ExecuteScalar());
    }

    public bool TryGetLastModified(string path, out DateTime lastModifiedUtc)
    {
        using var command = _connection.CreateCommand();
        command.CommandText = "SELECT last_modified_utc FROM documents WHERE path = $path LIMIT 1;";
        command.Parameters.AddWithValue("$path", path);
        var result = command.ExecuteScalar() as string;
        if (result is null)
        {
            lastModifiedUtc = default;
            return false;
        }

        lastModifiedUtc = DateTime.Parse(result, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind);
        return true;
    }

    public void Upsert(IndexedDocument document)
    {
        lock (_writeLock)
        {
            using var transaction = _connection.BeginTransaction();

            using (var delete = _connection.CreateCommand())
            {
                delete.Transaction = transaction;
                delete.CommandText = "DELETE FROM documents WHERE path = $path;";
                delete.Parameters.AddWithValue("$path", document.Path);
                delete.ExecuteNonQuery();
            }

            using (var insert = _connection.CreateCommand())
            {
                insert.Transaction = transaction;
                insert.CommandText = """
                    INSERT INTO documents (path, file_name, content, size_bytes, last_modified_utc, page_count, indexed_at_utc)
                    VALUES ($path, $file_name, $content, $size_bytes, $last_modified_utc, $page_count, $indexed_at_utc);
                    """;
                insert.Parameters.AddWithValue("$path", document.Path);
                insert.Parameters.AddWithValue("$file_name", document.FileName);
                insert.Parameters.AddWithValue("$content", document.Content);
                insert.Parameters.AddWithValue("$size_bytes", document.SizeBytes);
                insert.Parameters.AddWithValue("$last_modified_utc", document.LastModifiedUtc.ToString("O"));
                insert.Parameters.AddWithValue("$page_count", document.PageCount);
                insert.Parameters.AddWithValue("$indexed_at_utc", document.IndexedAtUtc.ToString("O"));
                insert.ExecuteNonQuery();
            }

            transaction.Commit();
        }
    }

    public void Remove(string path)
    {
        lock (_writeLock)
        {
            using var command = _connection.CreateCommand();
            command.CommandText = "DELETE FROM documents WHERE path = $path;";
            command.Parameters.AddWithValue("$path", path);
            command.ExecuteNonQuery();
        }
    }

    public IReadOnlyList<SearchResult> Search(string query, int maxResults = 100)
    {
        var ftsQuery = BuildMatchExpression(query);
        if (ftsQuery is null)
        {
            return Array.Empty<SearchResult>();
        }

        using var command = _connection.CreateCommand();
        command.CommandText = """
            SELECT path, file_name, size_bytes, last_modified_utc, page_count,
                   snippet(documents, 2, '⟪', '⟫', ' … ', 12) AS snippet
            FROM documents
            WHERE documents MATCH $query
            ORDER BY bm25(documents)
            LIMIT $limit;
            """;
        command.Parameters.AddWithValue("$query", ftsQuery);
        command.Parameters.AddWithValue("$limit", maxResults);

        var results = new List<SearchResult>();
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            results.Add(new SearchResult
            {
                Path = reader.GetString(0),
                FileName = reader.GetString(1),
                SizeBytes = reader.GetInt64(2),
                LastModifiedUtc = DateTime.Parse(reader.GetString(3), CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind),
                PageCount = reader.GetInt32(4),
                Snippet = reader.GetString(5),
            });
        }

        return results;
    }

    /// <summary>Turns free-text user input into a safe FTS5 MATCH expression: every
    /// whitespace-separated token becomes a quoted, prefix-matched term, all required (AND).</summary>
    internal static string? BuildMatchExpression(string userQuery)
    {
        var tokens = userQuery
            .Split((char[]?)null, StringSplitOptions.RemoveEmptyEntries)
            .Select(SanitizeToken)
            .Where(t => t.Length > 0)
            .ToArray();

        if (tokens.Length == 0)
        {
            return null;
        }

        var builder = new StringBuilder();
        for (var i = 0; i < tokens.Length; i++)
        {
            if (i > 0) builder.Append(" AND ");
            builder.Append('"').Append(tokens[i]).Append("\"*");
        }

        return builder.ToString();
    }

    private static string SanitizeToken(string token) => token.Replace("\"", string.Empty);

    public void Dispose() => _connection.Dispose();
}
