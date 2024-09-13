using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если email занят другим пользователем
/// </summary>
public class EmailAlreadyExistsException : RequestException
{
    /// <summary/>
    public EmailAlreadyExistsException() : base("Пользователь с таким email`ом уже существует", 400) {}
}