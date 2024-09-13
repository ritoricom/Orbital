namespace BnovoIntegration.Models;

public class RoomTypeImage
{
    /// <summary>
    /// Идентфиикатор
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Url изображения
    /// </summary>
    public string Url { get; set; }

    /// <summary>
    /// Изображение в виде массива байт
    /// </summary>
    public Stream Content { get; set; }
}