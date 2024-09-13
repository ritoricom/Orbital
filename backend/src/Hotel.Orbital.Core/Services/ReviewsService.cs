using System.Text.Json;
using Core.Enums;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.Utils;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IReviewsService"/>
public class ReviewsService : IReviewsService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public ReviewsService(ApplicationContext context, IAccessService accessService, IChangeLogService changeLogService)
    {
        _context = context;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }
    
    /// <inheritdoc/>
    public async Task<CollectionResult<Review>> GetClientList(ClientSearchContext searchContext)
    {
        var query = _context.Reviews
            .AsNoTracking()
            .Include(review => review.Hotel)
            .Where(review => review.Hotel.City == searchContext.City)
            .OrderByDescending(review => review.CreatedAt);

        return new CollectionResult<Review>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<Review>> GetList(ReviewSearchContext searchContext)
    {
        var query = _context.Reviews
            .AsNoTracking()
            .Include(review => review.Hotel)
            .Where(review => review.Hotel.City == searchContext.City)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = query
            .Include(review => review.Hotel)
            .Where(review => review.Hotel.City == searchContext.City);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(review => review.PublishedAt),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!),
        };

        return new CollectionResult<Review>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<Review> Get(Guid id)
    {
        var review = await _context.Reviews
            .AsNoTracking()
            .Include(review => review.Hotel)
            .SingleOrNotFoundAsync(review => review.Id == id);

        return review;
    }
    
    /// <inheritdoc/>
    public async Task Create(ReviewCreateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(parameters.City);
        
        var hotel = await _context.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == parameters.City);

        var review = new Review
        {
            Authors = JsonSerializer.SerializeToDocument(parameters.Authors),
            Headers = JsonSerializer.SerializeToDocument(parameters.Headers),
            Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions),
            Hotel = hotel,
            PublishedAt = parameters.PublishedAt,
            Grade = parameters.Grade,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now
        };

        await _context.Reviews.AddAsync(review);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateReview, parameters.Headers[Language.Ru]);
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, ReviewUpdateParameters parameters)
    {
        var review = await _context.Reviews
            .Include(review => review.Hotel)
            .SingleOrNotFoundAsync(review => review.Id == id);
        
        await _accessService.AssertAccessOrThrow(parameters.City);
        await _accessService.AssertAccessOrThrow(review.Hotel.City);
        
        var hotel = await _context.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == parameters.City);

        review.Authors = JsonSerializer.SerializeToDocument(parameters.Authors);
        review.Headers = JsonSerializer.SerializeToDocument(parameters.Headers);
        review.Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions);
        review.Hotel = hotel;
        review.PublishedAt = parameters.PublishedAt;
        review.Grade = parameters.Grade;
        review.UpdatedAt = DateTimeOffset.Now;

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateReview, parameters.Headers[Language.Ru]);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var review = await _context.Reviews.SingleOrNotFoundAsync(review => review.Id == id);
            
        _context.Remove(review);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteReview, review.Headers.RootElement.GetProperty(Language.Ru.ToString()).GetString());
    }
}