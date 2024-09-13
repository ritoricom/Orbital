using Core.Models;
using Core.SearchContexts;
using Core.SearchContexts.Abstractions;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис досуга
/// </summary>
public interface ILeisureService
{
    /// <summary>
    /// Получение списка мероприятий досуга с применением поиска
    /// </summary>
    /// <param name="searchContext">Контекст поиска</param>
    /// <returns>Список мероприятий досуга</returns>
    Task<List<Leisure>> GetListWithSearchFilter(GlobalSearchContext searchContext);
    
    /// <summary>
    /// Получение списка досуга
    /// </summary>
    /// <param name="context">Контекст поиска досуга</param>
    /// <returns>Список досуга</returns>
    Task<CollectionResult<Leisure>> GetList(LeisureSearchContext context);

    /// <summary>
    /// Получение списка досуга на клиенте
    /// </summary>
    /// <param name="context">Контекст для пагинации</param>
    /// <returns>Список досуга</returns>
    Task<CollectionResult<Leisure>> GetClientList(PaginationContext context);

    /// <summary>
    /// Получение досуга по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <returns>Досуг</returns>
    Task<Leisure> Get(Guid id);

    /// <summary>
    /// Получение досуга с вложенными элементами
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <param name="nestedSize">Количество вложенных элементов</param>
    /// <returns>Досуг в виде <see cref="DtoWithNested{T}"/></returns>
    Task<DtoWithNested<Leisure>> GetWithNested(Guid id, int nestedSize);

    /// <summary>
    /// Создание досуга
    /// </summary>
    /// <param name="parameters">Параметры для создания досуга</param>
    Task Create(LeisureCreateParameters parameters);
    
    /// <summary>
    /// Редактирование досуга
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <param name="parameters">Параметры для редактирования досуга</param>
    Task Update(Guid id, LeisureUpdateParameters parameters);
    
    /// <summary>
    /// Удаление досуга
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    Task Delete(Guid id);
}