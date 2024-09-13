using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Interfaces;

/// <summary>
/// Сервис для работы с контактами
/// </summary>
public interface IContactsService
{
    /// <summary>
    /// Получение контактов
    /// </summary>
    /// <param name="city">Город</param>
    /// <returns>Контакты</returns>
    Task<Contacts> Get(City city);

    /// <summary>
    /// Редактироване контактов
    /// </summary>
    /// <param name="parameters">Параметры для редактирования контактов</param>
    Task Update(ContactsUpdateParameters parameters);
}