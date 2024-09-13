using System.Security.Claims;
using Core.Exceptions;
using Core.Interfaces;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IAccessService"/>
public class AccessService : IAccessService
{
    /// <summary/>
    private readonly ApplicationContext _context;
    
    /// <summary/>
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    /// <summary/>
    public AccessService(ApplicationContext context, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _httpContextAccessor = httpContextAccessor;
    }
    
    /// <inheritdoc/>
    public async Task<User?> GetUserFromContext()
    {
        var context = _httpContextAccessor.HttpContext;

        var claims = context?.User.Claims;

        if (claims == null) return null;

        var idClaim = claims.Single(claim => claim.Type == "id");

        var userId = Guid.Parse(idClaim.Value);

        var user = await _context.Users.SingleOrDefaultAsync(user => user.Id == userId);

        return user;
    }

    /// <inheritdoc/>
    public async Task AssertAccessOrThrow(City? city)
    {
        var hasAccess = await HasAccess(city);

        if (!hasAccess) throw new NoAccessException();
    }

    public async Task<bool> HasAccess(City? city)
    {
        var user = await GetUserFromContext();

        if (user == null) return false;

        if (user.Role == Role.Admin) return true;

        var hasAccess = city != null && user.City == city;

        return hasAccess;
    }
}