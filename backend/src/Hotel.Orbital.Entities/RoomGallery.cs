using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Галерея изображений номера
/// </summary>
[Table("RoomGalleries")]
public class RoomGallery : Gallery
{
    /// <summary>
    /// Идентификатор номера
    /// </summary>
    public Guid RoomId { get; set; }
    
    /// <summary>
    /// Номер
    /// </summary>
    public Room Room { get; set; }
}