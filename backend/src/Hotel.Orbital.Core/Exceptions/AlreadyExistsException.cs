using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если объект уже существует
/// </summary>
/// <typeparam name="T">Объект, который уже существует</typeparam>
public class AlreadyExistsException<T> : RequestException
{
    /// <summary/>
    public AlreadyExistsException() : base($"{typeof(T).Name} уже существует", 400) {}
}