using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер изображений гостиницы
/// </summary>
[ApiController]
[Route("api/hotel/images")]
[Produces("application/json")]
public class HotelImagesController : ControllerBase
{
    /// <summary/>
    private readonly IHotelImagesService _imagesService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public HotelImagesController(IHotelImagesService imagesService, IMapper mapper)
    {
        _imagesService = imagesService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка изображений гостиницы
    /// </summary>
    /// <param name="searchContext">Контекст поиска изображений гостиницы</param>
    /// <response code="200">Успешное получение списка изображений</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<ImageDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] HotelImagesSearchContext searchContext)
    {
        var images = await _imagesService.GetList(searchContext);
        var imagesDto = _mapper.Map<CollectionResult<ImageDto>>(images);

        return Ok(imagesDto);
    }
}