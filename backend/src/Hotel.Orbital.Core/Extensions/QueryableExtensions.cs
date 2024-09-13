using System.Linq.Expressions;
using Core.Enums;
using Core.Exceptions;
using Core.Utils;
using Entities;
using Entities.Enums;
using Microsoft.EntityFrameworkCore;

namespace Core.Extensions;

/// <summary>
/// Методы расширения для <see cref="IQueryable{T}" />
/// </summary>
public static class QueryableExtensions
{
    /// <summary>
    /// Получение одного элемента
    /// </summary>
    /// <param name="source"><see cref="IQueryable{T}" /> для возврата одного элемента</param>
    /// <param name="predicate">Лямюда-выражение для поиска</param>
    /// <typeparam name="TSource">Тип элементов в <paramref name="source"/></typeparam>
    /// <returns>Элемент IQueryble</returns>
    /// <exception cref="NotFoundException{TSource}">Элемент не найден</exception>
    public static async Task<TSource> SingleOrNotFoundAsync<TSource>(
        this IQueryable<TSource> source,
        Expression<Func<TSource, bool>> predicate)
    {
        var item = await source.SingleOrDefaultAsync(predicate);

        if (item == null) throw new NotFoundException<TSource>();

        return item;
    }

    /// <summary>
    /// Получение части из <see cref="IQueryable{T}"/>
    /// </summary>
    /// <param name="source">Исходный набор элементов в виде <see cref="IQueryable{T}"/></param>
    /// <param name="offset">Количество элементов, которые необходимо пропустить</param>
    /// <param name="pageSize">Количество элементов на странице</param>
    /// <typeparam name="TSource">Тип элемента из набора</typeparam>
    /// <returns>Запрошенное количество элементов по определенному расположению</returns>
    public static async Task<List<TSource>> ToPaginatedListAsync<TSource>(this IQueryable<TSource> source, int offset,
        int pageSize)
    {
       return await source.Skip(offset).Take(pageSize).ToListAsync();
    }

    /// <summary>
    /// Сортировка по напралению и свойству
    /// </summary>
    /// <param name="source">Исходный набор элементов в виде <see cref="IQueryable{T}"/></param>
    /// <param name="order">Порядок сортировки</param>
    /// <param name="propertyName">Свойство для сортировки</param>
    /// <typeparam name="TSource">Тип элемента из набора</typeparam>
    /// <returns>Отсортированный набор элементов в виде <see cref="IOrderedQueryable{T}"/></returns>
    public static IOrderedQueryable<TSource> OrderBy<TSource>(this IQueryable<TSource> source, SortOrder? order, string propertyName)
    {
        return (order == SortOrder.Desc)
            ? source.CallOrderedQueryable("OrderByDescending", propertyName)
            : source.CallOrderedQueryable("OrderBy", propertyName);
    }
    
    /// <summary>
    /// Генерация вызова методов Queryable с использованием наименования свойства
    /// </summary>
    private static IOrderedQueryable<T> CallOrderedQueryable<T>(this IQueryable<T> query, string methodName,
        string propertyName)
    {
        if (string.IsNullOrEmpty(propertyName))
            propertyName = typeof(T).GetProperties().First().Name;

        var param = Expression.Parameter(typeof(T), "a");

        var body = propertyName.Split('.').Aggregate<string, Expression>(param, Expression.PropertyOrField);

        return (IOrderedQueryable<T>)query.Provider.CreateQuery(
            Expression.Call(
                typeof(Queryable),
                methodName,
                new[] { typeof(T), body.Type },
                query.Expression,
                Expression.Lambda(body, param)
            )
        );
    }

    #region SearchFilters

