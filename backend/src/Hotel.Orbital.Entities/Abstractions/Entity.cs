using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Abstractions;

/// <summary>
/// Абстрактный класс c идентификатором для всех entities
/// </summary>
public abstract class Entity
{
    /// <summary>
    /// Идентификатор
    /// </summary>
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}