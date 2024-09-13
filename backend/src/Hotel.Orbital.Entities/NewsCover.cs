using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Обложка новости
/// </summary>
[Table("NewsCovers")]
public class NewsCover : Cover
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