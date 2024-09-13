using System.ComponentModel.DataAnnotations;
using Core.Enums;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска рассылок
/// </summary>
public class NewslettersSearchContext : SearchContext
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public NewslettersSortFields? SortField { get; set; }
}