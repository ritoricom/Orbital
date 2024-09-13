using System.ComponentModel.DataAnnotations.Schema;
using Entities.Abstractions;

namespace Entities;

/// <summary>
/// Обложка досуга
/// </summary>
[Table("LeisureCovers")]
public class LeisureCover : Cover
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