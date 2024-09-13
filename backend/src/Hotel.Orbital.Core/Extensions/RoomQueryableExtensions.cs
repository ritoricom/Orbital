using Entities;
using Entities.Enums;

namespace Core.Extensions;

/// <summary>
/// Методы расширения для <see cref="IQueryable{Room}"/>
/// </summary>
public static class RoomQueryableExtensions
{
    /// <summary>
    /// Проверка наличия заголовка на определенном языке
    /// </summary>
    /// <param name="query">Исходные данные</param>
    /// <param name="language">Язык</param>
    /// <returns></returns>
    public static IQueryable<Room> HasTitleLanguage(this IQueryable<Room> query, Language language)
    {
        return query.Where(room =>
            !string.IsNullOrEmpty(room.Titles.RootElement.GetProperty(language.ToString()).GetString()));
    }
}