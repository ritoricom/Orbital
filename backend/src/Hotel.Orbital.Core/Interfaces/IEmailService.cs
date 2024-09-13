using Core.Models;

namespace Core.Interfaces;

/// <summary>
/// Сервис для отправки рассылки
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Отправка рассылки
    /// </summary>
    /// <param name="parameters">Параметры для создания письма</param>
    /// <param name="cancellationToken">Токен отмены</param>
    Task SendAsync(EmailCreateParameters parameters, CancellationToken cancellationToken = default);
}