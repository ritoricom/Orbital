using AutoMapper;
using Core.Models;
using Core.Options;
using Entities;

namespace Core.Profiles;

/// <summary>
///  Automapper для изображений
/// </summary>
public class ImageProfile : Profile
{
    /// <summary/>
    public ImageProfile()
    {
        CreateMap<Image, ImageDto>()
            .ForMember(image => image.Url, 
                opts => opts.MapFrom(src => 
                    $"{ImageOptions.ImageUrlBase}/{src.Id}"));
    }
}