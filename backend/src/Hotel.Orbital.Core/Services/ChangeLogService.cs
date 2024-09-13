using Core.Enums;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.Utils;
using Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IChangeLogService"/>
public class ChangeLogService : IChangeLogService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    public ChangeLogService(ApplicationContext context, IAccessService accessService)
    {
        _context = context;
        _accessService = accessService;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<ChangeLog>> GetList(ChangeLogSearchContext searchContext)
    {
        var query = _context.ChangeLog
            .AsNoTracking()
            .Include(change => change.User)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(changeLog => changeLog.CreatedAt),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };
        
        return new CollectionResult<ChangeLog>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    
    /// <inheritdoc/>
    public async Task Create(LoggingEvents logEvent, string? message = null, Guid? userId = null)
    {
        var user = userId == null
            ? await _accessService.GetUserFromContext()
            : await _context.Users.SingleOrDefaultAsync(user => user.Id == userId);

        var resultMessage = string.IsNullOrEmpty(message)
            ? $"{logEvent.GetDescription()}"
            : $"{logEvent.GetDescription()} \"{message}\"";

        var changeLog = new ChangeLog
        {
            User = user,
            Message = resultMessage,
            CreatedAt = DateTimeOffset.Now
        };

        await _context.ChangeLog.AddAsync(changeLog);
        await _context.SaveChangesAsync();
    }
}