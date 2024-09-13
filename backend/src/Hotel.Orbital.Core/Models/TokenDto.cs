using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Токен со временем жизни
/// </summary>
public class TokenDto
{
    /// <summary>
    /// Токен
    /// </summary>
    [Required]
    public string Token { get; set; }
    
    /// <summary>
    /// Время жизни
    /// </summary>
    [Required]
    public long Lifetime { get; set; }
}