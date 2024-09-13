using System.Text.Json;
using AutoMapper;
using Core.Extensions;
using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Profiles;

/// <summary>
/// Automapper для новостей
/// </summary>
public class NewsProfile : Profile
{
    /// <summary/>
    public NewsProfile()
    {
        CreateMap<News, NewsDto>()
            .ForMember(news => news.Titles,
                opt => opt.MapFrom((src, _, _, _) => 
                    src.Titles.Deserialize<Dictionary<Language, string>>()))
            .ForMember(news => news.Descriptions,
                opt => opt.MapFrom((src, _, _, _) => 
                    src.Descriptions.Deserialize<Dictionary<Language, string>>()))
            .ForMember(news => news.City, 
                opt => opt.MapFrom(
                    src => src.Hotel != null ? (City?)src.Hotel.City : null))
            .ForMember(news => news.Cover, 
                opt => opt.MapFrom(src => 
                    src.Cover.Image.ToDto()))
            .ForMember(news => news.Images,
                opt => opt.MapFrom(src => 
                    src.NewsGallery.Images.Select(image => image.ToDto())));
        
        CreateMap<News, NewsLocalizedDto>()
            .ForMember(news => news.City, 
                opt => opt.MapFrom(
                    src => src.Hotel != null ? (City?)src.Hotel.City : null))
            .ForMember(news => news.Title,
                opt => opt.MapFrom((src, _, _, context) => 
                        src.Titles.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(news => news.Description,
                opt => opt.MapFrom((src, _, _, context) => 
                        src.Descriptions.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(news => news.Cover, 
                opt => opt.MapFrom(src => 
                    src.Cover.Image.ToDto()))
            .ForMember(news => news.Images,
                opt => opt.MapFrom(src => 
                    src.NewsGallery.Images.Select(image => image.ToDto())));
    }
}