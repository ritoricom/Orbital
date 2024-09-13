using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Отзыв
/// </summary>
[Table("Reviews")]
public class Review : Entity
{
    /// <summary>
    /// Идентификатор гостиницы
    /// </summary>
    public Guid HotelId { get; init; }

    /// <summary>
    /// Автор отзыва
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Authors { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Headers { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Descriptions { get; set; }
    
    /// <summary>
    /// Гостиница
    /// </summary>
    public Hotel Hotel { get; set; }
    
    /// <summary>
    /// Дата публикации отзыва
    /// </summary>
    public DateTimeOffset PublishedAt { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
    
    /// <summary>
    /// Оценка
    /// </summary>
    public int Grade { get; set; }
}