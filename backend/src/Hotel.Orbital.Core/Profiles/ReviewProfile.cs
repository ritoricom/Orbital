using System.Text.Json;
using AutoMapper;
using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Profiles;

/// <summary>
/// Automapper для отзывов
/// </summary>
public class ReviewProfile : Profile
{
    /// <summary/>
    public ReviewProfile()
    {
        CreateMap<Review, ReviewDto>()
            .ForMember(review => review.Authors,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Authors.Deserialize<Dictionary<Language, string>>()))
            .ForMember(review => review.Headers,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Headers.Deserialize<Dictionary<Language, string>>()))
            .ForMember(review => review.Descriptions,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Descriptions.Deserialize<Dictionary<Language, string>>()))
            .ForMember(review => review.City,
                opt => opt.MapFrom(src =>
                    src.Hotel.City));

        CreateMap<Review, ReviewLocalizedDto>()
            .ForMember(review => review.Author,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Authors.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(review => review.Header,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Headers.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(review => review.Description,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Descriptions.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]));
    }
}