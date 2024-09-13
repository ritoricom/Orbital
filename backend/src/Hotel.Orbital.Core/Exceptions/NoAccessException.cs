using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если у пользователя нет доступа к ресурсу
/// </summary>
public class NoAccessException : RequestException
{
    /// <summary/>
    public NoAccessException() : base("Отказано в доступе", 403) {}
}