using System.ComponentModel.DataAnnotations;

namespace Core.Models;

/// <summary>
/// Коллекция объектов с общим количеством для пагинации
/// </summary>
/// <typeparam name="T">Объект колекции</typeparam>
public class CollectionResult<T> where T : class
{
    /// <summary>
    /// Список объектов
    /// </summary>
    public List<T> Data { get; set; }
    
    /// <summary>
    /// Общее количество объектов в БД
    /// </summary>
    [Required]
    public int TotalCount { get; set; }
}