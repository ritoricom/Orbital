using System.IdentityModel.Tokens.Jwt;
using Core.Models;

namespace Core.Interfaces;

/// <summary>
/// Сервис авторизации
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Получение токена
    /// </summary>
    /// <param name="parameters">Email и пароль пользователя</param>
    /// <returns>Jwt-токен</returns>
    Task<JwtSecurityToken> GetToken(UserLoginParameters parameters);
}