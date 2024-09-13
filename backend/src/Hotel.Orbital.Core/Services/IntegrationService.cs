using System.Text.Json;
using BnovoIntegration.Clients;
using BnovoIntegration.Models;
using Core.Enums;
using Core.Exceptions;
using Core.Extensions;
using Core.Interfaces;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IIntegrationService"/>
public class IntegrationService : IIntegrationService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly IBnovoClient _client;

    /// <summary/>
    private readonly Dictionary<City, int> _accountIds;

    /// <summary/>
    private readonly IImagesService _imagesService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    public IntegrationService(
        ApplicationContext context, 
        IBnovoClient client, 
        Dictionary<City, int> accountIds, 
        IImagesService imagesService,
        IChangeLogService changeLogService)
    {
        _context = context;
        _client = client;
        _accountIds = accountIds;
        _imagesService = imagesService;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task Synchronize(CancellationToken cancellationToken = default)
    {
        foreach (var account in _accountIds)
        {
            var actualRooms = (await _client.GetActualRooms(account.Value, cancellationToken)).ToList();

            var rooms = await _context.Rooms.Include(room => room.Cover)
                .ThenInclude(cover => cover.Image)
                .Include(room => room.RoomGallery)
                .ThenInclude(gallery => gallery.Images)
                .Include(room => room.RoomGallery.Images)
                .Where(room => room.Hotel.City == account.Key)
                .ToListAsync(cancellationToken);

            var roomToCreate = actualRooms.Where(room => !rooms.Select(r => r.BnovoId).Contains(room.Id));
            var roomsToUpdate = actualRooms.Where(room => rooms.Select(r => r.BnovoId).Contains(room.Id));
            var roomsToDelete = rooms.Where(room => !actualRooms.Select(r => r.Id).Contains(room.BnovoId) || room.BnovoId == 0);
            
            foreach (var room in roomsToDelete) await Delete(room.BnovoId);
            foreach (var roomType in roomToCreate) await Create(account.Key, roomType);
            foreach (var roomType in roomsToUpdate) await Update(account.Key, roomType);
        }
        
        await _changeLogService.Create(LoggingEvents.Synchronize);
    }

    /// <summary>
    /// Создание нового номера
    /// </summary>
    /// <param name="city">Город</param>
    /// <param name="roomType">Категория номеров</param>
    private async Task Create(City city, RoomType roomType)
    {
        var hotel = await _context.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == city);

        roomType.Images ??= new List<RoomTypeImage>();

        var imageIds = roomType.Images.Select(image => _imagesService.Save(image.Content)).Select(t => t.Result.Id).ToList();

        Image? cover;
        List<Image> images;

        if (roomType.Images.Any())
        {
            cover = await _context.Images.SingleOrNotFoundAsync(image => image.Id == imageIds.First());
            images = await _context.Images.Where(image => imageIds.Contains(image.Id) && image.Id != imageIds.First()).ToListAsync();
        }
        else
        {
            cover = null;
            images = new List<Image>();
        }

        var room = new Room
        {
            BnovoId = roomType.Id,
            Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
            {
                { Language.Ru, roomType.NameRu },
                { Language.En, roomType.NameEn },
            }),
            Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
            {
                { Language.Ru, roomType.DescriptionRu },
                { Language.En, roomType.DescriptionEn },
            }),
            Peculiarities = JsonSerializer.SerializeToDocument(new Dictionary<Language, IEnumerable<string>>
            {
                { Language.Ru, roomType.AmenitiesRu },
                { Language.En, roomType.AmenitiesEn },
            }),
            Price = roomType.Price,
            CreatedAt = roomType.CreatedAt,
            UpdatedAt = roomType.UpdatedAt,
            Hotel = hotel,
            HotelId = hotel.Id,
            RoomGallery = new RoomGallery
            {
                Images = images
            }
        };

        if (cover != null)
        {
            room.Cover = new RoomCover
            {
                Image = cover
            };

            cover.ImageHolder = room;
        }
        
        images.ForEach(image => image.ImageHolder = room);
        
        _context.Rooms.Add(room);
        
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Обновление номера
    /// </summary>
    /// <param name="roomType">Категория номеров</param>
    /// <param name="city">Город</param>
    private async Task Update(City city, RoomType roomType)
    {
        var room = await _context.Rooms
            .Include(room => room.Cover)
            .Include(room => room.RoomGallery)
            .Include(room => room.Hotel)
            .SingleOrNotFoundAsync(room => room.BnovoId == roomType.Id && room.Hotel.City == city);

        var imagesToDelete = room.RoomGallery.Images.ToList();
        foreach (var image in imagesToDelete) await _imagesService.Delete(image.Id);

        roomType.Images ??= new List<RoomTypeImage>();
        
        var imageIds = roomType.Images.ToList().Select(image => _imagesService.Save(image.Content)).Select(t => t.Result.Id);
        var images = await _context.Images.Where(image => imageIds.Contains(image.Id)).ToListAsync();

        room.Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
        {
            { Language.Ru, roomType.NameRu },
            { Language.En, roomType.NameEn }
        });
        room.Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>()
        {
            { Language.Ru, roomType.DescriptionRu },
            { Language.En, roomType.DescriptionEn }
        });
        room.Peculiarities = JsonSerializer.SerializeToDocument(new Dictionary<Language, IEnumerable<string>>()
        {
            { Language.Ru, roomType.AmenitiesRu },
            { Language.En, roomType.AmenitiesEn }
        });
        room.Price = roomType.Price;
        room.RoomGallery.Images = images;
        room.UpdatedAt = roomType.UpdatedAt;
        
        images.ForEach(image => image.ImageHolder = room);

        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Удаление номера
    /// </summary>
    /// <param name="bnovoId">Идентификатор номера в системе bnovo</param>
    private async Task Delete(int bnovoId)
    {
        var room = await _context.Rooms
            .Include(room => room.Cover)
            .ThenInclude(cover => cover.Image)
            .Include(room => room.RoomGallery)
            .ThenInclude(gallery => gallery.Images)
            .FirstOrDefaultAsync(room => room.BnovoId == bnovoId);

        if (room == null) throw new NotFoundException<Room>();

        if (room.Cover != null) await _imagesService.Delete(room.Cover.Image.Id);
        if (room.RoomGallery != null) 
            foreach (var image in room.RoomGallery.Images.ToList()) await _imagesService.Delete(image.Id);
        
        _context.Rooms.Remove(room);
        await _context.SaveChangesAsync();
    }
}