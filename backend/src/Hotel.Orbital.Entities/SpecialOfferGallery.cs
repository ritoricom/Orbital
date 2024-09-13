using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Галерея изображений спецпредложения
/// </summary>
[Table("SpecialOfferGalleries")]
public class SpecialOfferGallery : Gallery
{
    /// <summary>
    /// Идентификатор спецпредложения
    /// </summary>
    public Guid SpecialOfferId { get; set; }
    
    /// <summary>
    /// Спепредложение
    /// </summary>
    public SpecialOffer SpecialOffer { get; set; }
}