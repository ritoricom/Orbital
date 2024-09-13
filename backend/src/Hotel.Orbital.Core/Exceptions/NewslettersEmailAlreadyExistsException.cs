using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если email уже добавлен в рассылку
/// </summary>
public class NewslettersEmailAlreadyExistsException : RequestException
{
    /// <summary/>
    public NewslettersEmailAlreadyExistsException() : base("Такой email уже добавлен в рассылку", 400) {}
}