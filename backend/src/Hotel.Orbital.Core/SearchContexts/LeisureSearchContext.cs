using Core.Enums;
using Core.SearchContexts.Abstractions;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска досуга
/// </summary>
public class LeisureSearchContext : PaginationContext
{
    /// <summary>
    /// Поиск по строке
    /// </summary>
    public string? Search { get; set; }
    
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public LeisureSortFields? SortField { get; set; }
    
    /// <summary>
    /// Направление сортировки
    /// </summary>
    public SortOrder? SortOrder { get; set; }
}