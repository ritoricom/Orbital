using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Параметры для входа пользователя в учетную запись
/// </summary>
public class UserLoginParameters
{
    /// <summary>
    /// Электронная почта пользователя
    /// </summary>
    [Required]
    [EmailAddress]
    public string Email { get; init; }
    
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; init; }
}