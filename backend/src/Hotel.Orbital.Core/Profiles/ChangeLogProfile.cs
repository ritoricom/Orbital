using AutoMapper;
using Core.Models;
using Entities;

namespace Core.Profiles;

/// <summary>
/// Automapper для журнала изменений
/// </summary>
public class ChangeLogProfile : Profile
{
    /// <summary/>
    public ChangeLogProfile()
    {
        CreateMap<ChangeLog, ChangeLogDto>()
            .ForMember(changeLog => changeLog.Author,
                opt => opt.MapFrom(
                    src => src.User));
    }
}