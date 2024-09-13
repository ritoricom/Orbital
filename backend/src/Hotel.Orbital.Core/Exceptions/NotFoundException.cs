using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое, если объект не найден
/// </summary>
/// <typeparam name="T">Объект</typeparam>
public class NotFoundException<T> : RequestException
{
    /// <summary/>
    public  NotFoundException() : base($"{typeof(T).Name} не найден(a)", 404) {}
}