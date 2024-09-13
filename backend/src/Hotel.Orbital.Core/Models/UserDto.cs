using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto пользователя
/// </summary>
public class UserDto
{
    /// <summary>
    /// Идентфиикатор пользователя
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// ФИО пользователя
    /// </summary>
    [Required]
    public string FullName { get; set; }
    
    /// <summary>
    /// Электронная почта пользователя
    /// </summary>
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    /// <summary>
    /// Роль пользователя
    /// </summary>
    [Required]
    public Role Role { get; set; }
    
    /// <summary>
    /// Город, к которому привязан пользователь
    /// </summary>
    public City? City { get; set; }
}