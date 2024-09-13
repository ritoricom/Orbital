using System.ComponentModel.DataAnnotations;
using Core.SearchContexts.Abstractions;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска для получения на клиентской части
/// </summary>
public class ClientSearchContext : PaginationContext
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Язык
    /// </summary>
    [Required]
    public Language Language { get; set; }
}