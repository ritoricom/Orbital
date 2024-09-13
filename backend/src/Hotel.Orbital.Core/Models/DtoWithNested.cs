namespace Core.Models;

/// <summary>
/// Объект с другими коллекцией объектов такого же типа
/// </summary>
/// <typeparam name="T">Тип возвращаемых данных</typeparam>
public class DtoWithNested<T> where T : class
{
    /// <summary>
    /// Возвращаемый объект
    /// </summary>
    public T Self { get; set; }
    
    /// <summary>
    /// Коллекция вложенных объектов такого же типа
    /// </summary>
    public IEnumerable<T> Nested { get; set; }
}