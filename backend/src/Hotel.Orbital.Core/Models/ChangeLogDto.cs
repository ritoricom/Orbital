using System.ComponentModel.DataAnnotations;
using Entities;

namespace Core.Models;

/// <summary>
/// Dto журнала изменений
/// </summary>
public class ChangeLogDto
{
    /// <summary>
    /// Пользователь, сделавший изменение, в виде <see cref="UserDto"/>
    /// </summary>
    [Required]
    public UserDto? Author { get; set; }
    
    /// <summary>
    /// Сообщение об изменении
    /// </summary>
    [Required]
    public string Message { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    [Required]
    public DateTimeOffset CreatedAt { get; set; }
}