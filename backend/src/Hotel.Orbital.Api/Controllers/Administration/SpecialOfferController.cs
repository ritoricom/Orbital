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
/// Контроллер спецпредложений
/// </summary>
[ApiController]
[Route("api/admin/special-offers")]
[Authorize(Roles = "Admin")]
[Produces("application/json")]
public class SpecialOffersController : ControllerBase
{
    /// <summary/>
    private readonly ISpecialOfferService _specialOfferService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    private readonly IValidator<SpecialOfferCreateParameters> _validator;

    /// <summary/>
    public SpecialOffersController(
        ISpecialOfferService specialOfferService, 
        IMapper mapper, 
        IValidator<SpecialOfferCreateParameters> validator)
    {
        _specialOfferService = specialOfferService;
        _mapper = mapper;
        _validator = validator;
    }
    
    /// <summary>
    /// Получение списка спецпредложений
    /// </summary>
    /// <param name="searchContext">Контекст поиска спецпредложений</param>
    /// <response code="200">Успешное получение списка спецпредложений</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<SpecialOfferDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] SpecialOffersSearchContext searchContext)
    {
        var specialOffers = await _specialOfferService.GetList(searchContext);
        var specialOffersDto = _mapper.Map<CollectionResult<SpecialOfferDto>>(specialOffers);

        return Ok(specialOffersDto);
    }

    /// <summary>
    /// Получение спецпредложения по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <response code="200">Успешное получение спецпредложения</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Спецпредложение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(SpecialOfferDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var specialOffer = await _specialOfferService.Get(id);
        var specialOfferDto = _mapper.Map<SpecialOfferDto>(specialOffer);

        return Ok(specialOfferDto);
    }

    /// <summary>
    /// Создание спецпредложения
    /// </summary>
    /// <param name="parameters">Параметры для создания спецпредложения</param>
    /// <response code="204">Успешное создание спецпредложения</response>
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
    public async Task<IActionResult> Create([FromBody] SpecialOfferCreateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _specialOfferService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование спецпредложения
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <param name="parameters">Параметры для редактирования спецпредложения</param>
    /// <response code="204">Успешное редактирование спецпредложения</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Спецпредложение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] SpecialOfferUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _specialOfferService.Update(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление спецпредложения
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <response code="204">Успешное удаление спецпредложения</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Спецпредложение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpDelete]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _specialOfferService.Delete(id);

        return NoContent();
    }
}