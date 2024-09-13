using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Параметры для редактирования обложки номера
/// </summary>
public class RoomUpdateParameters
{
    /// <summary>
    /// Идентификатор обложки
    /// </summary>
    [Required]
    public Guid CoverId { get; set; }
}