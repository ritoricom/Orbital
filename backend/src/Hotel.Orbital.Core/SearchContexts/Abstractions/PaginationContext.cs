using System.ComponentModel.DataAnnotations;

namespace Core.SearchContexts.Abstractions;

/// <summary>
/// Контекст пагинации
/// </summary>
public class PaginationContext
{
    /// <summary>
    /// Номер страницы
    /// </summary>
    [Required]
    public int Page { get; set; }
    
    /// <summary>
    /// Количество элементов в странице
    /// </summary>
    [Required]
    public int PageSize { get; set; }

    /// <summary>
    /// Количсетво элементов, которое необходимо пропустить
    /// </summary>
    public int Offset() => Page * PageSize;
}