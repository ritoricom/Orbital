using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер журнала изменений
/// </summary>
[ApiController]
[Route("api/admin/change-logs")]
[Authorize(Roles = "Admin")]
[Produces("application/json")]
public class ChangeLogController : ControllerBase
{
    /// <summary/>
    private readonly IChangeLogService _changeLogService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public ChangeLogController(IChangeLogService changeLogService, IMapper mapper)
    {
        _changeLogService = changeLogService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение журнала изменений
    /// </summary>
    /// <param name="searchContext">Контекст поиска журнала изменений</param>
    /// <response code="200">Успешное получение журнала изменений</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<ChangeLogDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] ChangeLogSearchContext searchContext)
    {
        var changeLog = await _changeLogService.GetList(searchContext);
        var changeLogDto = _mapper.Map<CollectionResult<ChangeLogDto>>(changeLog);

        return Ok(changeLogDto);
    }
}