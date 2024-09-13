using AutoMapper;
using Core.Models;
using Entities;
using BC = BCrypt.Net.BCrypt;

namespace Core.Profiles;

/// <summary>
/// Automapper пользователей
/// </summary>
public class UserProfile : Profile
{
    /// <summary/>
    public UserProfile()
    {
        CreateMap<User, UserDto>();
    }
}  