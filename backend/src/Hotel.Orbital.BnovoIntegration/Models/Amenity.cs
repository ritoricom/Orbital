using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Удобство
/// </summary>
public class Amenity
{
    /// <summary>
    /// Название
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; set; }
}