using System.ComponentModel.DataAnnotations;
using Core.Enums;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// контекст поиска номеров
/// </summary>
public class RoomsSearchContext : SearchContext
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public RoomsSortFields? SortField { get; set; }
}