    /// <summary>
    /// Добавление поискового фильтра для номеров
    /// </summary>
    /// <param name="query">Номера</param>
    /// <param name="search">Строка поиска</param>
    /// <param name="language">Язык</param>
    /// <returns>Номера с применением поискового поиска</returns>
    public static IQueryable<Room> AddSearchFilter(this IQueryable<Room> query, string? search, Language language = Language.Ru)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var result = query.Where(room => 
            room.Titles.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()));

        return result;
    }

    /// <summary>
    /// Добавление поискового фильтра для новостей
    /// </summary>
    /// <param name="query">Новости</param>
    /// <param name="search">Строка поиска</param>
    /// <param name="language">Язык</param>
    /// <returns>Новости с применением поискового поиска</returns>
    public static IQueryable<News> AddSearchFilter(this IQueryable<News> query, string? search, Language language = Language.Ru)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;

        var result = query.Where(news => 
            news.Titles.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()));

        return result;
    }

    /// <summary>
    /// Добавление поискового фильтра для спецпредложений
    /// </summary>
    /// <param name="query">Спецпредложения</param>
    /// <param name="search">Строка поиска</param>
    /// <param name="language">Язык</param>
    /// <returns>Спецпредложения с применением поискового поиска</returns>
    public static IQueryable<SpecialOffer> AddSearchFilter(this IQueryable<SpecialOffer> query, string? search, Language language = Language.Ru)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;

        var result = query.Where(specialOffer =>
            specialOffer.Titles.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()));

        return result;
    }
    
    /// <summary>
    /// Добавление поискового фильтра для мероприятий досуга
    /// </summary>
    /// <param name="query">Мероприятия досуга</param>
    /// <param name="search">Строка поиска</param>
    /// <returns>Мероприятия досуга с применением поискового поиска</returns>
    public static IQueryable<Leisure> AddSearchFilter(this IQueryable<Leisure> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var result = query.Where(leisure => leisure.Title.ToLower().Contains(search.ToLower()));

        return result;
    }
    
    /// <summary>
    /// Добавление поискового фильтра для записей журнала изменений
    /// </summary>
    /// <param name="query">Записи журнала изменений</param>
    /// <param name="search">Строка поиска</param>
    /// <returns>Записи журнала изменений с применением поискового поиска</returns>
    public static IQueryable<ChangeLog> AddSearchFilter(this IQueryable<ChangeLog> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var result = query.Where(change => change.User!.FullName.ToLower().Contains(search.ToLower())
                                      || change.Message.ToLower().Contains(search.ToLower()));

        return result;
    }
    
    /// <summary>
    /// Добавление поискового фильтра для рыссылки
    /// </summary>
    /// <param name="query">Рассылка</param>
    /// <param name="search">Строка поиска</param>
    /// <returns>Рассылка с применением поискового поиска</returns>
    public static IQueryable<Newsletter> AddSearchFilter(this IQueryable<Newsletter> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var result = query.Where(newsletter => newsletter.Email.ToLower().Contains(search.ToLower()));

        return result;
    }

    /// <summary>
    /// Добавление поискового фильтра для отзывов
    /// </summary>
    /// <param name="query">Отзывы</param>
    /// <param name="search">Строка поиска</param>
    /// <param name="language">Язык</param>
    /// <returns>Отзывы с применением поискового поиска</returns>
    public static IQueryable<Review> AddSearchFilter(this IQueryable<Review> query, string? search, Language language = Language.Ru)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var result = query.Where(review => review.Authors.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()) 
                                      || review.Headers.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()) 
                                      || review.Descriptions.RootElement.GetProperty(language.ToString()).GetString()!.ToLower().Contains(search.ToLower()));

        return result;
    }
    
    /// <summary>
    /// Добавление поискового фильтра для пользователй
    /// </summary>
    /// <param name="query">Пользователи</param>
    /// <param name="search">Строка поиска</param>
    /// <returns>Пользователи с применением поискового поиска</returns>
    public static IQueryable<User> AddSearchFilter(this IQueryable<User> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) 
            return query;
        
        var cities = EnumDescriptor.Find<City>(search);
        var roles = EnumDescriptor.Find<Role>(search);
            
        var result = query.Where(user => user.FullName.ToLower().Contains(search.ToLower())
                                    || user.Email.ToLower().Contains(search.ToLower())
                                    || roles.Contains(user.Role)
                                    || cities.Contains((City)user.City!));

        return result;
    }
    
    #endregion
}