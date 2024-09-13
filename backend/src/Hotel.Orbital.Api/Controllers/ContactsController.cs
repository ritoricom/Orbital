using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Entities.Enums;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер контактов
/// </summary>
[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    /// <summary/>
    private readonly IContactsService _contactsService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public ContactsController(IContactsService contactsService, IMapper mapper)
    {
        _contactsService = contactsService;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение контактов на одном языке
    /// </summary>
    /// <param name="city">Город</param>
    /// <param name="language">Язык</param>
    /// <response code="204">Успешное получение контактов</response>
    /// <response code="404">Контакты не найдены</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(ContactsLocalizedDto))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get([FromQuery] City city, Language language)
    {
        var contacts = await _contactsService.Get(city);
        var contactsDto = _mapper.Map<ContactsLocalizedDto>(contacts, opts => opts.Items["lang"] = language);

        return Ok(contactsDto);
    }
}