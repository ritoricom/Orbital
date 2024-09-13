using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Enums;
using Core.Exceptions;
using Core.Interfaces;
using Core.Models;
using Core.Options;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using BC = BCrypt.Net.BCrypt;

namespace Core.Services;

/// <inheritdoc cref="IAuthService"/>
public class AuthService : IAuthService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly AuthOptions _options;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public AuthService(ApplicationContext context, AuthOptions options, IChangeLogService changeLogService)
    {
        _context = context;
        _options = options;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task<JwtSecurityToken> GetToken(UserLoginParameters parameters)
    {
        var user = await _context.Users.SingleOrDefaultAsync(user => user.Email == parameters.Email && user.RemovedAt == DateTimeOffset.MinValue);

        if (user == null || !BC.Verify(parameters.Password, user.Password)) throw new InvalidEmailOrPasswordException();

        var claims = new List<Claim>
        {
            new Claim("id", user.Id.ToString()),
            new Claim("role", user.Role.ToString()),
            new Claim("city", user.City.ToString() ?? string.Empty)
        };
        
        var key = Encoding.ASCII.GetBytes(_options.JwtKey);

        var lifetime = DateTime.UtcNow.Add(TimeSpan.FromDays(14));

        var jwt = new JwtSecurityToken(
            issuer: "Server",
            audience: "Client",
            claims: claims,
            expires: lifetime,
            signingCredentials: new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256));
        
        await _changeLogService.Create(LoggingEvents.Auth, userId: user.Id);

        return jwt;
    }
}