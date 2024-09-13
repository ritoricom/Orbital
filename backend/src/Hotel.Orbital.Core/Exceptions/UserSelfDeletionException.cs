using Core.Exceptions.Abstractions;

namespace Core.Exceptions;

/// <summary>
/// Исключение, вызываемое при самоудалении пользвателя
/// </summary>
public class UserSelfDeletionException : RequestException
{
    /// <summary/>
    public UserSelfDeletionException() : base("Нельзя удалить текущего пользователя", 403) {}
}