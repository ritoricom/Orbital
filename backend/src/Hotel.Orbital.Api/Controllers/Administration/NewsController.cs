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
/// Контроллер новостей
/// </summary>
[ApiController]
[Route("api/admin/news")]
[Authorize(Roles = "Admin, Manager")]
[Produces("application/json")]
public class NewsController : ControllerBase
{
    /// <summary/>
    private readonly INewsService _newsService;

    /// <summary/>
    private readonly IValidator<NewsCreateParameters> _validator;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public NewsController(
        INewsService newsService, 
        IValidator<NewsCreateParameters> validator, 
        IMapper mapper)
    {
        _newsService = newsService;
        _validator = validator;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Получение списка новостей
    /// </summary>
    /// <param name="searchContext">Контекст поиска новостей</param>
    /// <response code="200">Успешное получение списка новостей</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<NewsDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] NewsSearchContext searchContext)
    {
        var news = await _newsService.GetList(searchContext);
        var newsDto = _mapper.Map<CollectionResult<NewsDto>>(news);

        return Ok(newsDto);
    }

    /// <summary>
    /// Получение новости по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <response code="200">Успешное получение новости</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="404">Новость не найдена</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(NewsDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var news = await _newsService.Get(id);
        var newsDto = _mapper.Map<NewsDto>(news);

        return Ok(newsDto);
    }

    /// <summary>
    /// Создание новости
    /// </summary>
    /// <param name="parameters">Параметры для создания новости</param>
    /// <response code="201">Успешное создание новости</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Create([FromBody] NewsCreateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);

        await _newsService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование новости
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <param name="parameters">Параметры для редактирования новости</param>
    /// <response code="204">Успешное редактирование новости</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Новость не найдена</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] NewsUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);

        await _newsService.Update(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление новости
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <response code="204">Успешное удаление новости</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Новость не найдена</response>
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
        await _newsService.Delete(id);

        return NoContent();
    }
}