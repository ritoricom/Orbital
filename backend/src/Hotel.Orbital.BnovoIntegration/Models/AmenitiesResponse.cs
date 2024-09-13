using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Удобства
/// </summary>
public class AmenitiesResponse
{
    /// <summary>
    /// Группы удобств
    /// </summary>
    [JsonPropertyName("amenities")]
    public Dictionary<int, AmenitiesGroup> AmenityGroups { get; set; }
}