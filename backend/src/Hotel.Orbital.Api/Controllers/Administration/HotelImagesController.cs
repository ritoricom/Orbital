using Api.Extensions;
using Api.Models;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Administration;

/// <summary>
/// Контроллер изображений гостиницы
/// </summary>
[ApiController]
[Authorize(Roles = "Admin, Manager")]
[Route("api/admin/hotel/images")]
[Produces("application/json")]
public class HotelImagesController : ControllerBase
{
    /// <summary/>
    private readonly IHotelImagesService _hotelImagesService;

    /// <summary/>
    public HotelImagesController(IHotelImagesService hotelImagesService)
    {
        _hotelImagesService = hotelImagesService;
    }

    /// <summary>
    /// Добавление изображения к гостинице
    /// </summary>
    /// <param name="parameters">Параметры для добавления изображения</param>
    /// <response code="204">Успешное добавление изображения</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="400">Некорректный ввод данных</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(400, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Add([FromBody] HotelImageAddParameters parameters)
    {
        await _hotelImagesService.Add(parameters);

        return NoContent();
    }

    /// <summary>
    /// Удаление изображения гостиницы
    /// </summary>
    /// <param name="id">Идентификатор изображения гостиницы</param>
    /// <response code="204">Успешное удаление изображения гостиницы</response>
    /// <response code="401">Пользователь не зашел в систему</response>
    /// <response code="403">Доступ отсутствует</response>
    /// <response code="404">Изображение не найдено</response>
    /// <response code="500">Внутренняя ошибка сервера</response>
    [HttpPost]
    [Route("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(204)]
    [ProducesResponseType(401, Type = typeof(ErrorDetails))]
    [ProducesResponseType(403, Type = typeof(ErrorDetails))]
    [ProducesResponseType(404, Type = typeof(ErrorDetails))]
    [ProducesResponseType(500, Type = typeof(ErrorDetails))]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _hotelImagesService.Delete(id);
        
        return NoContent();
    }
}