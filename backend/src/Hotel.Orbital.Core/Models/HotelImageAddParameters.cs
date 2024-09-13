using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Паметры для добавления изображения гостиницы
/// </summary>
public class HotelImageAddParameters
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Идентификатор изображения
    /// </summary>
    [Required]
    public Guid ImageId { get; set; }
}