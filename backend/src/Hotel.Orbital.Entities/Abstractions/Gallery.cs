namespace Entities.Abstractions;

/// <summary>
/// Абстрактный класс галереи
/// </summary>
public abstract class Gallery : Entity
{
    /// <summary>
    /// Набор изображений
    /// </summary>
    public List<Image> Images { get; set; } = new();
}