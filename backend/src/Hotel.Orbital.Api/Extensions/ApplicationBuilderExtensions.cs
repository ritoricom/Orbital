using Api.Middlewares;

namespace Api.Extensions;

/// <summary>
/// Методы расширения для <see cref="ApplicationBuilder"/>
/// </summary>
public static class ApplicationBuilderExtensions
{
    /// <summary>
    /// Добавление обработчика исключений
    /// </summary>
    /// <param name="app">Приложение</param>
    public static void UseErrorHandler(this IApplicationBuilder app)
    {
        app.UseMiddleware<ErrorHandlerMiddleware>();
    }

    /// <summary>
    /// Добавление проверки токена
    /// </summary>
    /// <param name="app">Приложение</param>
    public static void UseClaimsCheck(this IApplicationBuilder app)
    {
        app.UseMiddleware<ClaimsCheckMiddleware>();
    }

    /// <summary>
    /// Добавление настроек сваггера
    /// </summary>
    /// <param name="app">Приложение</param>
    public static void UseSwaggerOptions(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.RoutePrefix = "docs";
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        });
    }
}