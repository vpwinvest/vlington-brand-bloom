namespace ScanSearch.Core.Scanning;

/// <summary>Recursively finds scan files (images and PDFs) under a folder.</summary>
public sealed class FolderScanner
{
    public static readonly IReadOnlyCollection<string> SupportedExtensions =
        new[] { ".pdf", ".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp" };

    public IEnumerable<string> FindScanFiles(string rootFolder)
    {
        if (!Directory.Exists(rootFolder))
        {
            yield break;
        }

        var pending = new Stack<string>();
        pending.Push(rootFolder);

        while (pending.Count > 0)
        {
            var current = pending.Pop();

            IEnumerable<string> subDirectories;
            try
            {
                subDirectories = Directory.EnumerateDirectories(current);
            }
            catch (UnauthorizedAccessException)
            {
                continue;
            }
            catch (IOException)
            {
                continue;
            }

            foreach (var dir in subDirectories)
            {
                pending.Push(dir);
            }

            IEnumerable<string> files;
            try
            {
                files = Directory.EnumerateFiles(current);
            }
            catch (UnauthorizedAccessException)
            {
                continue;
            }
            catch (IOException)
            {
                continue;
            }

            foreach (var file in files)
            {
                var extension = Path.GetExtension(file).ToLowerInvariant();
                if (SupportedExtensions.Contains(extension))
                {
                    yield return file;
                }
            }
        }
    }
}
