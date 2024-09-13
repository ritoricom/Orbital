using System.ComponentModel.DataAnnotations;
using Core.SearchContexts.Abstractions;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст глобального поиска
/// </summary>
public class GlobalSearchContext
{
    [Required]
    [MinLength(1)]
    public string Search { get; set; }
    
    [Required]
    public Language Language { get; set; }
}