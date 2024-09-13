using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для редактирования пользователя
/// </summary>
public class UserUpdateParameters
{
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
    /// Город пользователя
    /// </summary>
    public City? City { get; set; }
}