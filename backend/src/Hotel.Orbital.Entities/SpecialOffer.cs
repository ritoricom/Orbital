using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Спецпредложение
/// </summary>
[Table("SpecialOffers")]
public class SpecialOffer : Entity
{
    /// <summary>
    /// Заголовок
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Titles { get; set; }
    
    /// <summary>
    /// Краткое описание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument ShortDescriptions { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Descriptions { get; set; }

    /// <summary>
    /// Заметки
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Notes { get; set; }
    
    /// <summary>
    /// Номера талефона №1
    /// </summary>
    public string? PhoneNumber1 { get; set; }
    
    /// <summary>
    /// Номера талефона №2
    /// </summary>
    public string? PhoneNumber2 { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    public SpecialOfferCover Cover { get; set; }

    /// <summary>
    /// Галерея изображений
    /// </summary>
    public SpecialOfferGallery Gallery { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
}