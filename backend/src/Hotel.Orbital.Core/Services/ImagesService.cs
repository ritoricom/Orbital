using Core.Exceptions;
using Core.Extensions;
using Core.Interfaces;
using Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WebDavImageService.Clients;

namespace Core.Services;

/// <inheritdoc cref="IImagesService"/>
public class ImagesService : IImagesService
{
    /// <summary/>
    private readonly ApplicationContext _context;
    
    /// <summary/>
    private readonly IWebDavClient _client;

    /// <summary/>
    private readonly ILogger<ImagesService> _logger;
    
    /// <summary/>
    public ImagesService(ApplicationContext context, IWebDavClient client, ILogger<ImagesService> logger)
    {
        _context = context;
        _client = client;
        _logger = logger;
    }
    
    /// <inheritdoc/>
    public async Task<Stream> Get(Guid id, CancellationToken cancellationToken = default)
    {
        var isExists = await _context.Images.AnyAsync(image => image.Id == id, cancellationToken);
        
        if(!isExists) throw new NotFoundException<Image>();

        return await _client.GetAsync(id, cancellationToken);
    }

    /// <inheritdoc/>
    public async Task<Image> Save(Stream content, CancellationToken cancellationToken = default)
    {
        var image = new Image
        {
            CreatedAt = DateTime.Today
        };

        await _context.Images.AddAsync(image, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        try
        {
            await _client.SaveAsync(image.Id, content, cancellationToken);
        }
        catch (Exception e)
        {
            _logger.LogError(e.Message);
            _context.Remove(image);
            await _context.SaveChangesAsync(cancellationToken);
        }
        
        return image;
    }

    /// <inheritdoc/>
    public async Task Delete(Guid id)
    {
        var image = await _context.Images.SingleOrNotFoundAsync(image => image.Id == id);

        try
        {
            await _client.DeleteAsync(id);
        }
        catch (InvalidOperationException e)
        {
            _logger.LogError(e.Message);
        }

        _context.Images.Remove(image);
        await _context.SaveChangesAsync();
    }
}