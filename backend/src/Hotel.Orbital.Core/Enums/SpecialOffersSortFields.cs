using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сотрировки спецпредложений
/// </summary>
public enum SpecialOffersSortFields
{
    [Description("Titles")]
    Title,
    
    [Description("ShortDescriptions")]
    ShortDescription
}