namespace EmailSender.Models;

/// <summary>
/// Запрос на отпраку письма
/// </summary>
public class MailRequest
{
    /// <summary>
    /// Тема письма
    /// </summary>
    public string Subject { get; set; }
    
    /// <summary>
    /// Тело письма
    /// </summary>
    public string Body { get; set; }

    /// <summary>
    /// Является ли содержимое html
    /// </summary>
    public bool IsHtmlBody { get; set; } = true;
}