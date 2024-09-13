using Core.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска пользователей
/// </summary>
public class UsersSearchContext : SearchContext
{
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public UsersSortFields? SortField { get; set; }
}