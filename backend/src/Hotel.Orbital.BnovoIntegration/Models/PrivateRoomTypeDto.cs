using System.Text.Json.Serialization;

namespace BnovoIntegration.Models;

/// <summary>
/// Категория номеров с приватного API
/// </summary>
public class PrivateRoomTypeDto
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Идентификатор родительской категории
    /// </summary>
    [JsonPropertyName("parent_id")]
    public int ParentId { get; set; }
    
    /// <summary>
    /// Цена
    /// </summary>
    [JsonPropertyName("price")]
    public float Price { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    [JsonPropertyName("create_date")]
    public string CreatedAt { get; set; }
    
    /// <summary>
    /// Дата и время изменения
    /// </summary>
    [JsonPropertyName("update_date")]
    public string UpdatedAt { get; set; }
}