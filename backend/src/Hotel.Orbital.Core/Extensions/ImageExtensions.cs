using Core.Models;
using Core.Options;
using Entities;

namespace Core.Extensions;

/// <summary>
/// Методы расширения для <see cref="Image"/>
/// </summary>
public static class ImageExtensions
{
    /// <summary>
    /// Преобразование в Dto
    /// </summary>
    /// <param name="image">Изображение</param>
    /// <returns>Dto изображения</returns>
    public static ImageDto ToDto(this Image image)
    {
        return new ImageDto
        {
            Url = $"{ImageOptions.ImageUrlBase}/{image.Id}",
            Id = image.Id
        };
    }
}