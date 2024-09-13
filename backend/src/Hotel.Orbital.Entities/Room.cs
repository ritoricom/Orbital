using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Номер гостиницы
/// </summary>
[Table("Rooms")]
public class Room : Entity
{
    /// <summary>
    /// Идентификатор гостиницы
    /// </summary>
    public Guid HotelId { get; set; }
    
    /// <summary>
    /// Идентификатор в системе bnovo
    /// </summary>
    public int BnovoId { get; set; }

    /// <summary>
    /// Название
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Titles { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Descriptions { get; set; }

    /// <summary>
    /// Ососбенности
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Peculiarities { get; set; }
    
    /// <summary>
    /// Стоимость проживания
    /// </summary>
    public float Price { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    public RoomCover Cover { get; set; }
    
    /// <summary>
    /// Галерея изображений
    /// </summary>
    public RoomGallery RoomGallery { get; set; }
    
    /// <summary>
    /// Гостиница
    /// </summary>
    public Hotel Hotel { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
}