using Api.Extensions;
using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер номеров гостиницы
/// </summary>
[ApiController]
[Route("api/admin/rooms")]
[Authorize(Roles = "Admin, Manager")]
[Produces("application/json")]
public class RoomsController : ControllerBase
{
    /// <summary/>
    private readonly IIntegrationService _integrationService;
    
    /// <summary/>
    private readonly IRoomsService _roomsService;

    /// <summary/>
    private readonly IMapper _mapper;
    
    /// <summary/>
    public RoomsController(
        IRoomsService roomsService, 
        IMapper mapper,
        IIntegrationService integrationService)
    {
        _roomsService = roomsService;
        _mapper = mapper;
        _integrationService = integrationService;
    }
    
    /// <summary>
    /// Получение списка номеров
    /// </summary>
    /// <param name="searchContext">Фильтр номеров</param>
    /// <response code="200">Успешное получение списка комнат</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<RoomDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] RoomsSearchContext searchContext)
    {
        var rooms = await _roomsService.GetList(searchContext);
        var roomsDto = _mapper.Map<CollectionResult<RoomDto>>(rooms);

        return Ok(roomsDto);
    }
    
    /// <summary>
    /// Получение номера по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор номера</param>
    /// <response code="200">Успешное получение комнаты</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="404">Комната не найдена</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(RoomDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var room = await _roomsService.Get(id);
        var roomDto = _mapper.Map<RoomDto>(room);

        return Ok(roomDto);
    }
    
    /// <summary>
    /// Ручная синхронизация номеров с bnovo
    /// </summary>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="204">Успешная синхронизация</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [Route("sync")]
    [ProducesResponseType(204)]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Synchronize(CancellationToken cancellationToken = default)
    {
        await _integrationService.Synchronize(cancellationToken);

        return NoContent();
    }

    /// <summary>
    /// Редактирование обложки номера
    /// </summary>
    /// <param name="id">Идентификатор номера</param>
    /// <param name="parameters">Параметры для редактирования обложки</param>
    /// <response code="204">Успешное редактирование обложки номера</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Изображение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPatch]
    [Route("{id}/cover")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] RoomUpdateParameters parameters)
    {
        await _roomsService.Update(id, parameters);

        return NoContent();
    }
}