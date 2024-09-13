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

/// <inheritdoc cref="ISpecialOfferService"/>
public class SpecialOfferService : ISpecialOfferService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IImagesService _imagesService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public SpecialOfferService(ApplicationContext context,
        IImagesService imagesService, IChangeLogService changeLogService)
    {
        _context = context;
        _imagesService = imagesService;
        _changeLogService = changeLogService;
    }
    
    /// <inheritdoc/>
    public async Task<List<SpecialOffer>> GetListWithSearchFilter(GlobalSearchContext searchContext)
    {
        var query = _context.SpecialOffers
            .AsNoTracking()
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        var result = await query.AddSearchFilter(searchContext.Search, searchContext.Language).ToListAsync();

        return result;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<SpecialOffer>> GetClientList(SpecialOffersClientSearchContext searchContext)
    {
        var query = _context.SpecialOffers
            .AsNoTracking()
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        query = query.OrderByDescending(specialOffer => specialOffer.CreatedAt);

        return new CollectionResult<SpecialOffer>()
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }
    
    /// <inheritdoc/>
    public async Task<CollectionResult<SpecialOffer>> GetList(SpecialOffersSearchContext searchContext)
    {
        var query = _context.SpecialOffers
            .AsNoTracking()
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(specialOffer => specialOffer.CreatedAt),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };

        return new CollectionResult<SpecialOffer>()
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<SpecialOffer> Get(Guid id)
    {
        var specialOffer = await _context.SpecialOffers
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(specialOffer => specialOffer.Id == id);

        return specialOffer;
    }

    /// <inheritdoc/>
    public async Task<DtoWithNested<SpecialOffer>> GetWithNested(Guid id, int nestedSize)
    {
        var query = _context.SpecialOffers
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image);

        var singleSpecialOffer = await query.SingleOrNotFoundAsync(specialOffer => specialOffer.Id == id);
        
        var nested = await query
            .Where(specialOffer => specialOffer.Id != singleSpecialOffer.Id)
            .OrderByDescending(specialOffer => specialOffer.CreatedAt)
            .Take(nestedSize)
            .ToListAsync();

        var specialOfferWithNested = new DtoWithNested<SpecialOffer>
        {
            Self = singleSpecialOffer,
            Nested = nested
        };

        return specialOfferWithNested;
    }

    /// <inheritdoc/>
    public async Task Create(SpecialOfferCreateParameters parameters)
    {
        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);

        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();

        var specialOffer = new SpecialOffer
        {
            Titles = JsonSerializer.SerializeToDocument(parameters.Titles),
            ShortDescriptions = JsonSerializer.SerializeToDocument(parameters.ShortDescriptions),
            Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions),
            Notes = JsonSerializer.SerializeToDocument(parameters.Notes),
            PhoneNumber1 = parameters.PhoneNumber1,
            PhoneNumber2 = parameters.PhoneNumber2,
            CreatedAt = DateTimeOffset.Now,
            UpdatedAt = DateTimeOffset.Now,
            Cover = new SpecialOfferCover
            {
                Image = cover
            },
            Gallery = new SpecialOfferGallery
            {
                Images = images
            }
        };

        cover.ImageHolder = specialOffer;
        images.ForEach(image => image.ImageHolder = specialOffer);

        await _context.AddAsync(specialOffer);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateSpecialOffer, parameters.Titles[Language.Ru]);
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, SpecialOfferUpdateParameters parameters)
    {
        var specialOffer = await _context.SpecialOffers
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(specialOffer => specialOffer.Id == id);
        
        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);

        var images = await _context.Images.Where(image => parameters.ImageIds.Contains(image.Id)).ToListAsync();
        
        var imageIdsToDelete = specialOffer.Gallery.Images
            .Select(image => image.Id)
            .Except(images.Select(image => image.Id))
            .ToList();
        
        foreach (var imageId in imageIdsToDelete) await _imagesService.Delete(imageId);
        
        if (specialOffer.Cover != null && specialOffer.Cover.Image.Id != cover.Id) 
            await _imagesService.Delete(specialOffer.Cover.Image.Id);

        specialOffer.Titles = JsonSerializer.SerializeToDocument(parameters.Titles);
        specialOffer.ShortDescriptions = JsonSerializer.SerializeToDocument(parameters.ShortDescriptions);
        specialOffer.Descriptions = JsonSerializer.SerializeToDocument(parameters.Descriptions);
        specialOffer.Notes = JsonSerializer.SerializeToDocument(parameters.Notes);
        specialOffer.PhoneNumber1 = parameters.PhoneNumber1;
        specialOffer.PhoneNumber2 = parameters.PhoneNumber2;
        specialOffer.UpdatedAt = DateTimeOffset.Now;

        specialOffer.Cover ??= new SpecialOfferCover();
        
        specialOffer.Cover.Image = cover;
        specialOffer.Gallery.Images = images;
        
        cover.ImageHolder = specialOffer;
        images.ForEach(image => image.ImageHolder = specialOffer);

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateSpecialOffer, parameters.Titles[Language.Ru]);
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var specialOffer = await _context.SpecialOffers
            .Include(specialOffer => specialOffer.Gallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(specialOffer => specialOffer.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(specialOffer => specialOffer.Id == id);

        if (specialOffer.Cover != null)  await _imagesService.Delete(specialOffer.Cover.Image.Id);
        if (specialOffer.Gallery != null) 
            foreach (var image in specialOffer.Gallery.Images.ToList()) await _imagesService.Delete(image.Id);
        
        _context.SpecialOffers.Remove(specialOffer);
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.DeleteSpecialOffer, specialOffer.Titles.RootElement.GetProperty(Language.Ru.ToString()).GetString());
    }
}