using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки отзывов
/// </summary>
public enum ReviewsSortFields
{
    [Description("Authors")]
    Author,
    
    [Description("PublishedAt")]
    PublishedAt,
    
    [Description("Grade")]
    Grade,
    
    [Description("Headers")]
    Header
}