using AutoMapper;
using Core.Models;

namespace Core.Profiles;

/// <summary>
/// Automapper для коллекций элементов
/// </summary>
public class CollectionResultProfile : Profile
{
    /// <summary/>
    public CollectionResultProfile()
    {
        CreateMap(typeof(CollectionResult<>), typeof(CollectionResult<>));
    }
}