using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания спецпредложения
/// </summary>
public class SpecialOfferCreateParameters
{
    /// <summary>
    /// Заголовки
    /// </summary>
    [Required]
    public Dictionary<Language, string> Titles { get; set; } = new();

    /// <summary>
    /// Краткое описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> ShortDescriptions { get; set; } = new();

    /// <summary>
    /// Описания
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; } = new();

    /// <summary>
    /// Заметки
    /// </summary>
    [Required]
    public Dictionary<Language, string?> Notes { get; set; } = new();
    
    /// <summary>
    /// Номер телефона №1
    /// </summary>
    [Phone]
    public string? PhoneNumber1 { get; set; }
    
    /// <summary>
    /// Номер телефона №2
    /// </summary>
    [Phone]
    public string? PhoneNumber2 { get; set; }
    
    /// <summary>
    /// Идентификатор обложки
    /// </summary>
    [Required]
    public Guid CoverId { get; set; }

    /// <summary>
    /// Идентификаторы изображений
    /// </summary>
    public List<Guid> ImageIds { get; set; } = new();
}