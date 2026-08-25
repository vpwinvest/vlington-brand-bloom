using System.Net;
using ScanSearch.Core.Language;
using Xunit;

namespace ScanSearch.Core.Tests;

public sealed class LanguageDataServiceTests : IDisposable
{
    private readonly string _tessDataDir;

    public LanguageDataServiceTests()
    {
        _tessDataDir = Path.Combine(Path.GetTempPath(), $"scansearch-lang-{Guid.NewGuid():N}");
    }

    [Fact]
    public void IsLanguageInstalled_FalseWhenFileMissing()
    {
        var service = new LanguageDataService(_tessDataDir);

        Assert.False(service.IsLanguageInstalled("por"));
    }

    [Fact]
    public async Task DownloadLanguageAsync_SavesFileAndReportsProgress()
    {
        var fakeBytes = new byte[500_000];
        Random.Shared.NextBytes(fakeBytes);
        var handler = new StubHttpMessageHandler(fakeBytes);
        var httpClient = new HttpClient(handler);
        var service = new LanguageDataService(_tessDataDir, httpClient);

        var progressValues = new List<double>();
        await service.DownloadLanguageAsync("por", new Progress<double>(progressValues.Add), CancellationToken.None);

        Assert.True(service.IsLanguageInstalled("por"));
        var savedBytes = File.ReadAllBytes(Path.Combine(_tessDataDir, "por.traineddata"));
        Assert.Equal(fakeBytes, savedBytes);
        Assert.Contains(progressValues, p => p >= 0.99);
        Assert.Contains("por.traineddata", handler.RequestedUrl);
    }

    [Fact]
    public async Task DownloadLanguageAsync_OnHttpError_ThrowsAndLeavesNoFile()
    {
        var handler = new StubHttpMessageHandler(HttpStatusCode.NotFound);
        var service = new LanguageDataService(_tessDataDir, new HttpClient(handler));

        await Assert.ThrowsAsync<HttpRequestException>(
            () => service.DownloadLanguageAsync("xyz", null, CancellationToken.None));

        Assert.False(service.IsLanguageInstalled("xyz"));
    }

    private sealed class StubHttpMessageHandler : HttpMessageHandler
    {
        private readonly byte[]? _content;
        private readonly HttpStatusCode _statusCode;
        public string? RequestedUrl { get; private set; }

        public StubHttpMessageHandler(byte[] content)
        {
            _content = content;
            _statusCode = HttpStatusCode.OK;
        }

        public StubHttpMessageHandler(HttpStatusCode statusCode)
        {
            _statusCode = statusCode;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            RequestedUrl = request.RequestUri!.ToString();
            var response = new HttpResponseMessage(_statusCode);
            if (_content is not null)
            {
                response.Content = new ByteArrayContent(_content);
            }

            return Task.FromResult(response);
        }
    }

    public void Dispose()
    {
        if (Directory.Exists(_tessDataDir)) Directory.Delete(_tessDataDir, recursive: true);
    }
}
