using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Dto спецпредложения на одном языке
/// </summary>
public class SpecialOfferLocalizedDto
{
    /// <summary>
    /// Идентификатор спецпредложения
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public string Title { get; set; }
    
    /// <summary>
    /// Краткое описание
    /// </summary>
    [Required]
    public string ShortDescription { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public string Description { get; set; }
    
    /// <summary>
    /// Заметки
    /// </summary>
    public string? Note { get; set; }
    
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
    /// Идентфиикатор обложки
    /// </summary>
    [Required]
    public ImageDto Cover { get; set; }
    
    /// <summary>
    /// Идентификаторы изображений
    /// </summary>
    public List<ImageDto> Images { get; set; }
}