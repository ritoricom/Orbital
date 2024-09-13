using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер спецпредложений
/// </summary>
[ApiController]
[Route("api/special-offers")]
[Produces("application/json")]
public class SpecialOffersController : ControllerBase
{
    /// <summary/>
    private readonly ISpecialOfferService _specialOfferService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public SpecialOffersController(ISpecialOfferService specialOfferService, IMapper mapper)
    {
        _specialOfferService = specialOfferService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение списка спецпредложений на одном языке
    /// </summary>
    /// <param name="searchContext">Контекст поиска спецпредложений</param>
    /// <response code="200">Успешное получение списка спецпредложений</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<SpecialOfferLocalizedDto>))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] SpecialOffersClientSearchContext searchContext)
    {
        var specialOffers = await _specialOfferService.GetClientList(searchContext);
        var specialOffersDto = _mapper.Map<CollectionResult<SpecialOfferLocalizedDto>>(specialOffers, opts => opts.Items["lang"] = searchContext.Language);

        return Ok(specialOffersDto);
    }

    /// <summary>
    /// Получение спецпредложения по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор спецпредложения</param>
    /// <param name="nestedSize">Количество вложенных спецпредложений</param>
    /// <param name="language">Язык</param>
    /// <response code="200">Успешное получение спецпредложения</response>
    /// <response code="404">Спецпредложение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(DtoWithNested<SpecialOfferLocalizedDto>))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id, [FromQuery] int nestedSize, [FromQuery] Language language)
    {
        var specialOffer = await _specialOfferService.GetWithNested(id, nestedSize);
        var specialOfferDto = _mapper.Map<DtoWithNested<SpecialOfferLocalizedDto>>(specialOffer, opts => opts.Items["lang"] = language);

        return Ok(specialOfferDto);
    }
}