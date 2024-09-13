namespace EmailSender.Models;

/// <summary>
/// Настройки MailKit для отправки писем
/// </summary>
public class MailKitOptions
{
    /// <summary>
    /// Отображаемое имя
    /// </summary>
    public string? DisplayName { get; set; }
    
    /// <summary>
    /// Отправитель
    /// </summary>
    public string? From { get; set; }
    
    /// <summary>
    /// Имя пользователя
    /// </summary>
    public string? UserName { get; set; }
    
    /// <summary>
    /// Пароль
    /// </summary>
    public string? Password { get; set; }
    
    /// <summary>
    /// Smpt сервер
    /// </summary>
    public string? Host { get; set; }
    
    /// <summary>
    /// Порт smtp сервера
    /// </summary>
    public int Port { get; set; }
    
    /// <summary>
    /// Использование ssl для отправки
    /// </summary>
    public bool UseSSL { get; set; }
    
    /// <summary>
    /// Использование StartTls
    /// </summary>
    public bool UseStartTls { get; set; }
}