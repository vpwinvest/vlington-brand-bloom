namespace ScanSearch.App.ViewModels;

public sealed record SnippetSegment(string Text, bool IsMatch);

public static class SnippetParser
{
    private const char OpenMarker = '⟪';
    private const char CloseMarker = '⟫';

    /// <summary>Splits a snippet produced by SearchIndex (which wraps matches in ⟪⟫) into
    /// plain/highlighted segments for rendering.</summary>
    public static IReadOnlyList<SnippetSegment> Parse(string snippet)
    {
        var segments = new List<SnippetSegment>();
        var buffer = new System.Text.StringBuilder();
        var inMatch = false;

        foreach (var ch in snippet)
        {
            if (ch == OpenMarker || ch == CloseMarker)
            {
                if (buffer.Length > 0)
                {
                    segments.Add(new SnippetSegment(buffer.ToString(), inMatch));
                    buffer.Clear();
                }
                inMatch = ch == OpenMarker;
            }
            else
            {
                buffer.Append(ch);
            }
        }

        if (buffer.Length > 0)
        {
            segments.Add(new SnippetSegment(buffer.ToString(), inMatch));
        }

        return segments;
    }
}
