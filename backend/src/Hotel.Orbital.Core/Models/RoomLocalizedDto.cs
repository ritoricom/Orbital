using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto номера гостиницы на одном языке
/// </summary>
public class RoomLocalizedDto
{
    /// <summary>
    /// Идентификатор номера
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
    public string Title { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public string Description { get; set; }

    /// <summary>
    /// Особенности
    /// </summary>
    public List<string> Peculiarities { get; set; }
    
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