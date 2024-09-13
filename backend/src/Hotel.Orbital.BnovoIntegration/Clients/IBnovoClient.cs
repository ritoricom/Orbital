using BnovoIntegration.Models;

namespace BnovoIntegration.Clients;

/// <summary>
/// Клиент для работы с API сервиса bnovo
/// </summary>
public interface IBnovoClient
{
    /// <summary>
    /// Получение актуальных категорий номеров
    /// </summary>
    /// <param name="accountId">Идентфиикатор аккаунта</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Категории номеров</returns>
    Task<IEnumerable<RoomType>> GetActualRooms(int accountId, CancellationToken cancellationToken);
}