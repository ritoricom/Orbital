namespace BnovoIntegration;

/// <summary>
/// Настройки для bnovo
/// </summary>
public class BnovoOptions
{
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string Username { get; set; }
    
    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; }
    
    /// <summary>
    /// Url приватного API
    /// </summary>
    public string PrivateUrl { get; set; }
    
    /// <summary>
    /// Url публичного API
    /// </summary>
    public string PublicUrl { get; set; }
}