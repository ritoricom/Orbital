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
/// Контроллер отзывов
/// </summary>
[ApiController]
[Route("api/admin/reviews")]
[Authorize(Roles = "Admin, Manager")]
public class ReviewsController : ControllerBase
{
    /// <summary/>
    private readonly IReviewsService _reviewsService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    private readonly IValidator<ReviewCreateParameters> _validator;

    /// <summary/>
    public ReviewsController(
        IReviewsService reviewsService, 
        IMapper mapper, 
        IValidator<ReviewCreateParameters> validator)
    {
        _reviewsService = reviewsService;
        _mapper = mapper;
        _validator = validator;
    }
    
    /// <summary>
    /// Получение списка отзывов
    /// </summary>
    /// <param name="searchContext">Контекст поиска отзывов</param>
    /// <response code="200">Успешное получение списка отзывов</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<ReviewDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] ReviewSearchContext searchContext)
    {
        var reviews = await _reviewsService.GetList(searchContext);
        var reviewsDto = _mapper.Map<CollectionResult<ReviewDto>>(reviews);

        return Ok(reviewsDto);
    }

    /// <summary>
    /// Получение отзыва по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <response code="200">Успешное получение отзыва</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="404">Отзыв не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(ReviewDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var review = await _reviewsService.Get(id);
        var reviewDto = _mapper.Map<ReviewDto>(review);

        return Ok(reviewDto);
    }

    /// <summary>
    /// Создание отзыва
    /// </summary>
    /// <param name="parameters">Параметры для создания отзыва</param>
    /// <response code="201">Успешное создание отзыва</response>
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
    public async Task<IActionResult> Create([FromBody] ReviewCreateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);

        await _reviewsService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование отзыва
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <param name="parameters">Параметры для редактирования отзыва</param>
    /// <response code="204">Успешное редактирование отзыва</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Отзыв не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] ReviewUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);

        await _reviewsService.Update(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление отзыва
    /// </summary>
    /// <param name="id">Идентификатор отзыва</param>
    /// <response code="204">Успешное удаление отзыва</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Отзыв не найден</response>
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
        await _reviewsService.Delete(id);

        return NoContent();
    }
}