using System.IdentityModel.Tokens.Jwt;
using Core.Models;

namespace Core.Extensions;

/// <summary>
/// Методы расширения для <see cref="JwtSecurityToken"/>
/// </summary>
public static class TokenExtensions
{
    /// <summary>
    /// Преобразование в Dto
    /// </summary>
    /// <param name="token">Jwt-токен</param>
    /// <returns>Токен в виде <see cref="TokenDto"/></returns>
    public static TokenDto ToDto(this JwtSecurityToken token)
    {
        return new TokenDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Lifetime = ((DateTimeOffset)token.ValidTo).ToUnixTimeSeconds()
        };
    }
}