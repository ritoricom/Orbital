using Core.Enums;
using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с журналом изменений
/// </summary>
public interface IChangeLogService
{
    /// <summary>
    /// Получение журнала изменений
    /// </summary>
    /// <param name="searchContext">Контекст поиска журнала изменений</param>
    /// <returns>Журнал изменений</returns>
    Task<CollectionResult<ChangeLog>> GetList(ChangeLogSearchContext searchContext);

    /// <summary>
    /// Добаление записи в журнал изменений
    /// </summary>
    /// <param name="logEvent">Событие, которое нужно логировать</param>
    /// <param name="message">Сообщение об изменении</param>
    /// <param name="userId">Идентификатор пользователя</param>
    Task Create(LoggingEvents logEvent, string? message = null, Guid? userId = null);
}