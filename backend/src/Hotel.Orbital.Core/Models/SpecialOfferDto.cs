using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto спецпредложения
/// </summary>
public class SpecialOfferDto
{
    /// <summary>
    /// Идентфиикатор
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public Dictionary<Language, string> Titles { get; set; }
    
    /// <summary>
    /// Краткое описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> ShortDescriptions { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; }

    /// <summary>
    /// Заметки
    /// </summary>
    [Required]
    public Dictionary<Language, string?> Notes { get; set; }
    
    /// <summary>
    /// Номера талефона №1
    /// </summary>
    [Phone]
    public string? PhoneNumber1 { get; set; }
    
    /// <summary>
    /// Номера талефона №2
    /// </summary>
    [Phone]
    public string? PhoneNumber2 { get; set; }
    
    /// <summary>
    /// Идентификатор обложки
    /// </summary>
    [Required]
    public ImageDto Cover { get; set; }

    /// <summary>
    /// Идентификаторы изображений
    /// </summary>
    public List<ImageDto> Images { get; set; }
}