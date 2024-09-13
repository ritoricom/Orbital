namespace Core.Models;

/// <summary>
/// Параметры для создания первого пользователя в БД
/// </summary>
public class UserSeedParameters
{
    /// <summary>
    /// Электронная почта
    /// </summary>
    public string Email { get; set; }
    
    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; }
}