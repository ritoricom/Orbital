using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;
using Entities.Enums;

namespace Entities;

/// <summary>
/// Гостиница
/// </summary>
[Table("Hotels")]
public class Hotel : Entity
{
    /// <summary>
    /// Город, в которм распологается гостиница
    /// </summary>
    [Required]
    public City City { get; init; }

    /// <summary>
    /// Галерея изображений
    /// </summary>
    public HotelGallery HotelGallery { get; set; }

    /// <summary>
    /// Новости
    /// </summary>
    public List<News> News { get; set; } = new();
    
    /// <summary>
    /// Рассылки
    /// </summary>
    public List<Newsletter> Newsletters { get; set; } = new();
    
    /// <summary>
    /// Контакты
    /// </summary>
    public Contacts Contacts { get; set; }
    
    /// <summary>
    /// Комнаты
    /// </summary>
    public List<Room> Rooms { get; set; } = new();
}