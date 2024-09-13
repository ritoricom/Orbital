using System.Text.Json;
using Core.Enums;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.SearchContexts.Abstractions;
using Core.Utils;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="ILeisureService"/>
public class LeisureService : ILeisureService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    private readonly IImagesService _imagesService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public LeisureService(
        ApplicationContext context, 
        IAccessService accessService, 
        IImagesService imagesService,
        IChangeLogService changeLogService)
    {
        _context = context;
        _accessService = accessService;
        _imagesService = imagesService;
        _changeLogService = changeLogService;
    }
    
    /// <inheritdoc/>
    public async Task<List<Leisure>> GetListWithSearchFilter(GlobalSearchContext searchContext)
    {
        if (searchContext.Language != Language.Ru) return new List<Leisure>();
        
        var query = _context.Leisures
            .AsNoTracking()
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        var result = await query.AddSearchFilter(searchContext.Search).ToListAsync();

        return result;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<Leisure>> GetClientList(PaginationContext searchContext)
    {
        var query = _context.Leisures
            .AsNoTracking()
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        query = query.OrderByDescending(leisure => leisure.CreatedAt);
        
        return new CollectionResult<Leisure>()
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }
    
    /// <inheritdoc/>
    public async Task<CollectionResult<Leisure>> GetList(LeisureSearchContext searchContext)
    {
        var query = _context.Leisures
            .AsNoTracking()
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(leisure => leisure.CreatedAt),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };

        return new CollectionResult<Leisure>()
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<Leisure> Get(Guid id)
    {
        var leisure = await _context.Leisures
            .AsNoTracking()
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(leisure => leisure.Id == id);

        return leisure;
    }

    /// <inheritdoc/>
    public async Task<DtoWithNested<Leisure>> GetWithNested(Guid id, int nestedSize)
    {
        var query = _context.Leisures
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        var singleLeisure = await query.SingleOrNotFoundAsync(leisure => leisure.Id == id);

        var nested = await query
            .Where(leisure => leisure.Id != id)
            .OrderByDescending(leisure => leisure.CreatedAt)
            .Take(nestedSize)
            .ToListAsync();

        var leisureWithNested = new DtoWithNested<Leisure>()
        {
            Self = singleLeisure,
            Nested = nested
        };

        return leisureWithNested;
    }

    /// <inheritdoc/>
    public async Task Create(LeisureCreateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(City.Obn);
        
        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);
        
        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();

        var leisure = new Leisure
        {
            Title = parameters.Title,
            Description = parameters.Description,
            Route = parameters.Route,
            Note = parameters.Note,
            Days = JsonSerializer.SerializeToDocument(parameters.Days),
            PhoneNumber = parameters.PhoneNumber,
            Email = parameters.Email,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now,
            Cover = new LeisureCover
            {
                Image = cover
            },
            Gallery = new LeisureGallery
            {
                Images = images
            }
        };
        
        cover.ImageHolder = leisure;
        images.ForEach(image => image.ImageHolder = leisure);
        
        await _context.AddAsync(leisure);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateLeisure, parameters.Title);
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, LeisureUpdateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(City.Obn);
        
        var leisure = await _context.Leisures
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(leisure => leisure.Id == id);
        
        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();

        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);
        
        var imageIdsToDelete = leisure.Gallery.Images
            .Select(image => image.Id)
            .Except(images.Select(image => image.Id))
            .ToList();

        foreach (var imageId in imageIdsToDelete) 
            await _imagesService.Delete(imageId);
        
        if (leisure.Cover != null && leisure.Cover.Image.Id != cover.Id) 
            await _imagesService.Delete(leisure.Cover.Image.Id);

        leisure.Title = parameters.Title;
        leisure.Description = parameters.Description;
        leisure.Route = parameters.Route;
        leisure.Note = parameters.Note;
        leisure.Days = JsonSerializer.SerializeToDocument(parameters.Days);
        leisure.PhoneNumber = parameters.PhoneNumber;
        leisure.Email = parameters.Email;
        leisure.UpdatedAt = DateTimeOffset.Now;
        leisure.Cover ??= new LeisureCover();
        leisure.Cover.Image = cover;
        leisure.Gallery.Images = images;

        cover.ImageHolder = leisure;
        images.ForEach(image => image.ImageHolder = leisure);
        
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateLeisure, parameters.Title);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var leisure = await _context.Leisures
            .Include(leisure => leisure.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(leisure => leisure.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(leisure => leisure.Id == id);
        
        if (leisure.Cover != null)  await _imagesService.Delete(leisure.Cover.Image.Id);
        if (leisure.Gallery != null) 
            foreach (var image in leisure.Gallery.Images.ToList()) await _imagesService.Delete(image.Id);
        
        _context.Leisures.Remove(leisure);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteLeisure, leisure.Title);
    }
}