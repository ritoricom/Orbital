using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер номеров гостиницы
/// </summary>
[ApiController]
[Route("api/rooms")]
[Produces("application/json")]
public class RoomsController : ControllerBase
{
    /// <summary/>
    private readonly IRoomsService _roomsService;

    /// <summary/>
    private readonly IMapper _mapper;
    
    /// <summary/>
    public RoomsController(IRoomsService roomsService, IMapper mapper)
    {
        _roomsService = roomsService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка номеров на одном языке
    /// </summary>
    /// <param name="searchContext">Контекст поиска номеров</param>
    /// <response code="200">Успешное получение списка номеров</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<RoomLocalizedDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] ClientSearchContext searchContext)
    {
        var rooms = await _roomsService.GetClientList(searchContext);
        var roomsDto = _mapper.Map<CollectionResult<RoomLocalizedDto>>(rooms, opts => opts.Items["lang"] = searchContext.Language);

        return Ok(roomsDto);
    }

    /// <summary>
    /// Получение номера на одном языке
    /// </summary>
    /// <param name="id">Идентификатор номера</param>
    /// <param name="language">Язык</param>
    /// <response code="200">Успешное получение номера</response>
    /// <response code="404">Номер не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(RoomLocalizedDto))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id, [FromQuery] Language language)
    {
        var room = await _roomsService.Get(id);
        var roomDto = _mapper.Map<RoomLocalizedDto>(room, opts => opts.Items["lang"] = language);

        return Ok(roomDto);
    }
}