using Core.Enums;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска новостей
/// </summary>
public class NewsSearchContext : SearchContext
{
    /// <summary>
    /// Город
    /// </summary>
    public City? City { get; set; }
    
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public NewsSortFields? SortField { get; set; }
}