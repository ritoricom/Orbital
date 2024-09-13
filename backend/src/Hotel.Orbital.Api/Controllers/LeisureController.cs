using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Core.SearchContexts.Abstractions;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер досуга
/// </summary>
[ApiController]
[Route("api/leisures")]
[Produces("application/json")]
public class LeisureController : ControllerBase
{
    /// <summary/>
    private readonly ILeisureService _leisureService;
    
    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public LeisureController(ILeisureService leisureService, IMapper mapper)
    {
        _leisureService = leisureService;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Получение списка досуга на клиенте
    /// </summary>
    /// <param name="searchContext">Контекст поиска досуга</param>
    /// <response code="200">Успешное получение списка досуга</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<LeisureDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] PaginationContext searchContext)
    {
        var leisure = await _leisureService.GetClientList(searchContext);
        var leisureDto = _mapper.Map<CollectionResult<LeisureDto>>(leisure);

        return Ok(leisureDto);
    }

    /// <summary>
    /// Получение досуга по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <param name="nestedSize">Количество вложенных элементов</param>
    /// <response code="200">Успешное получение досуга</response>
    /// <response code="404">Досуг не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(DtoWithNested<LeisureDto>))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id, [FromQuery] int nestedSize)
    {
        var leisure = await _leisureService.GetWithNested(id, nestedSize);
        var leisureDto = _mapper.Map<DtoWithNested<LeisureDto>>(leisure);

        return Ok(leisureDto);
    }
}