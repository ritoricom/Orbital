namespace Core.Interfaces;

/// <summary>
/// Сервис для интеграции с bnovo
/// </summary>
public interface IIntegrationService
{
    /// <summary>
    /// Синхронизация номеров с bnovo
    /// </summary>
    /// <param name="cancellationToken">Токен отмены</param>
    Task Synchronize(CancellationToken cancellationToken = default);
}