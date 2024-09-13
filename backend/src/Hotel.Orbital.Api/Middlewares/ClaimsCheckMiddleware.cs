using System.Security.Claims;
using Core.Exceptions;
using Core.Interfaces;

namespace Api.Middlewares;

/// <summary>
/// Middleware для проверки токена
/// </summary>
public class ClaimsCheckMiddleware
{
    /// <summary/>
    private readonly IServiceProvider _services;
    
    /// <summary/>
    private readonly RequestDelegate _next;

    /// <summary/>
    public ClaimsCheckMiddleware(RequestDelegate next, IServiceProvider services)
    {
        _next = next;
        _services = services;
    }

    /// <summary>
    /// Вызов текущего Middleware
    /// </summary>
    /// <param name="context">http-контекст </param>
    public async Task InvokeAsync(HttpContext context)
    {
        if (context.User.Identity is ClaimsIdentity claims && claims.Claims.Any())
        {
            using (var scope = _services.CreateScope())
            {
                var userService = scope.ServiceProvider.GetRequiredService<IUsersService>();

                var claim = claims.FindFirst("id");

                var email = claim != null ? Guid.Parse(claim.Value) : Guid.Empty;

                var user = await userService.Get(email);

                if (!claims.HasClaim(ClaimTypes.Role, user.Role.ToString())
                    || !claims.HasClaim("city", user.City.ToString() ?? string.Empty))
                    throw new WrongUserDataException();
            }
        }

        await _next.Invoke(context);
    }
}