using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Галерея изображений новости
/// </summary>
[Table("NewsGalleries")]
public class NewsGallery : Gallery
{
    /// <summary>
    /// Идентификатор новости
    /// </summary>
    public Guid NewsId { get; set; }
    
    /// <summary>
    /// Новость
    /// </summary>
    public News News { get; set; }
}