using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Гелерея изображений досуга
/// </summary>
[Table("LeisureGalleries")]
public class LeisureGallery : Gallery
{
    /// <summary>
    /// Идентификатор досуга
    /// </summary>
    public Guid LeisureId { get; set; }
    
    /// <summary>
    /// Досуг
    /// </summary>
    public Leisure Leisure { get; set; }
}