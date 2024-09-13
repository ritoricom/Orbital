using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Класс изображения
/// </summary>
[Table("Images")]
public class Image : Entity
{
    /// <summary>
    /// Идентфикатор контейнера изображений
    /// </summary>
    public Guid? ImageHolderId { get; set; }
    
    /// <summary>
    /// Контейнер изображений
    /// </summary>
    public Entity? ImageHolder { get; set; }

    /// <summary>
    /// Дата и время создания изображения
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
}