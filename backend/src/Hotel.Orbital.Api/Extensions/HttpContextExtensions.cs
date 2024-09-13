using System.Security.Claims;
using Entities.Enums;

namespace Api.Extensions;

/// <summary>
/// Методы расширения для <see cref="HttpContext"/>
/// </summary>
public static class HttpContextExtensions
{
    /// <summary>
    /// Получение идентификатора пользователя
    /// </summary>
    /// <param name="context">Http контекст</param>
    /// <returns>Идентификатор пользователя</returns>
    public static Guid GetUserId(this HttpContext context)
    {
        if (context.User.Identity is not ClaimsIdentity claims) return Guid.Empty;

        var emailClaim = claims.FindFirst("id");

        return emailClaim != null ? Guid.Parse(emailClaim.Value) : Guid.Empty;
    }
}