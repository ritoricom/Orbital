using Microsoft.Extensions.DependencyInjection;
using WebDavImageService.Clients;
using WebDavImageService.Models;

namespace WebDavImageService.Extensions;

/// <summary>
/// Методы расширения для <see cref="IServiceCollection"/>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Добавление конфигурации
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="options">Параметры для настройки</param>
    public static void AddWebDavConfiguration(this IServiceCollection services, WebDavOptions options)
    {
        services.AddSingleton(options);
        services.AddScoped<IWebDavClient, WebDavClient>();
    }
}