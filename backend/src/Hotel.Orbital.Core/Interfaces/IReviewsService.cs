using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с отзывами
/// </summary>
public interface IReviewsService
{
    /// <summary>
    /// Получение спиcка отзывов на клиенте
    /// </summary>
    /// <param name="searchContext">Контекст поиска отзывов на клиенте</param>
    /// <returns>Список отзывов</returns>
    Task<CollectionResult<Review>> GetClientList(ClientSearchContext searchContext);
    
    /// <summary>
    /// Получение спиcка отзывов
    /// </summary>
    /// <param name="searchContext">Контекст поиска отзывов</param>
    /// <returns>Список отзывов</returns>
    Task<CollectionResult<Review>> GetList(ReviewSearchContext searchContext);

    /// <summary>
    /// Получение отзыва по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <returns>Отзыв</returns>
    Task<Review> Get(Guid id);

    /// <summary>
    /// Создание отзыва
    /// </summary>
    /// <param name="parameters">Параметры для создания отзыва</param>
    Task Create(ReviewCreateParameters parameters);

    /// <summary>
    /// Редактирование отзыва
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <param name="parameters">Параметры для редактирования отзыва</param>
    Task Update(Guid id, ReviewUpdateParameters parameters);

    /// <summary>
    /// Удаление отзыва
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    Task Delete(Guid id);
}