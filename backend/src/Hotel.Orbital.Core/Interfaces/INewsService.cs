using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с новостями
/// </summary>
public interface INewsService
{
    /// <summary>
    /// Получение списка новостей с применением поиска
    /// </summary>
    /// <param name="searchContext">Контекст поиска</param>
    /// <returns>Список новостей</returns>
    Task<List<News>> GetListWithSearchFilter(GlobalSearchContext searchContext);
    
    /// <summary>
    /// Получение списка новостей на клиенте
    /// </summary>
    /// <param name="searchContext">Контекст поиска новостей на клиенте</param>
    /// <returns>Список новостей</returns>
    Task<CollectionResult<News>> GetClientList(ClientSearchContext searchContext);
    
    /// <summary>
    /// Получение списка новостей
    /// </summary>
    /// <param name="searchContext">Контекст поиска новостей</param>
    /// <returns>Список новостей</returns>
    Task<CollectionResult<News>> GetList(NewsSearchContext searchContext);

    /// <summary>
    /// Получение новости по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <returns>Новость</returns>
    Task<News> Get(Guid id);

    /// <summary>
    /// Получение новости с другими новостями
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <param name="searchContext">Контекст поиска вложенных новостей</param>
    /// <returns>Новость в виде <see cref="DtoWithNested{T}"/></returns>
    Task<DtoWithNested<News>> GetWithNested(Guid id, NewsNestedSearchContext searchContext);

    /// <summary>
    /// Создание новости
    /// </summary>
    /// <param name="parameters">Параметры для создания новости</param>
    Task Create(NewsCreateParameters parameters);

    /// <summary>
    /// Редактирование новости
    /// </summary>
    /// <param name="id">Идентифиекатор новости</param>
    /// <param name="parameters">Параметры для радактирования новости</param>
    Task Update(Guid id, NewsUpdateParameters parameters);

    /// <summary>
    /// Удаление новости
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    Task Delete(Guid id);
}