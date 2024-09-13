using BnovoIntegration.Models;

namespace BnovoIntegration.Extensions;

/// <summary>
/// Методы расширения для категорий номеров
/// </summary>
public static class PublicRoomTypeDtoExtensions
{
    /// <summary>
    /// Преобразование в <see cref="RoomType"/>
    /// </summary>
    /// <param name="dto">Категория номеров в виде <see cref="PublicRoomTypeDto"/></param>
    /// <returns>Категория номеров в виде <see cref="RoomType"/></returns>
    public static RoomType ToRoomType(this PublicRoomTypeDto dto)
    {
        return new RoomType
        {
            Id = dto.Id,
            NameRu = string.IsNullOrEmpty(dto.NameRu) ? dto.Name : dto.NameRu,
            NameEn = dto.NameEn,
            DescriptionRu = string.IsNullOrEmpty(dto.DescriptionRu) ? dto.Description : dto.DescriptionRu,
            DescriptionEn = dto.DescriptionEn,
            Images = dto.Images
        };
    }
}