using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Dto отзыва на одном языке
/// </summary>
public class ReviewLocalizedDto
{
    /// <summary>
    /// Идентификатор отзыва
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Автор отзыва
    /// </summary>
    [Required]
    public string Author { get; set; }

    /// <summary>
    /// Заголовок
    /// </summary>
    [Required]
    public string Header { get; set; }

    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public string Description { get; set; }

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