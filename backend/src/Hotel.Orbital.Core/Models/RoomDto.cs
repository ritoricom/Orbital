using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto номера гостиницы
/// </summary>
public class RoomDto
{
    /// <summary>
    /// Идентфиикатор
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public Dictionary<Language, string> Titles { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; }

    /// <summary>
    /// Особенности
    /// </summary>
    [Required]
    public Dictionary<Language, IEnumerable<string>> Peculiarities { get; set; }

    /// <summary>
    /// Цена
    /// </summary>
    [Required]
    public float Price { get; set; }

    /// <summary>
    /// Идентификатор обложки
    /// </summary>
    public ImageDto Cover { get; set; }

    /// <summary>
    /// Идентификаторы изображений номера
    /// </summary>
    public List<ImageDto> Images { get; set; }
}