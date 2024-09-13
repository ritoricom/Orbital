using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое при вводе неверного email`а или пароля
/// </summary>
public class InvalidEmailOrPasswordException : RequestException
{
    /// <summary/>
    public InvalidEmailOrPasswordException() : base("Неверная почта или пароль", 400) {}
}