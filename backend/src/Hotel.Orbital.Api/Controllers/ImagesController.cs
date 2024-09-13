using Api.Models;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер изображений
/// </summary>
[ApiController]
[Route("api/images")]
public class ImagesController : ControllerBase
{
    /// <summary/>
    private readonly IImagesService _imageService;

    /// <summary/>
    public ImagesController(IImagesService imageService)
    {
        _imageService = imageService;
    }

    /// <summary>
    /// Получения изображения по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор изображения</param>
    /// <response code="200">Успешное получение изображения</response>
    /// <response code="404">Изображение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [Produces("image/jpeg")]
    [ProducesResponseType(200)]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Download(Guid id)
    {
        var imageBytes = await _imageService.Get(id);

        return File(imageBytes, "image/jpeg");
    }
}