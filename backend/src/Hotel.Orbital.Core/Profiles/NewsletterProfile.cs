using AutoMapper;
using Core.Models;
using Entities;

namespace Core.Profiles;

/// <summary>
/// Automapper для рассылок
/// </summary>
public class NewsletterProfile : Profile
{
    /// <summary/>
    public NewsletterProfile()
    {
        CreateMap<Newsletter, NewsletterDto>()
            .ForMember(newsletter => newsletter.City,
                opt => opt.MapFrom(src =>
                    src.Hotel.City));
    }
}