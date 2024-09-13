using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска вложенных номеров
/// </summary>
public class NewsNestedSearchContext
{
    /// <summary>
    /// Количество вложенных номеров
    /// </summary>
    [Required]
    public int NestedSize { get; set; }
    
    /// <summary>
    /// Язык
    /// </summary>
    [Required]
    public Language Language { get; set; }
    
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City? City { get; set; }
}