using Core.Enums;
using Core.Exceptions;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.Utils;
using Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="INewslettersService"/>
public class NewslettersService : INewslettersService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;
    
    /// <summary/>
    public NewslettersService(ApplicationContext context,
        IAccessService accessService, IChangeLogService changeLogService)
    {
        _context = context;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<Newsletter>> GetList(NewslettersSearchContext searchContext)
    {
        var query = _context.Newsletters
            .AsNoTracking()
            .Include(newsletter => newsletter.Hotel)
            .Where(newsletter => newsletter.Hotel.City == searchContext.City);

        query = query.AddSearchFilter(searchContext.Search);
        
        query = searchContext.SortField switch
        {
            null => query.OrderBy(newsletter => newsletter.Email),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };

        return new CollectionResult<Newsletter>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }
    
    /// <inheritdoc/>
    public async Task<Newsletter> Get(Guid id)
    {
        var newsletter = await _context.Newsletters
            .AsNoTracking()
            .Include(newsletter => newsletter.Hotel)
            .SingleOrNotFoundAsync(newsletter => newsletter.Id == id);

        return newsletter;
    }

    /// <inheritdoc/>
    public async Task Create(NewsletterCreateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(parameters.City);
        
        var hotel = await _context.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == parameters.City);

        var isExists = await _context.Newsletters.AnyAsync(newsletter =>
            newsletter.Email == parameters.Email && newsletter.Hotel.City == parameters.City);

        if (isExists) throw new NewslettersEmailAlreadyExistsException();

        var newsletter = new Newsletter
        {
            Hotel = hotel,
            Email = parameters.Email,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now
        };

        await _context.AddAsync(newsletter);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateNewsletter, parameters.Email);
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, NewsletterUpdateParameters parameters)
    {
        var hotel = await _context.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == parameters.City);
        
        var isExists = await _context.Newsletters.Where(newsletter => newsletter.Id != id).AnyAsync(newsletter =>
            newsletter.Email == parameters.Email && newsletter.Hotel.City == parameters.City);
        
        if (isExists) throw new NewslettersEmailAlreadyExistsException();

        var newsletter = await _context.Newsletters
            .Include(newsletter => newsletter.Hotel)
            .SingleOrNotFoundAsync(newsletter => newsletter.Id == id);

        await _accessService.AssertAccessOrThrow(parameters.City);
        await _accessService.AssertAccessOrThrow(newsletter.Hotel.City);

        newsletter.Hotel = hotel;
        newsletter.Email = parameters.Email;
        newsletter.UpdatedAt = DateTimeOffset.Now;

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateNewsletter, parameters.Email);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var newsletter = await _context.Newsletters.SingleOrNotFoundAsync(newsletter => newsletter.Id == id);

        _context.Newsletters.Remove(newsletter);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteNewsletter, newsletter.Email);
    }
}