using Api.Models;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

/// <summary>
/// Контроллер для отправки рассылки
/// </summary>
[ApiController]
[Route("api/call-me-back")]
[Produces("application/json")]
public class CallMeBackController : ControllerBase
{
    /// <summary/>
    private readonly IEmailService _emailService;
    
    /// <summary/>
    public CallMeBackController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    /// <summary>
    /// Отправка рассылки
    /// </summary>
    /// <param name="parameters">Параметры для создания письма</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <response code="204">Успешноя отправка письма</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [ProducesResponseType(200)]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Send([FromBody] EmailCreateParameters parameters, 
        CancellationToken cancellationToken = default)
    {
        await _emailService.SendAsync(parameters, cancellationToken);
        
        return NoContent();
    }
}