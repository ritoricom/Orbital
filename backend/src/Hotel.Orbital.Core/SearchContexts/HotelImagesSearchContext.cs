using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска изображений гостиницы
/// </summary>
public class HotelImagesSearchContext
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
}