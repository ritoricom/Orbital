namespace WebDavImageService.Models;

/// <summary>
/// Настройки для сервиса изображений
/// </summary>
public class WebDavOptions
{
    /// <summary>
    /// Uri сервера webdav
    /// </summary>
    public string ServerUri { get; set; }
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string Username { get; set; }
    
    /// <summary>
    /// Пароль
    /// </summary>
    public string Password { get; set; }
}