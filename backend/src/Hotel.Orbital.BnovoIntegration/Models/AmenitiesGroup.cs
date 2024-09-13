using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Группа удобств
/// </summary>
public class AmenitiesGroup
{
    /// <summary>
    /// Особенности
    /// </summary>
    [JsonPropertyName("amenities")]
    public Dictionary<int, Amenity> Amenities { get; set; }
}

