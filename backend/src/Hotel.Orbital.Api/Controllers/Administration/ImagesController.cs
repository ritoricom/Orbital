using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер изображений
/// </summary>
[ApiController]
[Route("api/admin/images")]
[Authorize(Roles = "Admin, Manager")]
[Produces("application/json")]
public class ImagesController : ControllerBase
{
    /// <summary/>
    private readonly IImagesService _imageService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public ImagesController(IImagesService imageService, IMapper mapper)
    {
        _imageService = imageService;
        _mapper = mapper;
    }

    /// <summary>
    /// Загрузка изображения
    /// </summary>
    /// <param name="image">Изображение</param>
    /// <response code="200">Успешная загрузка изображения и получение идентификатора</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [Produces("application/json")]
    [ProducesResponseType(200, Type = typeof(ImageDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Upload(IFormFile image)
    {
        var content = await _imageService.Save(image.OpenReadStream());
        var imageDto = _mapper.Map<ImageDto>(content);

        return Ok(imageDto);
    }
}