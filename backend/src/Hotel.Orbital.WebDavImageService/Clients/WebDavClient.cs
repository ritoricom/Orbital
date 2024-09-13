using System.Net;
using System.Net.Http.Headers;
using System.Text;
using WebDavImageService.Models;

namespace WebDavImageService.Clients;

/// <inheritdoc cref="IWebDavClient"/>
public class WebDavClient : IWebDavClient
{
    /// <summary/>
    private readonly HttpClient _client;

    /// <summary/>
    public WebDavClient(WebDavOptions options)
    {
        _client = new HttpClient();
        _client.BaseAddress = new Uri(options.ServerUri);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
            "Basic",
            Convert.ToBase64String(Encoding.ASCII.GetBytes($"{options.Username}:{options.Password}"))
        );

    }
    
    /// <inheritdoc/>
    public async Task<Stream> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var response = await _client.GetAsync(id.ToString(), cancellationToken);

        return response.IsSuccessStatusCode
            ? await response.Content.ReadAsStreamAsync(cancellationToken)
            : throw new InvalidOperationException($"Ошибка получения изображения: {response.StatusCode}");
    }
    
    /// <inheritdoc/>
    public async Task SaveAsync(Guid id, Stream content, CancellationToken cancellationToken = default)
    {
        var response = await _client.PutAsync(id.ToString(), new StreamContent(content), cancellationToken);

        if (response.StatusCode != HttpStatusCode.Created)
            throw new InvalidOperationException($"Ошибка загрузки изображения: {response.StatusCode}");
    }
    
    /// <inheritdoc/>
    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var response = await _client.DeleteAsync(id.ToString(), cancellationToken);
        
        if (response.StatusCode != HttpStatusCode.NoContent)
            throw new InvalidOperationException($"Ошибка удаления изображения: {response.StatusCode}");
    }
    
    /// <inheritdoc />
    public void Dispose() => _client.Dispose();
}