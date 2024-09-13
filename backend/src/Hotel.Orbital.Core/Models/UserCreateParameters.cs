using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания пользователя
/// </summary>
public class UserCreateParameters : UserUpdateParameters
{
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}