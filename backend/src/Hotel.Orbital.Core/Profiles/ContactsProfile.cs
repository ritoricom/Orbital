using System.Text.Json;
using AutoMapper;
using Core.Models;
using Entities;
using Entities.Enums;

namespace Core.Profiles;

/// <summary>
/// Automapper для контактов
/// </summary>
public class ContactsProfile : Profile
{
    /// <summary/>
    public ContactsProfile()
    {
        CreateMap<Contacts, ContactsDto>()
            .ForMember(contact => contact.Addresses,
                opt => 
                    opt.MapFrom((src, _, _, _) => 
                        src.Addresses.Deserialize<Dictionary<Language, string>>()))
            .ForMember(contact => contact.Location,
                opt => 
                    opt.MapFrom((src, _, _, _) => 
                        src.Location.Deserialize<Point>()))
            .ForMember(contacts => contacts.City, opts => opts.MapFrom(src => src.Hotel.City));
        
        CreateMap<Contacts, ContactsLocalizedDto>()
            .ForMember(contact => contact.Address,
                opt => 
                    opt.MapFrom((src, _, _, context) => 
                        src.Addresses.Deserialize<Dictionary<Language, string>>()![(Language)context.Items["lang"]]))
            .ForMember(contact => contact.Location,
            opt => 
                opt.MapFrom((src, _, _, _) => 
                    src.Location.Deserialize<Point>()));
    }
}