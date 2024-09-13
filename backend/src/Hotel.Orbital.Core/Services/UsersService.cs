using Core.Enums;
using Core.Exceptions;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.Utils;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt;

namespace Core.Services;

/// <inheritdoc cref="IUsersService"/>
public class UsersService : IUsersService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    public UsersService(ApplicationContext db, IChangeLogService changeLogService, IAccessService accessService)
    {
        _context = db;
        _changeLogService = changeLogService;
        _accessService = accessService;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<User>> GetList(UsersSearchContext searchContext)
    {
        var query = _context.Users
            .AsNoTracking()
            .Where(user => user.RemovedAt == DateTimeOffset.MinValue)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderBy(user => user.FullName),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!),
        };

        return new CollectionResult<User>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<User> Get(Guid id)
    {
        var user = await _context.Users.AsNoTracking().SingleOrNotFoundAsync(user => user.Id == id && user.RemovedAt == DateTimeOffset.MinValue);

        return user;
    }

    /// <inheritdoc/>
    public async Task Create(UserCreateParameters parameters)
    {
        if (await _context.Users.AnyAsync(u => u.Email == parameters.Email && u.RemovedAt == DateTimeOffset.MinValue)) throw new EmailAlreadyExistsException();

        var user = new User
        {
            FullName = parameters.FullName,
            Email = parameters.Email,
            Password = BC.HashPassword(parameters.Password),
            Role = parameters.Role,
            City = parameters.City,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now,
            RemovedAt = DateTimeOffset.MinValue
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateUser, parameters.FullName);
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, UserUpdateParameters parameters)
    {
        var user = await _context.Users.SingleOrNotFoundAsync(user => user.Id == id && user.RemovedAt == DateTimeOffset.MinValue);

        if (parameters.Email != user.Email &&
            _context.Users.Any(u => u.Email == parameters.Email && u.RemovedAt == DateTimeOffset.MinValue))
            throw new EmailAlreadyExistsException();

        user.FullName = parameters.FullName;
        user.Email = parameters.Email;
        user.City = parameters.City;
        user.Role = parameters.Role;
        user.UpdatedAt = DateTimeOffset.Now;
        
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateUser, parameters.FullName);
    }

    public async Task UpdatePassword(Guid id, PasswordUpdateParameters parameters)
    {
        var user = await _context.Users.SingleOrNotFoundAsync(user => user.Id == id && user.RemovedAt == DateTimeOffset.MinValue);
        
        user.Password = BC.HashPassword(parameters.Password);
        
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdatePassword, user.FullName);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var executor = await _accessService.GetUserFromContext();
        
        if (id == executor?.Id) throw new UserSelfDeletionException();
        
        var user = await _context.Users.SingleOrNotFoundAsync(user => user.Id == id && user.RemovedAt == DateTimeOffset.MinValue);

        user.RemovedAt = DateTimeOffset.Now;

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteUser, user.FullName);
    }
}