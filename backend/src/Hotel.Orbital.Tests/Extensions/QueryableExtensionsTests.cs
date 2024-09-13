using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoFixture.Xunit2;
using Core.Enums;
using Core.Extensions;
using Microsoft.EntityFrameworkCore;
using Tests.TestModels;
using Xunit;

namespace Tests.Extensions;

/// <summary>
/// Тесты для методов расширения <see cref="IQueryable{T}"/>
/// </summary>
public class QueryableExtensionsTests
{
    /// <summary/>
    private readonly List<Model> _testModels;

    /// <summary/>
    private readonly Random _random;
    
    /// <summary/>
    public QueryableExtensionsTests()
    {
        _random = new Random();

        _testModels = new List<Model>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "tygdehiewjekq",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "qakewwlauifhaAJW",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "WUWweyquawijwd",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "ewaswfkeowqe",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "QKEIWQIWQDWQ",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "rlgferwfskeofkw",
                Price = _random.Next(1000),
                CreatedAt = DateTime.Now.AddDays(_random.Next(1000))
            }
        };
    }

    /// <summary>
    /// Проверка метода расширения для пагинации
    /// </summary>
    /// <param name="offset">Смещение</param>
    /// <param name="pageSize">Размер страницы</param>
    [Theory]
    [InlineData(0, 2)]
    [InlineData(1, 2)]
    [InlineData(0, 0)]
    [InlineData(1, 3)]
    [InlineData(0, 3)]
    [InlineData(0, 4)]
    [InlineData(2, 5)]
    [InlineData(1, 4)]
    [InlineData(0, 1)]
    [InlineData(1, 1)]
    public async void GetPaginatedList_DifferentNumbers_CorrectResult(int offset, int pageSize)
    {
        var query = _testModels.AsAsyncQueryable();

        var result = await query.ToPaginatedListAsync(offset, pageSize);

        var testData = _testModels.Skip(offset).Take(pageSize).ToList();
        
        Assert.Equal(testData, result);
    }

    /// <summary>
    /// Проверка метода универсальной сортировки
    /// </summary>
    /// <param name="sortField">Поле для сортировки</param>
    /// <param name="order">Направление сортировки</param>
    [Theory]
    [InlineData("Id", SortOrder.Asc)]
    [InlineData("Id", SortOrder.Desc)]
    [InlineData("Name", SortOrder.Asc)]
    [InlineData("Name", SortOrder.Desc)]
    [InlineData("Price", SortOrder.Asc)]
    [InlineData("Price", SortOrder.Desc)]
    [InlineData("CreatedAt", SortOrder.Asc)]
    [InlineData("CreatedAt", SortOrder.Desc)]
    public async void GetSortedList_FieldsOfModel_CorrectResult(string sortField, SortOrder order)
    {
        var query = _testModels.AsAsyncQueryable();

        var result = await query.OrderBy(order, sortField).ToListAsync();

        var testData = sortField switch
        {
            "Id" => GetSortedList(query, order, item => item.Id),
            "Name" => GetSortedList(query, order, item => item.Name),
            "Price" => GetSortedList(query, order, item => item.Price),
            "CreatedAt" => GetSortedList(query, order, item => item.CreatedAt)
        };
        
        Assert.Equal(testData, result);
    }

    /// <summary>
    /// Получение отсортированного списка
    /// </summary>
    /// <param name="items">Набор данных в виде <see cref="IQueryable{T}"/></param>
    /// <param name="order">Напрвление сортировки</param>
    /// <param name="keySelector">Функция для выбора поля</param>
    /// <typeparam name="TKey">Выбранное поле сортировки</typeparam>
    /// <returns>Отсортированный список</returns>
    private List<Model> GetSortedList<TKey>(IQueryable<Model> items, SortOrder order,
        Expression<Func<Model, TKey>> keySelector)
    {
        var result = order == SortOrder.Asc
            ? items.OrderBy(keySelector)
            : items.OrderByDescending(keySelector);

        return result.ToList();
    }
}