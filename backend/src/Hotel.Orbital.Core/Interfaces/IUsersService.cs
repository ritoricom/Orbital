using Core.Models;
using Core.SearchContexts;
using Entities;

namespace Core.Interfaces;

/// <summary>
/// Интерфейс для работы с пользователями
/// </summary>
public interface IUsersService
{
    /// <summary>
    /// Получение списка пользователей
    /// </summary>
    /// <param name="searchContext">Контекст поиска пользователей</param>
    /// <returns>Список пользователей</returns>
    Task<CollectionResult<User>> GetList(UsersSearchContext searchContext);

    /// <summary>
    /// Получение пользователя
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    /// <returns>Пользователь</returns>
    Task<User> Get(Guid id);

    // Тем более, что классы параметров уже есть)
    /// <summary>
    /// Создание пользователя
    /// </summary>
    /// <param name="parameters">Параметры для создания пользователя</param>
    Task Create(UserCreateParameters parameters);

    /// <summary>
    /// Редактирование пользователя
    /// </summary>
    /// <param name="id">Идентфикатор пользователя</param>
    /// <param name="parameters">Параметры для редактирования пользователя</param>
    Task Update(Guid id, UserUpdateParameters parameters);
    
    /// <summary>
    /// Редактирование пароля пользователя
    /// </summary>
    /// <param name="id">Идентфикатор пользователя</param>
    /// <param name="parameters">Параметры для редактирования пароля пользователя</param>
    Task UpdatePassword(Guid id, PasswordUpdateParameters parameters);

    /// <summary>
    /// Удаление пользователя по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    Task Delete(Guid id);
}