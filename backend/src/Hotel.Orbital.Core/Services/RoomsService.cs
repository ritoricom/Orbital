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

/// <inheritdoc cref="IRoomsService"/>
public class RoomsService : IRoomsService
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
    public RoomsService(ApplicationContext context,
        IImagesService imagesService, IAccessService accessService, IChangeLogService changeLogService)
    {
        _context = context;
        _imagesService = imagesService;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task<List<Room>> GetListWithSearchFilter(GlobalSearchContext searchContext)
    {
        var query = _context.Rooms
            .AsNoTracking()
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .Include(room => room.RoomGallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(room => room.RoomGallery.Images)
            .Include(room => room.Hotel)
            .AsQueryable();
        
        var result = await query
            .AddSearchFilter(searchContext.Search, searchContext.Language)
            .HasTitleLanguage(searchContext.Language)
            .ToListAsync();

        return result;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<Room>> GetClientList(ClientSearchContext searchContext)
    {
        var query = _context.Rooms
            .AsNoTracking()
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .Include(room => room.RoomGallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(room => room.RoomGallery.Images)
            .Include(room => room.Hotel)
            .Where(room => room.Hotel.City == searchContext.City)
            .HasTitleLanguage(searchContext.Language)
            .OrderByDescending(room => room.Price)
            .AsQueryable();

        return new CollectionResult<Room>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }
    
    /// <inheritdoc/>
    public async Task<CollectionResult<Room>> GetList(RoomsSearchContext searchContext)
    {
        var query = _context.Rooms
            .AsNoTracking()
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .Include(room => room.RoomGallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(room => room.RoomGallery.Images)
            .Include(room => room.Hotel)
            .Where(room => room.Hotel.City == searchContext.City)
            .AsQueryable();

        query = query.AddSearchFilter(searchContext.Search);

        query = searchContext.SortField switch
        {
            null => query.OrderByDescending(room => room.Price),
            _ => query.OrderBy(searchContext.SortOrder, searchContext.SortField?.GetDescription()!)
        };

        return new CollectionResult<Room>
        {
            Data = await query.ToPaginatedListAsync(searchContext.Offset(), searchContext.PageSize),
            TotalCount = await query.CountAsync()
        };
    }

    /// <inheritdoc/>
    public async Task<Room> Get(Guid id)
    {
        var room = await _context.Rooms
            .AsNoTracking()
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .Include(room => room.RoomGallery)
            .ThenInclude(gallery => gallery.Images)
            .Include(room => room.Hotel)
            .SingleOrNotFoundAsync(room => room.Id == id);

        return room;
    }

    /// <inheritdoc/>
    public async Task Update(Guid id, RoomUpdateParameters parameters)
    {
        var room = await _context.Rooms
            .Include(room => room.Hotel)
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .SingleOrNotFoundAsync(room => room.Id == id);

        await _accessService.AssertAccessOrThrow(room.Hotel.City);
        
        var cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.CoverId);

        if (room.Cover != null && room.Cover.Image.Id != cover.Id)
            await _imagesService.Delete(room.Cover.Image.Id);

        room.Cover ??= new RoomCover();
        room.Cover.Image = cover;

        cover.ImageHolder = room;

        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateRoomCover, room.Titles.RootElement.GetProperty(Language.Ru.ToString()).GetString());
    }
}