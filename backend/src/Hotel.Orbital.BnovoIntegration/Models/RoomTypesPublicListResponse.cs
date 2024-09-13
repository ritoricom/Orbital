using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Категории номеров с публичного API
/// </summary>
public class RoomTypesPublicListResponse
{
    /// <summary>
    /// Категории номеров
    /// </summary>
    [JsonPropertyName("rooms")]
    public List<PublicRoomTypeDto> RoomTypes { get; set; }
}