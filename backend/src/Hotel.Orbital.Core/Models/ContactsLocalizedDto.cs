using System.ComponentModel.DataAnnotations;
using Entities;

namespace Core.Models;

/// <summary>
/// Dto контактов гостиницы на одном языке
/// </summary>
public class ContactsLocalizedDto
{
    /// <summary>
    /// Адрес гостиницы
    /// </summary>
    [Required]
    public string Address { get; set; }
    
    /// <summary>
    /// Электронная почта
    /// </summary>
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    /// <summary>
    /// Номер телефона
    /// </summary>
    [Required]
    [Phone]
    public string Phone { get; set; }
    
    /// <summary>
    /// Расположение
    /// </summary>
    [Required]
    public Point Location { get; set; }
    
    /// <summary>
    /// Ссылка на вконтакте
    /// </summary>
    [Required]
    [Url]
    public string VkLink { get; set; }
}