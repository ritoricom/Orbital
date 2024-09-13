using Api.Extensions;
using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер контактов
/// </summary>
[ApiController]
[Authorize(Roles = "Admin, Manager")]
[Route("api/admin/contacts")]
public class ContactsController : ControllerBase
{
    /// <summary/>
    private readonly IContactsService _contactsService;

    /// <summary/>
    private readonly IValidator<ContactsUpdateParameters> _validator;
    
    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public ContactsController(
        IContactsService contactsService, 
        IValidator<ContactsUpdateParameters> validator,
        IMapper mapper)
    {
        _contactsService = contactsService;
        _validator = validator;
        _mapper = mapper;
    }

    /// <summary>
    /// Получение контактов
    /// </summary>
    /// <param name="city">Город</param>
    /// <response code="204">Успешное получение контактов</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="404">Контакты не найдены</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{city}")]
    [ProducesResponseType(200, Type = typeof(ContactsDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(City city)
    {
        var contacts = await _contactsService.Get(city);
        var contactsDto = _mapper.Map<ContactsDto>(contacts);

        return Ok(contactsDto);
    }

    /// <summary>
    /// Редактирование контактов
    /// </summary>
    /// <param name="parameters">Параметры для редактирования</param>
    /// <response code="204">Успешное редактирование контактов</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Контакты не найдены</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update([FromBody] ContactsUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _contactsService.Update(parameters);

        return NoContent();
    }
}