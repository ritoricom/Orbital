namespace Entities.Abstractions;

/// <summary>
/// Абстрактный класс обложки
/// </summary>
public abstract class Cover : Entity
{
    /// <summary>
    /// Изображение
    /// </summary>
    public Image Image { get; set; }
}