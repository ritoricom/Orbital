using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// Поля сортировки пользователей
/// </summary>
public enum UsersSortFields
{
    [Description("FullName")]
    Fullname,
    
    [Description("Email")]
    Email,
    
    [Description("City")]
    City,
    
    [Description("Role")]
    Role
}