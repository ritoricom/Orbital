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
/// Контроллер рассылок
/// </summary>
[ApiController]
[Authorize(Roles = "Admin, Manager")]
[Route("api/admin/newsletters")]
[Produces("application/json")]
public class NewslettersController : ControllerBase
{
    /// <summary/>
    private readonly INewslettersService _newslettersService;

    /// <summary/>
    private readonly IValidator<NewsletterCreateParameters> _validator;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public NewslettersController(
        INewslettersService newslettersService,
        IValidator<NewsletterCreateParameters> validator,
        IMapper mapper)
    {
        _newslettersService = newslettersService;
        _validator = validator;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка почт в рассылке
    /// </summary>
    /// <param name="searchContext">Контекст поиска рассылки</param>
    /// <response code="200">Успешное получение списка почт рассылки</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<NewsletterDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] NewslettersSearchContext searchContext)
    {
        var newsletters = await _newslettersService.GetList(searchContext);
        var newslettersDto = _mapper.Map<CollectionResult<NewsletterDto>>(newsletters);

        return Ok(newslettersDto);
    }

    /// <summary>
    /// Получение почты из рассылки по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор почты в рассылке</param>
    /// <response code="200">Успешное получение почты из рассылки</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="404">Рассылка не найдена</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(NewsletterDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var newsletter = await _newslettersService.Get(id);
        var newsletterDto = _mapper.Map<NewsletterDto>(newsletter);

        return Ok(newsletterDto);
    }

    /// <summary>
    /// Добавления почты в рассылку
    /// </summary>
    /// <param name="parameters">Параметры для добавления в рассылку</param>
    /// <response code="201">Успешное добавление почты в рассылку</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Create([FromBody] NewsletterCreateParameters parameters)
    {
        
        await _validator.ValidateAndThrowAsync(parameters);

        await _newslettersService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование почты в рассылке
    /// </summary>
    /// <param name="id">Идентификатор почты в рассылке</param>
    /// <param name="parameters">Параметры для редактирования почты в рассылке</param>
    /// <response code="204">Успешное редактирование почты в рассылке</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Рассылка не найдена</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] NewsletterUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);

        await _newslettersService.Update(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление почты из рассылки
    /// </summary>
    /// <param name="id">Идентификатор почты в рассылки</param>
    /// <response code="204">Успешное удаление почты из рассылки</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Рассылка не найдена</response>
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
        await _newslettersService.Delete(id);

        return NoContent();
    }
}