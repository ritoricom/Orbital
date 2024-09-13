using System.ComponentModel;

namespace Entities.Enums;

/// <summary>
/// Роли пользователей
/// </summary>
public enum Role
{
    /// <summary>
    /// Администратор
    /// </summary>
    [Description("Администратор")]
    Admin,
    
    /// <summary>
    /// Менеджер
    /// </summary>
    [Description("Менеджер")]
    Manager
}