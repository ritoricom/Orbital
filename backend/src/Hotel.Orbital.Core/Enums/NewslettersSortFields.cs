using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки рассылки
/// </summary>
public enum NewslettersSortFields
{
    [Description("Email")]
    Email,
    
    [Description("Hotel.City")]
    City
}