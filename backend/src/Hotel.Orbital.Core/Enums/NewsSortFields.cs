using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки новостей
/// </summary>
public enum NewsSortFields
{
    [Description("Titles")]
    Title,
    
    [Description("Descriptions")]
    Description,
    
    [Description("PublishedAt")]
    PublishedAt
}