using Api.Extensions;
using Api.Models;
using AutoMapper;
using Core.Interfaces;
using Core.Models;
using Core.SearchContexts;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер пользователей
/// </summary>
[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = "Admin")]
[Produces("application/json")]
public class UsersController : ControllerBase
{
    /// <summary/>
    private readonly IUsersService _usersService;

    /// <summary/>
    private readonly IValidator<UserUpdateParameters> _validator;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public UsersController(
        IUsersService usersService, 
        IValidator<UserUpdateParameters> validator,
        IMapper mapper)
    {
        _usersService = usersService;
        _validator = validator;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Получение списка пользователей
    /// </summary>
    /// <param name="searchContext">Контекст поиска пользователей</param>
    /// <response code="200">Успешное получения списка пользователей</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [ProducesResponseType(200, Type = typeof(CollectionResult<UserDto>))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> GetList([FromQuery] UsersSearchContext searchContext)
    {
        var users = await _usersService.GetList(searchContext);
        var usersDto = _mapper.Map<CollectionResult<UserDto>>(users);

        return Ok(usersDto);
    }


    /// <summary>
    /// Получение пользователя по идентификатору
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    /// <response code="200">Успешное получение пользователя</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Пользователь не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("{id}")]
    [ProducesResponseType(200, Type = typeof(UserDto))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get(Guid id)
    {
        var user = await _usersService.Get(id);
        var userDto = _mapper.Map<UserDto>(user);

        return Ok(userDto);
    }

    /// <summary>
    /// Создание пользователя
    /// </summary>
    /// <param name="parameters">Параметры для создания пользователя</param>
    /// <response code="201">Успешное создание пользователя</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Пользователь не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [ProducesResponseType(201)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Create([FromBody] UserCreateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _usersService.Create(parameters);

        return CreatedAtAction(nameof(Create), null);
    }

    /// <summary>
    /// Редактирование пользователя
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    /// <param name="parameters">Параметры для редактирования пользователя</param>
    /// <response code="204">Успешное изменение пользователя</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Пользователь не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPut]
    [Route("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] UserUpdateParameters parameters)
    {
        await _validator.ValidateAndThrowAsync(parameters);
        
        await _usersService.Update(id, parameters);

        return NoContent();
    }
    
    /// <summary>
    /// Редактирование пароля пользователя
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    /// <param name="parameters">Параметры для редактирования пароля пользователя</param>
    /// <response code="204">Успешное изменение пароля пользователя</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Пользователь не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPatch]
    [Route("{id}/password")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Update(Guid id, [FromBody] PasswordUpdateParameters parameters)
    {
        await _usersService.UpdatePassword(id, parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление пользователя
    /// </summary>
    /// <param name="id">Идентификатор пользователя</param>
    /// <response code="204">Успешное удаление пользователя</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Пользователь не найден</response>
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
        await _usersService.Delete(id);

        return NoContent();
    }
}