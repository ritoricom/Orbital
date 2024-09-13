using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Категория номеров с публичного API
/// </summary>
public class PublicRoomTypeDto
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Название
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Название на русском
    /// </summary>
    [JsonPropertyName("name_ru")]
    public string NameRu { get; set; }
    
    /// <summary>
    /// Название на английском
    /// </summary>
    [JsonPropertyName("name_en")]
    public string NameEn { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    public string Description { get; set; }
    
    /// <summary>
    /// Описание на русском
    /// </summary>
    [JsonPropertyName("description_ru")]
    public string DescriptionRu { get; set; }
    
    /// <summary>
    /// Описание на английском
    /// </summary>
    [JsonPropertyName("description_en")]
    public string DescriptionEn { get; set; }
    
    /// <summary>
    /// Идентификатор родительской категории
    /// </summary>
    [JsonPropertyName("parent_id")]
    public int ParentId { get; set; }

    /// <summary>
    /// Удобства
    /// </summary>
    [JsonPropertyName("amenities")]
    public Object Amenities { get; set; }

    /// <summary>
    /// Фотографии
    /// </summary>
    [JsonPropertyName("photos")]
    public IEnumerable<RoomTypeImage> Images { get; set; }
}