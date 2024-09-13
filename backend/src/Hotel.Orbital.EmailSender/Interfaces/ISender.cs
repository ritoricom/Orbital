using EmailSender.Models;

namespace EmailSender.Interfaces;

/// <summary>
/// Сервис для отправки писем по электронной почте
/// </summary>
public interface ISender
{
    /// <summary>
    /// Отправка письма на почтовый адрес
    /// </summary>
    /// <param name="emailAddress">Адрес назначения</param>
    /// <param name="request">Запрос на отправку письма</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    Task SendAsync(string emailAddress, MailRequest request, CancellationToken cancellationToken = default);

    /// <summary>
    /// Отправка писем на почтовые адреса
    /// </summary>
    /// <param name="emailAddresses">Адреса назначения</param>
    /// <param name="request">Запрос на отправку письма</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns></returns>
    Task SendAsync(IEnumerable<string> emailAddresses, MailRequest request,
        CancellationToken cancellationToken = default);
}