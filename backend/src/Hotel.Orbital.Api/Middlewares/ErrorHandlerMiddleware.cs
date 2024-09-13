using Api.Models;
using Core.Exceptions.Abstractions;
using FluentValidation;

namespace Api.Middlewares;

/// <summary>
/// Обработчик ошибок
/// </summary>
public class ErrorHandlerMiddleware
{
    /// <summary>
    /// Логгер для вывода внутренних ошибок сервера
    /// </summary>
    private readonly ILogger<ErrorHandlerMiddleware> _logger;

    /// <summary>
    /// Следующий middleware
    /// </summary>
    private readonly RequestDelegate _next;

    /// <summary/>
    public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    /// <summary>
    /// Обработка исключений
    /// </summary>
    /// <param name="context">Http контекст</param>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next.Invoke(context);
        }
        catch (RequestException e)
        {
            context.Response.Headers.ContentType = "application/json; charset=utf-8";
            context.Response.StatusCode = e.StatusCode;
            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = e.StatusCode,
                Message = e.Message,
                StackTrace = e.StackTrace ?? ""
            }.ToString());
        }
        catch (ValidationException e)
        {
            context.Response.Headers.ContentType = "application/json; charset=utf-8";
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = 400,
                Message = e.Errors.Select(error => $"{error.ErrorMessage}").First(),
                StackTrace = e.StackTrace ?? ""
            }.ToString());
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            context.Response.Headers.ContentType = "application/json; charset=utf-8";
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = 500,
                Message = "Internal server error",
                StackTrace = e.StackTrace ?? ""
            }.ToString());
        }
    }
}