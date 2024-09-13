using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с изображениями гостиницы
/// </summary>
public interface IHotelImagesService
{
    /// <summary>
    /// Получение списка изображений гостиницы
    /// </summary>
    /// <param name="searchContext">Контекст поиска изображений гостиницы</param>
    /// <returns>Список изображений гостиницы</returns>
    Task<CollectionResult<Image>> GetList(HotelImagesSearchContext searchContext);

    /// <summary>
    /// Добавление изображения к гостинице
    /// </summary>
    /// <param name="parameters">Параметры для добавления изображения</param>
    Task Add(HotelImageAddParameters parameters);

    /// <summary>
    /// Удаление изображение
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    Task Delete(Guid id);
}