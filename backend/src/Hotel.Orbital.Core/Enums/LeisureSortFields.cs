using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки досуга
/// </summary>
public enum LeisureSortFields
{
    [Description("Title")]
    Title,
    
    [Description("CreatedAt")]
    CreatedAt
}