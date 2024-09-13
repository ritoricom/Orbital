using System.ComponentModel.DataAnnotations;
using Entities;

namespace Core.Models;

/// <summary>
/// Параметры для создания досуга
/// </summary>
public class LeisureCreateParameters
{
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
    /// Идентификатор обложки
    /// </summary>
    [Required]
    public Guid CoverId { get; set; }
    
    /// <summary>
    /// Идентификаторы изображений
    /// </summary>
    [Required]
    public List<Guid> ImageIds { get; set; }
    
    /// <summary>
    /// Рассписание
    /// </summary>
    [Required]
    public List<LeisureDay> Days { get; set; }
}