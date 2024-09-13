using Core.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска записей журнала изменений
/// </summary>
public class ChangeLogSearchContext : SearchContext
{
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public ChangeLogSortFields? SortField { get; set; }
}