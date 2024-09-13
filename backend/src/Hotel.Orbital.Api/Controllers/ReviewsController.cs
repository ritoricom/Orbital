using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер отзывов
/// </summary>
[ApiController]
[Route("api/reviews")]
[Produces("application/json")]
public class ReviewsController : ControllerBase
{
    /// <summary/>
    private readonly IReviewsService _reviewsService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public ReviewsController(IReviewsService reviewsService, IMapper mapper)
    {
        _reviewsService = reviewsService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка отзывов на одном языке
    /// </summary>
    /// <param name="searchContext">Контекст поиска отзывов</param>
    /// <response code="200">Успешное получение списка отзывов</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<ReviewLocalizedDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] ClientSearchContext searchContext)
    {
        var reviews = await _reviewsService.GetClientList(searchContext);
        var reviewsDto = _mapper.Map<CollectionResult<ReviewLocalizedDto>>(reviews, opts => opts.Items["lang"] = searchContext.Language);

        return Ok(reviewsDto);
    }

    /// <summary>
    /// Получение отзыва на одном языке
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <param name="language">Язык</param>
    /// <response code="200">Успешное получение отзыва</response>
    /// <response code="404">Отзыв не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(ReviewLocalizedDto))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id, [FromQuery] Language language)
    {
        var review = await _reviewsService.Get(id);
        var reviewDto = _mapper.Map<ReviewLocalizedDto>(review, opts => opts.Items["lang"] = language);

        return Ok(reviewDto);
    }
}