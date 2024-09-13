using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto новости на одном языке
/// </summary>
public class NewsLocalizedDto
{
    /// <summary>
    /// Иденификатор новости
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Город
    /// </summary>
    public City? City { get; set; }
    
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