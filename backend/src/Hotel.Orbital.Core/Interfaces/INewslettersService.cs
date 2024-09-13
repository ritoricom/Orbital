using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с рассылкой писем
/// </summary>
public interface INewslettersService
{
    /// <summary>
    /// Получение рассылки города
    /// </summary>
    /// <param name="searchContext">Контекст поиска рассылок</param>
    /// <returns>Список рассылок</returns>
    Task<CollectionResult<Newsletter>> GetList(NewslettersSearchContext searchContext);

    /// <summary>
    /// Получение почты из рассылки по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор рассылки</param>
    /// <returns>Рассылка</returns>
    Task<Newsletter> Get(Guid id);

    /// <summary>
    /// Добавление почты в рассылку
    /// </summary>
    /// <param name="parameters">Параметры для добавления почты в рассылку</param>
    Task Create(NewsletterCreateParameters parameters);

    /// <summary>
    /// Редактирование почты в рассылке
    /// </summary>
    /// <param name="id">Идентификатор почты в рассылки</param>
    /// <param name="parameters">Параметры для редактирования почты в рассылке</param>
    Task Update(Guid id, NewsletterUpdateParameters parameters);

    /// <summary>
    /// Удаление почты из рассылки
    /// </summary>
    /// <param name="id">Идентификатор почты в рассылки</param>
    Task Delete(Guid id);
}