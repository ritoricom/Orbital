namespace WebDavImageService.Clients;

/// <summary>
/// Клиент для работы с сервисом хранения изображений
/// </summary>
public interface IWebDavClient : IDisposable
{
    /// <summary>
    /// Получение изображения
    /// </summary>
    /// <param name="id">Идентификатор</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Изображение в виде потока</returns>
    public Task<Stream> GetAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Сохранение изображения
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    /// <param name="content">Изображение в виде потока</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    public Task SaveAsync(Guid id, Stream content, CancellationToken cancellationToken = default);

    /// <summary>
    /// Удаление изображения
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    public Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}