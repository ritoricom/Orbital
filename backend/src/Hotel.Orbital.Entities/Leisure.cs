using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Досуг
/// </summary>
[Table("Leisures")]
public class Leisure : Entity
{
    /// <summary>
    /// Название
    /// </summary>
    public string Title { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    public string Description { get; set; }
    
    /// <summary>
    /// Заметка
    /// </summary>
    public string? Note { get; set; }
    
    /// <summary>
    /// Маршрут
    /// </summary>
    public string? Route { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    public LeisureCover Cover { get; set; }
    
    /// <summary>
    /// Галерея изображений
    /// </summary>
    public LeisureGallery Gallery { get; set; }
    
    /// <summary>
    /// Рассписание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Days { get; set; }

    /// <summary>
    /// Номер телефона
    /// </summary>
    public string? PhoneNumber { get; set; }
    
    /// <summary>
    /// Электронная почта
    /// </summary>
    public string? Email { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
}