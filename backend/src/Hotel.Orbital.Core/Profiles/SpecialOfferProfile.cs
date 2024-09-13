using System.Text.Json;
using AutoMapper;
using Core.Extensions;
using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Profiles;

/// <summary>
/// Automapper для спецпредложений
/// </summary>
public class SpecialOfferProfile : Profile
{
    /// <summary/>
    public SpecialOfferProfile()
    {
        CreateMap<SpecialOffer, SpecialOfferDto>()
            .ForMember(specialOffer => specialOffer.Titles,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Titles.Deserialize<Dictionary<Language, string>>()))
            .ForMember(specialOffer => specialOffer.ShortDescriptions,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.ShortDescriptions.Deserialize<Dictionary<Language, string>>()))
            .ForMember(specialOffer => specialOffer.Descriptions,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Descriptions.Deserialize<Dictionary<Language, string>>()))
            .ForMember(specialOffer => specialOffer.Notes,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Notes.Deserialize<Dictionary<Language, string>>()))
            .ForMember(specialOffer => specialOffer.Cover, 
                opt => opt.MapFrom(
                    src => src.Cover.Image.ToDto()))
            .ForMember(specialOffer => specialOffer.Images,
                opt => opt.MapFrom(
                    src => src.Gallery.Images.Select(image => image.ToDto())));

        CreateMap<SpecialOffer, SpecialOfferLocalizedDto>()
            .ForMember(specialOffer => specialOffer.Title,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Titles.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(specialOffer => specialOffer.ShortDescription,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.ShortDescriptions.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(specialOffer => specialOffer.Description,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Descriptions.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(specialOffer => specialOffer.Note,
                opt => opt.MapFrom((src, _, _, context) =>
                        src.Notes.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(specialOffer => specialOffer.Cover, 
                opt => opt.MapFrom(
                    src => src.Cover.Image.ToDto()))
            .ForMember(specialOffer => specialOffer.Images,
                opt => opt.MapFrom(
                    src => src.Gallery.Images.Select(image => image.ToDto())));
    }
}