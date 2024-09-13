using System.ComponentModel.DataAnnotations;
using Entities;

namespace Core.Models;

/// <summary>
/// Dto досуга
/// </summary>
public class LeisureDto
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    /// <summary>
    /// Название
    /// </summary>
    [Required]
    public string Title { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public string Description { get; set; }
    
    /// <summary>
    /// Заметка
    /// </summary>
    public string? Note { get; set; }
    
    /// <summary>
    /// Маршрут
    /// </summary>
    public string? Route { get; set; }
    
    /// <summary>
    /// Номер телефона
    /// </summary>
    [Phone]
    public string? PhoneNumber { get; set; }
    
    /// <summary>
    /// Электронная почта
    /// </summary>
    [EmailAddress]
    public string? Email { get; set; }
    
    /// <summary>
    /// Обложка
    /// </summary>
    [Required]
    public ImageDto Cover { get; set; }
    
    /// <summary>
    /// Изображения
    /// </summary>
    [Required]
    public List<ImageDto> Images { get; set; }

    /// <summary>
    /// Рассписание
    /// </summary>
    [Required]
    public List<LeisureDay> Days { get; set; }
    
    /// <summary>
    /// Дата и время создания
    /// </summary>
    [Required]
    public DateTimeOffset CreatedAt { get; set; }
}