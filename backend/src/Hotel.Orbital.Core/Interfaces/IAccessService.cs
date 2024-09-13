using Entities;
using Entities.Enums;

namespace Core.Interfaces;

/// <summary>
/// Сервис проверки доступов
/// </summary>
public interface IAccessService
{
    /// <summary>
    /// Получение пользователя из контекста запроса
    /// </summary>
    /// <returns>Пользователь</returns>
    Task<User?> GetUserFromContext();

    /// <summary>
    /// Подтверждение доступа пользователя
    /// </summary>
    /// <param name="city">Город</param>
    Task AssertAccessOrThrow(City? city);
}