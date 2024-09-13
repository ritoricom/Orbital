using System.ComponentModel.DataAnnotations;
using Entities.Enums;

namespace Core.Models;

/// <summary>
/// Параметры для создания письма
/// </summary>
public class EmailCreateParameters
{
    /// <summary>
    /// Город
    /// </summary>
    [Required]
    public City City { get; set; }
    
    /// <summary>
    /// Имя 
    /// </summary>
    [Required]
    public string Name { get; set; }
    
    /// <summary>
    /// Телефон
    /// </summary>
    [Required]
    [Phone]
    public string Phone { get; set; }

}