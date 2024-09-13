using Api.Extensions;
using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер досуга
/// </summary>
[ApiController]
[Route("api/admin/leisures")]
[Authorize(Roles = "Admin, Manager")]
[Produces("application/json")]
public class LeisureController : ControllerBase
{
    /// <summary/>
    private readonly ILeisureService _leisureService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    private readonly IValidator<LeisureCreateParameters> _validator;

    /// <summary/>
    public LeisureController(
        ILeisureService leisureService, 
        IMapper mapper, 
        IValidator<LeisureCreateParameters> validator)
    {
        _leisureService = leisureService;
        _mapper = mapper;
        _validator = validator;
    }
    
    /// <summary>
    /// Получение списка досуга
    /// </summary>
    /// <param name="searchContext">Контекст поиска досуга</param>
    /// <response code="200">Успешное получение списка досуга</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<LeisureDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] LeisureSearchContext searchContext)
    {
        var leisure = await _leisureService.GetList(searchContext);
        var leisureDto = _mapper.Map<CollectionResult<LeisureDto>>(leisure);

        return Ok(leisureDto);
    }

    /// <summary>
    /// Получение досуга по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <response code="200">Успешное получение досуга</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Досуг не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(LeisureDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var leisure = await _leisureService.Get(id);
        var leisureDto = _mapper.Map<LeisureDto>(leisure);

        return Ok(leisureDto);
    }

    /// <summary>
    /// Создание досуга
    /// </summary>
    /// <param name="parameters">Параметры для создания досуга</param>
    /// <response code="204">Успешное создание досуга</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Create([FromBody] LeisureCreateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _leisureService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование досуга
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <param name="parameters">Параметры для редактирования досуга</param>
    /// <response code="204">Успешное редактирование досуга</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Досуг не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] LeisureUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _leisureService.Update(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление досуга
    /// </summary>
    /// <param name="id">Идентификатор досуга</param>
    /// <response code="204">Успешное удаление досуга</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Досуг не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpDelete]
    [Route("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(204)]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _leisureService.Delete(id);

        return NoContent();
    }
}