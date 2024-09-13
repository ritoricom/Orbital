using System.ComponentModel;

namespace Tests.TestModels.Enums;

/// <summary>
/// Enum для теста получения описаний
/// </summary>
public enum Descriptions
{
    /// <summary>
    /// Поле без описания
    /// </summary>
    Value,
    
    /// <summary>
    /// Поле с описанием
    /// </summary>
    [Description("Description")]
    Desc
}