using System.ComponentModel;

namespace Entities.Enums;

/// <summary>
/// Города, в которых распологаются гостиницы
/// </summary>
[Flags]
public enum City
{
    /// <summary>
    /// Нововоронеж
    /// </summary>
    [Description("Нововоронеж")]
    Nvz,
    
    /// <summary>
    /// Обнинск
    /// </summary>
    [Description("Обнинск")]
    Obn,
    
    /// <summary>
    /// Санкт-Петербург
    /// </summary>
    [Description("Санкт-Петербург")]
    Spb
}