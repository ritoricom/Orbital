using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с спецпредложениями
/// </summary>
public interface ISpecialOfferService
{
    /// <summary>
    /// Получение списка спецпредложений с применением поиска
    /// </summary>
    /// <param name="searchContext">Контекст поиска</param>
    /// <returns>Список спецпредложений</returns>
    Task<List<SpecialOffer>> GetListWithSearchFilter(GlobalSearchContext searchContext);
    
    /// <summary>
    /// Получение списка спецпредложений на клиенте
    /// </summary>
    /// <param name="searchContext">Контекст поиска спецпредложений на клиенте</param>
    /// <returns>Список спецпредложений</returns>
    Task<CollectionResult<SpecialOffer>> GetClientList(SpecialOffersClientSearchContext searchContext);
    
    /// <summary>
    /// Получение списка спецпредложений
    /// </summary>
    /// <param name="searchContext">Контекст поиска спецпредложений</param>
    /// <returns>Список спецпредложений</returns>
    Task<CollectionResult<SpecialOffer>> GetList(SpecialOffersSearchContext searchContext);

    /// <summary>
    /// Получение спецпредложения
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <returns>Спецпредложение</returns>
    Task<SpecialOffer> Get(Guid id);

    /// <summary>
    /// Получение спецпредложения с другими спецпредложениями
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <param name="nestedSize">Количество вложенных спецпредложений</param>
    /// <param name="language">Язык</param>
    /// <returns>Спецпредложение в виде <see cref="DtoWithNested{T}"/></returns>
    Task<DtoWithNested<SpecialOffer>> GetWithNested(Guid id, int nestedSize);

    /// <summary>
    /// Создание спецпредложения
    /// </summary>
    /// <param name="parameters">Параметры для создания спецпредложения</param>
    Task Create(SpecialOfferCreateParameters parameters);

    /// <summary>
    /// Редактирование спецпредложения
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <param name="parameters">Параметры для редактирования спецпредложения</param>
    Task Update(Guid id, SpecialOfferUpdateParameters parameters);

    /// <summary>
    /// Удаление спецпредложения
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    Task Delete(Guid id);
}