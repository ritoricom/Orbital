using Core.Enums;
using Core.SearchContexts.Abstractions;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска
/// </summary>
public class SearchContext : PaginationContext
{
    /// <summary>
    /// Поиск по строке
    /// </summary>
    public string? Search { get; set; }
    
    /// <summary>
    /// Направление сортировки
    /// </summary>
    public SortOrder? SortOrder { get; set; }
}