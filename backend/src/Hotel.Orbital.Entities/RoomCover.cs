using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Обложка номера
/// </summary>
[Table("RoomCovers")]
public class RoomCover : Cover
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