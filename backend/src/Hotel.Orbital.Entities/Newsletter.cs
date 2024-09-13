using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Рассылка
/// </summary>
[Table("Newsletters")]
public class Newsletter : Entity
{
    /// <summary>
    /// Идентификатор отеля
    /// </summary>
    public Guid HotelId { get; set; }
    
    /// <summary>
    /// Электронная почта для рассылки
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Гостиница, к которой относится рассылка
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