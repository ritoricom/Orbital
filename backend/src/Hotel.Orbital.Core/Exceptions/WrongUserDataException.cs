using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если пользователь не соответствует данным токена 
/// </summary>
public class WrongUserDataException : RequestException
{
    /// <summary/>
    public WrongUserDataException() : base("Неверные данные пользователя", 401) {}
}