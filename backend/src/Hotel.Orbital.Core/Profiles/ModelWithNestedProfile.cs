using AutoMapper;
using Core.Models;

namespace Core.Profiles;

/// <summary>
/// Automapper для вложенных элементов
/// </summary>
public class ModelWithNestedProfile : Profile
{
    /// <summary/>
    public ModelWithNestedProfile()
    {
        CreateMap(typeof(DtoWithNested<>), typeof(DtoWithNested<>));
    }
}