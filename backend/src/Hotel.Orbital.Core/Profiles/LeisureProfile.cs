using System.Text.Json;
using AutoMapper;
using Core.Extensions;
using Core.Models;
using Entities;

namespace Core.Profiles;

/// <summary>
/// Automapper для досуга
/// </summary>
public class LeisureProfile : Profile
{
    /// <summary/>
    public LeisureProfile()
    {
        CreateMap<Leisure, LeisureDto>()
            .ForMember(leisure => leisure.Cover,
                opt => opt.MapFrom(src =>
                    src.Cover.Image.ToDto()))
            .ForMember(leisure => leisure.Images,
                opt => opt.MapFrom(src =>
                    src.Gallery.Images.Select(image => image.ToDto())))
            .ForMember(leisure => leisure.Days,
                opt => opt.MapFrom((src, _, _, _) =>
                    src.Days.Deserialize<List<LeisureDay>>()));
    }
}