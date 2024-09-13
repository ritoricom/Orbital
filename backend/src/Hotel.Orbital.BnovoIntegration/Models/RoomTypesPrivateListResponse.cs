using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Категории номеров с приватного API
/// </summary>
public class RoomTypesPrivateListResponse
{
    /// <summary>
    /// Категории номеров
    /// </summary>
    [JsonPropertyName("roomtypes")]
    public Dictionary<int, PrivateRoomTypeDto> RoomTypes { get; set; }
}