using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки номеров
/// </summary>
public enum RoomsSortFields
{
    [Description("Titles")]
    Title,
    
    [Description("Hotel.City")]
    City,
    
    [Description("Price")]
    Price
}