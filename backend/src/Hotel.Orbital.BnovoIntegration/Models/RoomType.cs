namespace BnovoIntegration.Models;

/// <summary>
/// Категория номеров
/// </summary>
public class RoomType
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Название на русском
    /// </summary>
    public string NameRu { get; set; }
    
    /// <summary>
    /// Название на английском
    /// </summary>
    public string NameEn { get; set; }
    
    /// <summary>
    /// Описание на русском
    /// </summary>
    public string DescriptionRu { get; set; }
    
    /// <summary>
    /// Описание на английском
    /// </summary>
    public string DescriptionEn { get; set; }
    
    /// <summary>
    /// Удобства на русском
    /// </summary>
    public IEnumerable<string> AmenitiesRu { get; set; }
    
    /// <summary>
    /// Удобства на английском
    /// </summary>
    public IEnumerable<string> AmenitiesEn { get; set; }

    /// <summary>
    /// Цена
    /// </summary>
    public float Price { get; set; }

    /// <summary>
    /// Дата и время создания
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Дата и время обновления
    /// </summary>
    public DateTime UpdatedAt { get; set; }
    
    /// <summary>
    /// Фотографии
    /// </summary>
    public IEnumerable<RoomTypeImage> Images { get; set; }
}