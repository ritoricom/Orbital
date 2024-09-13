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

namespace Core.Services;

/// <inheritdoc cref="IHotelImagesService"/>
public class HotelImageService : IHotelImagesService
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
    public HotelImageService(ApplicationContext context, IImagesService imagesService,
        IAccessService accessService, IChangeLogService changeLogService)
    {
        _context = context;
        _imagesService = imagesService;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task<CollectionResult<Image>> GetList(HotelImagesSearchContext searchContext)
    {
        var hotelGallery = await _context.HotelGalleries
            .Include(hotelGallery => hotelGallery.Hotel)
            .Include(hotelGallery => hotelGallery.Images)
            .SingleOrNotFoundAsync(hotelGallery => hotelGallery.Hotel.City == searchContext.City);

        var images = hotelGallery.Images;

        return new CollectionResult<Image>
        {
            Data = images,
            TotalCount = images.Count
        };
    }

    /// <inheritdoc/>
    public async Task Add(HotelImageAddParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(parameters.City);
        
        var hotelGallery = await _context.HotelGalleries
            .Include(hotelGallery => hotelGallery.Hotel)
            .SingleOrNotFoundAsync(hotelGallery => hotelGallery.Hotel.City == parameters.City);

        var image = await _context.Images.SingleOrNotFoundAsync(image => image.Id == parameters.ImageId);

        if (hotelGallery.Images.SingleOrDefault(i => i.Id == image.Id) != null)
            throw new AlreadyExistsException<Image>();
        
        hotelGallery.Images.Add(image);
        image.ImageHolder = hotelGallery;
        
        await _context.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.CreateHotelImage, parameters.City.GetDescription());
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var city = await GetCity(id);

        await _accessService.AssertAccessOrThrow(city);
        
        await _imagesService.Delete(id);
        
        await _changeLogService.Create(LoggingEvents.DeleteHotelImage, city.GetDescription());
    }
    
    /// <summary>
    /// Получение города по идентификатору изображения
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    /// <returns>Город</returns>
    private async Task<City> GetCity(Guid id)
    {
        var hotelGallery = await _context.HotelGalleries
            .Include(hotelGallery => hotelGallery.Hotel)
            .Include(hotelGalley => hotelGalley.Images)
            .SingleOrNotFoundAsync(hotelGallery => hotelGallery.Images.Select(image => image.Id).Contains(id));

        return hotelGallery.Hotel.City;
    }
}