using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Dto изображения
/// </summary>
public class ImageDto
{
    /// <summary>
    /// Url изображения
    /// </summary>
    [Required]
    [Url]
    public string Url { get; set; }
    
    /// <summary>
    /// Идентфикатор изображения
    /// </summary>
    [Required]
    public Guid Id { get; set; }
}