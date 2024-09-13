using System;

namespace Tests.TestModels;

/// <summary>
/// Тестовая модель данных для проверок
/// </summary>
public class Model
{
    public Guid Id { get; set; }
    
    public string Name { get; set; }
    
    public int Price { get; set; }
    
    public DateTime CreatedAt { get; set; }
}