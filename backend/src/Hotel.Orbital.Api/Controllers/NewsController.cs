using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер новостей
/// </summary>
[ApiController]
[Route("api/news")]
[Produces("application/json")]
public class NewsController : ControllerBase
{
    /// <summary/>
    private readonly INewsService _newsService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public NewsController(INewsService newsService, IMapper mapper)
    {
        _newsService = newsService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка новостей на одном языке
    /// </summary>
    /// <param name="searchContext">Контекст поиска новостей</param>
    /// <response code="200">Успешное получение списка новостей</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<NewsLocalizedDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] ClientSearchContext searchContext)
    {
        var news = await _newsService.GetClientList(searchContext);
        var newsDto = _mapper.Map<CollectionResult<NewsLocalizedDto>>(news, opts => opts.Items["lang"] = searchContext.Language);

        return Ok(newsDto);
    }

    /// <summary>
    /// Получение новости на одном языке
    /// </summary>
    /// <param name="id">Идентификатор новости</param>
    /// <param name="searchContext">Контекст поиска вложенных новостей</param>
    /// <response code="200">Успешное получение новости</response>
    /// <response code="404">Новость не найдена</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(DtoWithNested<NewsLocalizedDto>))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id, [FromQuery] NewsNestedSearchContext searchContext)
    {
        var news = await _newsService.GetWithNested(id, searchContext);
        var newsDto = _mapper.Map<DtoWithNested<NewsLocalizedDto>>(news, opts => opts.Items["lang"] = searchContext.Language);

        return Ok(newsDto);
    }
}