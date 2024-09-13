using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Запись в журнале изменений
/// </summary>
[Table("ChangeLog")]
public class ChangeLog : Entity
{
    /// <summary>
    /// Пользователь, сделавший изменение
    /// </summary>
    public User? User { get; set; }
    
    /// <summary>
    /// Сообщение
    /// </summary>
    public string Message { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
}