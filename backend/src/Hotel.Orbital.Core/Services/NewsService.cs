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

/// <inheritdoc cref="INewsService"/>
public class NewsService : INewsService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IImagesService _imagesService;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public NewsService(ApplicationContext context,
        IImagesService imagesService, IAccessService accessService,
        IChangeLogService changeLogService)
    {
        _context = context;
        _imagesService = imagesService;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }
    
    /// <inheritdoc/>
    public async Task<List<News>> GetListWithSearchFilter(GlobalSearchContext searchContext)
    {
        var query = _context.News
            .AsNoTracking()
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .AsQueryable();

        var result = await query.AddSearchFilter(searchContext.Search, searchContext.Language).ToListAsync();

        return result;
    }
    
    /// <inheritdoc/>
    public async Task<CollectionResult<News>> GetClientList(ClientSearchContext searchContext)
    {
        var query = _context.News
            .AsNoTracking()
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .Where(news => news.Hotel == null || news.Hotel.City == searchContext.City)
            .Where(news => news.PublishedAt <= DateTime.Today)
            .OrderByDescending(news => news.PublishedAt);

        return new CollectionResult<News>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<News>> GetList(NewsSearchContext searchContext)
    {
        var query = _context.News
            .AsNoTracking()
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .Where(news => (news.Hotel == null && searchContext.City == null) || news.Hotel.City == searchContext.City)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(news => news.PublishedAt),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };

        return new CollectionResult<News>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<News> Get(Guid id)
    {
        var news = await _context.News
            .AsNoTracking()
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .SingleOrNotFoundAsync(news => news.Id == id);

        return news;
    }

    /// <inheritdoc/>
    public async Task<DtoWithNested<News>> GetWithNested(Guid id, NewsNestedSearchContext searchContext)
    {
        var query = _context.News
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image);
            
        var singleNews = await query.SingleOrNotFoundAsync(news => news.Id == id && news.PublishedAt <= DateTime.Today);

        var nested = await query
            .Where(news => news.Id != singleNews.Id)
            .Where(news => news.Hotel == null || news.Hotel.City == searchContext.City)
            .Where(news => news.PublishedAt <= DateTime.Today)
            .OrderByDescending(news => news.PublishedAt)
            .Take(searchContext.NestedSize)
            .ToListAsync();

        var newsWithNested = new DtoWithNested<News>
        {
            Self = singleNews,
            Nested = nested
        };

        return newsWithNested;
    }

    /// <inheritdoc/>
    public async Task Create(NewsCreateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(parameters.City);
        
        var hotel = await _context.Hotels.SingleOrDefaultAsync(hotel => hotel.City == parameters.City);

        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();

        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);

        var news = new News
        {
            Titles = JsonSerializer.SerializeToDocument(parameters.Titles),
            Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions),
            PublishedAt = parameters.PublishedAt,
            Hotel = hotel,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now,
            Cover = new NewsCover
            {
                Image = cover
            },
            NewsGallery = new NewsGallery
            {
                Images = images
            }
        };
        
        cover.ImageHolder = news;
        images.ForEach(image => image.ImageHolder = news);

        await _context.News.AddAsync(news);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateNews, news.Titles.RootElement.GetProperty("Ru").GetString());
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, NewsUpdateParameters parameters)
    {
        var news = await _context.News
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .SingleOrNotFoundAsync(news => news.Id == id);

        await _accessService.AssertAccessOrThrow(parameters.City);
        await _accessService.AssertAccessOrThrow(news.Hotel?.City);
        
        var hotel = await _context.Hotels.SingleOrDefaultAsync(hotel => hotel.City == parameters.City);

        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();

        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);
        
        var imageIdsToDelete = news.NewsGallery.Images
            .Select(image => image.Id)
            .Except(images.Select(image => image.Id))
            .ToList();

        foreach (var imageId in imageIdsToDelete) await _imagesService.Delete(imageId);
        
        if (news.Cover != null && news.Cover.Image.Id != cover.Id) 
            await _imagesService.Delete(news.Cover.Image.Id);

        news.Hotel = hotel;
        news.Titles = JsonSerializer.SerializeToDocument(parameters.Titles);
        news.Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions);
        news.PublishedAt = parameters.PublishedAt;

        news.Cover ??= new NewsCover();
        
        news.Cover.Image = cover;
        news.NewsGallery.Images = images;
        news.UpdatedAt = DateTimeOffset.Now;
        
        cover.ImageHolder = news;
        images.ForEach(image => image.ImageHolder = news);

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateNews, parameters.Titles[Language.Ru]);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var news = await _context.News
            .Include(news => news.Hotel)
            .Include(news => news.NewsGallery)
            .ThenInclude(newsGallery => newsGallery.Images)
            .Include(news => news.Cover)
            .ThenInclude(newsCover => newsCover.Image)
            .SingleOrNotFoundAsync(news => news.Id == id);

        if (news.Cover != null) await _imagesService.Delete(news.Cover.Image.Id);
        if (news.NewsGallery != null) 
            foreach (var image in news.NewsGallery.Images.ToList()) await _imagesService.Delete(image.Id);
        
        _context.News.Remove(news);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteNews, news.Titles.RootElement.GetProperty("Ru").GetString());
    }
}