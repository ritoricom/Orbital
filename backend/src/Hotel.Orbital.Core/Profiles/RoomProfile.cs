using System.Text.Json;
using AutoMapper;
using Core.Extensions;
using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Profiles;

/// <summary>
/// Automapper для номеров
/// </summary>
public class RoomProfile : Profile
{
    /// <summary/>
    public RoomProfile()
    {
        CreateMap<Room, RoomDto>()
            .ForMember(room => room.Titles,
                opt => opt.MapFrom((src, _, _, _) => 
                    src.Titles.Deserialize<Dictionary<Language, string>>()))
            .ForMember(room => room.Descriptions,
                opt => opt.MapFrom((src, _, _, _) => 
                    src.Descriptions.Deserialize<Dictionary<Language, string>>()))
            .ForMember(room => room.Peculiarities,
                opt => opt.MapFrom((src, _, _, _) => 
                    src.Peculiarities.Deserialize<Dictionary<Language, List<string>>>()))
            .ForMember(room => room.City, 
                opt => opt.MapFrom(src => 
                    src.Hotel.City))
            .ForMember(room => room.Cover, 
                opt => opt.MapFrom(src => 
                    src.Cover.Image.ToDto()))
            .ForMember(room => room.Images,
                opt => opt.MapFrom(src => 
                    src.RoomGallery.Images.Select(image => image.ToDto())));
        
        CreateMap<Room, RoomLocalizedDto>()
            .ForMember(room => room.City, 
                opt => opt.MapFrom(src => 
                    src.Hotel.City))
            .ForMember(room => room.Title,
                opt => opt.MapFrom((src, _, _, context) => 
                        src.Titles.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(room => room.Description,
                opt => opt.MapFrom((src, _, _, context) => 
                        src.Descriptions.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(room => room.Peculiarities,
                opt => opt.MapFrom((src, _, _, context) => 
                        src.Peculiarities.Deserialize<Dictionary<Language, List<string>>>()![(Language)context.Items["lang"]]))
            .ForMember(room => room.Cover, 
                opt => opt.MapFrom(src => 
                    src.Cover.Image.ToDto()))
            .ForMember(room => room.Images,
                opt => opt.MapFrom(src => 
                    src.RoomGallery.Images.Select(image => image.ToDto())));
    }
}