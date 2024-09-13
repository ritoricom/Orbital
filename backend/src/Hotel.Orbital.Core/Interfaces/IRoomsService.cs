using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с номерами гостиницы
/// </summary>
public interface IRoomsService
{
    /// <summary>
    /// Получение списка номеров с применением поиска
    /// </summary>
    /// <param name="searchContext">Контекст поиска</param>
    /// <returns>Список номеров</returns>
    Task<List<Room>> GetListWithSearchFilter(GlobalSearchContext searchContext);

    /// <summary>
    /// Получение списка номеров на клиенте
    /// </summary>
    /// <param name="searchContext">Контекст поиска номеров на клиенте</param>
    /// <returns>Список номеров</returns>
    Task<CollectionResult<Room>> GetClientList(ClientSearchContext searchContext);
    
    /// <summary>
    /// Получение списка номеров
    /// </summary>
    /// <param name="searchContext">Контекст поиска номеров</param>
    /// <returns>Список номеров</returns>
    Task<CollectionResult<Room>> GetList(RoomsSearchContext searchContext);

    /// <summary>
    /// Получение номера
    /// </summary>
    /// <param name="id">Идентификатор номера</param>
    /// <returns>Номер</returns>
    Task<Room> Get(Guid id);

    /// <summary>
    /// Редактирование обложки номера
    /// </summary>
    /// <param name="id">Идентификатор номера</param>
    /// <param name="parameters">Параметры для редактирования обложки</param>
    Task Update(Guid id, RoomUpdateParameters parameters);
}