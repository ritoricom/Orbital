using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;
using Entities.Enums;

namespace Entities;

/// <summary>
/// Пользователь
/// </summary>
[Table("Users")]
public class User : Entity
{
    /// <summary>
    /// ФИО пользователя
    /// </summary>
    public string FullName { get; set; }

    /// <summary>
    /// Электронная почта пользователя
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    public string Password { get; set; }
    
    /// <summary>
    /// Город, к которому привязан пользователь
    /// </summary>
    public City? City { get; set; }
    
    /// <summary>
    /// Роль пользователя
    /// </summary>
    [Required]
    public Role Role { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTimeOffset CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    public DateTimeOffset UpdatedAt { get; set; }
    
    /// <summary>
    /// Дата и время удаления
    /// </summary>
    public DateTimeOffset RemovedAt { get; set; }
}