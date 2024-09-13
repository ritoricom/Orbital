using BnovoIntegration.Clients;
using Microsoft.Extensions.DependencyInjection;

namespace BnovoIntegration.Extensions;

/// <summary>
/// Методы расширения для коллекции сервисов
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Добавление конфигурации
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="options">Параметры для настройки</param>
    public static void AddBnovoConfiguration(this IServiceCollection services, BnovoOptions options)
    {
        services.AddSingleton(options);
        services.AddScoped<IBnovoClient, BnovoClient>();
    }
}