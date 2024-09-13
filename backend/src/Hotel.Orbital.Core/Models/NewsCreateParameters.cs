using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания новости
/// </summary>
public class NewsCreateParameters
{
    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public Dictionary<Language, string> Titles { get; set; } = new();

    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; } = new();
    
    /// <summary>
    /// Город
    /// </summary>
    public City? City { get; set; }
    
    /// <summary>
    /// Дата публикации
    /// </summary>
    [Required]
    public DateTimeOffset PublishedAt { get; set; }

    /// <summary>
    /// Идентификатор обложки
    /// </summary>
    [Required]
    public Guid CoverId { get; set; }
    
    /// <summary>
    /// Идентификаторы фотографий новости
    /// </summary>
    public List<Guid> ImageIds { get; set; }
}