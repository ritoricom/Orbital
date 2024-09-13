using System.ComponentModel.DataAnnotations;
using Entities;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Dto контактов гостиницы
/// </summary>
public class ContactsDto
{
    /// <summary>
    /// Город
    /// </summary>
    public City City { get; set; }
    
    /// <summary>
    /// Адрес гостиницы на нескольких языках
    /// </summary>
    [Required]
    public Dictionary<Language, string> Addresses { get; set; }
    
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