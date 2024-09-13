namespace Core.Exceptions.Abstractions;

/// <summary>
/// Базовое пользовательское исключение
/// </summary>
public class RequestException : Exception
{
    /// <summary>
    /// Статусный код ответа
    /// </summary>
    public int StatusCode { get; }
    
    /// <summary>
    /// Конструктор исключения
    /// </summary>
    /// <param name="message">Сообщение об ошибке</param>
    /// <param name="statusCode">Статусный код ответа</param>
    public RequestException(string message, int statusCode) : base(message)
    {
        StatusCode = statusCode;
    }
}