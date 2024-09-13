using Api.Extensions;
using Api.Models;
using AutoMapper;
using Core.Exceptions;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BC = BCrypt.Net.BCrypt;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер авторизации
/// </summary>
[ApiController]
[Route("api/admin/auth")]
public class AuthController : ControllerBase
{
    /// <summary/>
    private readonly IAuthService _authService;

    /// <summary/>
    private readonly IUsersService _usersService;

    /// <summary/>
    private readonly IMapper _mapper;

    /// <summary/>
    public AuthController(IAuthService authService, IUsersService usersService, IMapper mapper)
    {
        _authService = authService;
        _usersService = usersService;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Вход в учетную запись
    /// </summary>
    /// <param name="parameters">Email и пароль пользователя</param>
    /// <exception cref="InvalidEmailOrPasswordException">Пароль неверный</exception>
    /// <response code="200">Успешное получение токена</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [AllowAnonymous]
    [ProducesResponseType(200, Type = typeof(TokenDto))]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Login(UserLoginParameters parameters)
    {
        var token = await _authService.GetToken(parameters);
        var tokenDto = token.ToDto();

        return Ok(tokenDto);
    }

    /// <summary>
    /// Получение пользователем своих данных
    /// </summary>
    /// <response code="200">Успешное получение данных пользователя</response>
    /// <response code="404">Пользователь не найден</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpGet]
    [Route("me")]
    [Authorize]
    [ProducesResponseType(200, Type = typeof(UserDto))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Get()
    {
        var user = await _usersService.Get(HttpContext.GetUserId());
        var userDto = _mapper.Map<UserDto>(user);

        return Ok(userDto);
    }
}
