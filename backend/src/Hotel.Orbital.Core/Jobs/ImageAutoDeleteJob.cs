using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Quartz;

namespace Core.Jobs;

/// <summary>
/// Фоновая задача для автоудаления неиспользуемый изображений
/// </summary>
public class ImageAutoDeleteJob : IJob
{
    /// <summary/>
    private readonly IImagesService _imagesService;

    /// <summary/>
    private readonly ApplicationContext _context;
    
    /// <summary/>
    public ImageAutoDeleteJob(IImagesService imagesService, ApplicationContext context)
    {
        _context = context;
        _imagesService = imagesService;
    }
    
    /// <summary>
    /// Выполнение задачи
    /// </summary>
    /// <param name="context">Контекст задачи</param>
    public async Task Execute(IJobExecutionContext context)
    {
        var images = await _context.Images.Where(image =>
            image.ImageHolder == null && image.CreatedAt <= DateTime.Today.AddDays(-2)).ToListAsync();

        foreach (var image in images)
        {
            await _imagesService.Delete(image.Id);
        }
    }
}