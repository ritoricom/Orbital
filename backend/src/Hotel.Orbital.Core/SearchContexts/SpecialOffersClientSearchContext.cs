using System.ComponentModel.DataAnnotations;
using Core.SearchContexts.Abstractions;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска спецпредложений на клиенте
/// </summary>
public class SpecialOffersClientSearchContext : PaginationContext
{
    /// <summary>
    /// Язык
    /// </summary>
    [Required]
    public Language Language { get; set; }
}