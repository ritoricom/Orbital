using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Параметры для редактирования пароля пользователя
/// </summary>
public class PasswordUpdateParameters
{
    /// <summary>
    /// Пароль пользователя
    /// </summary>
    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}