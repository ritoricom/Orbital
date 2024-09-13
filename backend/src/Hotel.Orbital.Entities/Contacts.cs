using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Контакты
/// </summary>
[Table("Contacts")]
public class Contacts : Entity
{
    /// <summary>
    /// Идентификатор гостиницы
    /// </summary>
    public Guid HotelId { get; init; }

    /// <summary>
    /// Адрес гостиницы
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Addresses { get; set; }
    
    /// <summary>
    /// Точка на карте
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Location { get; set; }
    
    /// <summary>
    /// Электронная почта гостиницы
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Номер телефона гостиницы
    /// </summary>
    public string Phone { get; set; }
    
    /// <summary>
    /// Гостиница, к которой относятся контакты
    /// </summary>
    public Hotel Hotel { get; init; }
    
    /// <summary>
    /// Ссылка на вконтакте
    /// </summary>
    public string VkLink { get; set; }
}