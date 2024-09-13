using System.Text.Json;

namespace Api.Models;

/// <summary>
/// Модель для отображения ошибок
/// </summary>
public class ErrorDetails
{
    /// <summary>
    /// Статус код ошибки
    /// </summary>
    public int StatusCode { get; set; }
    
    /// <summary>
    /// Сообщение об ошибке
    /// </summary>
    public string Message { get; set; }
    
    /// <summary>
    /// Трасировка стека
    /// </summary>
    public string StackTrace { get; set; }

    /// <summary>
    /// Перевод в json для отправки
    /// </summary>
    public override string ToString()
    {
        return JsonSerializer.Serialize(this, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
    }
}