using EmailSender.Interfaces;
using EmailSender.Models;
using EmailSender.Services;
using Microsoft.Extensions.DependencyInjection;

namespace EmailSender.Extensions;

/// <summary>
/// Методы расширения для <see cref="IServiceCollection"/>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Добавление в коллекцию сервисов
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="options">Настройки сервиса отправки писем</param>
    /// <returns>Коллекция сервисов</returns>
    /// <exception cref="ArgumentNullException">Коллекция сервсов отсутствует</exception>
    public static IServiceCollection AddMailKitSender(this IServiceCollection services, MailKitOptions options)
    {
        if (services == null) throw new ArgumentNullException(nameof(services));
        
        services.AddSingleton(options);
        
        services.AddTransient<ISender, MailKitSender>();

        return services;
    }
}