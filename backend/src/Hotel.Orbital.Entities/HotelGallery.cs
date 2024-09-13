using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Галерея отлея
/// </summary>
[Table("HotelGalleries")]
public class HotelGallery : Gallery
{
    /// <summary>
    /// Идентификатор гостиницы
    /// </summary>
    public Guid HotelId { get; set; }
    
    /// <summary>
    /// Гостиница
    /// </summary>
    public Hotel Hotel { get; set; }
}