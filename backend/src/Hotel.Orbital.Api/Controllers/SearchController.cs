using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер для глобального поиска
/// </summary>
[ApiController]
[Route("api/search")]
[Produces("application/json")]
public class SearchController : ControllerBase
{
    /// <summary/>
    private readonly IRoomsService _roomsService;

    /// <summary/>
    private readonly INewsService _newsService;

    /// <summary/>
    private readonly ISpecialOfferService _specialOfferService;

    /// <summary/>
    private readonly ILeisureService _leisureService;
    
    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public SearchController(IRoomsService roomsService, INewsService newsService, 
        ISpecialOfferService specialOfferService, ILeisureService leisureService, IMapper mapper)
    {
        _roomsService = roomsService;
        _newsService = newsService;
        _specialOfferService = specialOfferService;
        _leisureService = leisureService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение данных с помощью глобального поиска
    /// </summary>
    /// <param name="searchContext">Контекст поиска</param>
    /// <response code="200">Успешное получение списков</response>
    /// <response code="400">Некорректный ввод</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(SearchResultDto))]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] GlobalSearchContext searchContext)
    {
        var rooms = await _roomsService.GetListWithSearchFilter(searchContext);
        var news = await _newsService.GetListWithSearchFilter(searchContext);
        var specialOffers = await _specialOfferService.GetListWithSearchFilter(searchContext);
        var leisure = await _leisureService.GetListWithSearchFilter(searchContext);

        var roomsDto = _mapper.Map<List<RoomLocalizedDto>>(rooms, opts => opts.Items["lang"] = searchContext.Language);
        var newsDto = _mapper.Map<List<NewsLocalizedDto>>(news, opts => opts.Items["lang"] = searchContext.Language);
        var specialOffersDto = _mapper.Map<List<SpecialOfferLocalizedDto>>(specialOffers, opts => opts.Items["lang"] = searchContext.Language);
        var leisureDto = _mapper.Map<List<LeisureDto>>(leisure);

        var resultDto = new SearchResultDto
        {
            Rooms = roomsDto,
            News = newsDto,
            SpecialOffers = specialOffersDto,
            Leisures = leisureDto
        };
        
        return Ok(resultDto);
    }
}