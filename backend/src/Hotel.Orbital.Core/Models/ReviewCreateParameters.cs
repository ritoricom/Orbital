using System.ComponentModel.DataAnnotations;
using Entities;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания отзыва
/// </summary>
public class ReviewCreateParameters
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }

    /// <summary>
    /// Автор отзыва
    /// </summary>
    [Required]
    public Dictionary<Language, string> Authors { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public Dictionary<Language, string> Headers { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public Dictionary<Language, string> Descriptions { get; set; }

    /// <summary>
    /// Дата публикации отзыва
    /// </summary>
    [Required]
    public DateTimeOffset PublishedAt { get; set; }
    
    /// <summary>
    /// Оценка
    /// </summary>
    [Required]
    [Range(1, 5)]
    public int Grade { get; set; }
}