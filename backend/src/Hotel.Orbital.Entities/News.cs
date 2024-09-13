using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Новость
/// </summary>
[Table("News")]
public class News : Entity
{
    /// <summary>
    /// Идентификатор гостиницы
    /// </summary>
    public Guid? HotelId { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Titles { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Column(TypeName = "jsonb")]
    public JsonDocument Descriptions { get; set; }
    
    /// <summary>
    /// Дата публикации
    /// </summary>
    public DateTimeOffset PublishedAt { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    public NewsCover Cover { get; set; }

    /// <summary>
    /// Галерея изображений
    /// </summary>
    public NewsGallery NewsGallery { get; set; }

    /// <summary>
    /// Гостиница
    /// </summary>
    public Hotel? Hotel { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
}