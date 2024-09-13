using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания рассылки
/// </summary>
public class NewsletterCreateParameters
{
    /// <summary>
    /// Электтронная почта
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