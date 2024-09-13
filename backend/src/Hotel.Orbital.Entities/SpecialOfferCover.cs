using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Обложка спецпредложения
/// </summary>
[Table("SpecialOfferCovers")]
public class SpecialOfferCover : Cover
{
    /// <summary>
    /// Идентификатор спецпредложения
    /// </summary>
    public Guid SpecialOfferId { get; set; }
    
    /// <summary>
    /// Спецпредложение
    /// </summary>
    public SpecialOffer SpecialOffer { get; set; }
}