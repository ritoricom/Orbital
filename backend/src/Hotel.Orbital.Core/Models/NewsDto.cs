using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto новости
/// </summary>
public class NewsDto
{
    /// <summary>
    /// Идентфиикатор
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Город, к которому относится гостиница
    /// </summary>
    public City? City { get; set; }
    
    /// <summary>
    /// Словарь заголовков на нескольких языках
    /// </summary>
    [Required]
    public Dictionary<Language, string> Titles { get; set; }
    
    /// <summary>
    /// Словарь описаний на нескольких языках
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; }
    
    /// <summary>
    /// Дата публикации
    /// </summary>
    [Required]
    public DateTimeOffset PublishedAt { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    [Required]
    public ImageDto Cover { get; set; }
    
    /// <summary>
    /// Изображения
    /// </summary>
    public List<ImageDto> Images { get; set; }
}