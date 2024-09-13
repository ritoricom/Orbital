using System.ComponentModel.DataAnnotations;
using Core.Enums;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска отзывов
/// </summary>
public class ReviewSearchContext : SearchContext
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public ReviewsSortFields? SortField { get; set; }
}