using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с изображениями
/// </summary>
public interface IImagesService
{
    /// <summary>
    /// Получение изображения по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Изображение в виде <see cref="Stream"/></returns>
    Task<Stream> Get(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Загрузка изобраджения
    /// </summary>
    /// <param name="content">Изображение в виде <see cref="Stream"/></param>
    /// <param name="cancellationToken">Токен отмены</param>
    Task<Image> Save(Stream content, CancellationToken cancellationToken = default);

    /// <summary>
    /// Удаление изображения
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    Task Delete(Guid id);
}