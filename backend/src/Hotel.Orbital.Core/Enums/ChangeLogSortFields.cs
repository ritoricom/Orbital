using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки журнала изменений
/// </summary>
public enum ChangeLogSortFields
{
    [Description("User.Fullname")]
    Author,
    
    [Description("Message")]
    Message,
    
    [Description("CreatedAt")]
    CreatedAt
}