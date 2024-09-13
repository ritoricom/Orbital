using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto рассылки
/// </summary>
public class NewsletterDto
{
    /// <summary>
    /// Идентификатор рассылки
    /// </summary>
    [Required]
    public Guid Id { get; set; }
    
    /// <summary>
    /// Электронная почта
    /// </summary>
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
}
