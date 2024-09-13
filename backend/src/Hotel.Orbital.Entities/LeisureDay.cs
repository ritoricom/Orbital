using System.ComponentModel.DataAnnotations;

namespace Entities;

/// <summary>
/// День досуга
/// </summary>
public class LeisureDay
{
    /// <summary>
    /// День недели
    /// </summary>
    [Required]
    public string Title { get; set; }
    
    /// <summary>
    /// Время и место проведения
    /// </summary>
    public string? TimeAndPlace { get; set; }
    
    /// <summary>
    /// Продолжительность
    /// </summary>
    public string? Duration { get; set; }
    
    /// <summary>
    /// Кто проводит
    /// </summary>
    public string? Host { get; set; }
    
    /// <summary>
    /// Описание
    /// </summary>
    [Required]
    public string Description { get; set; }
}