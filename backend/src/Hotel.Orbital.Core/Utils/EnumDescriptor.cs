using System.ComponentModel;
using System.Reflection;

namespace Core.Utils;

/// <summary>
/// Методы для enum
/// </summary>
public static class EnumDescriptor
{
    /// <summary>
    /// Поиск полей по строке
    /// </summary>
    /// <param name="value">Строка поиска</param>
    /// <typeparam name="T">Enum</typeparam>
    /// <returns>Список значений enum, содержащих строку</returns>
    public static List<T> Find<T>(string value) where T : Enum
    {
        var descriptions = GetDescriptionDictionary<T>();

        return descriptions.Where(pair => pair.Value.ToLower().Contains(value.ToLower())).Select(pair => pair.Key).ToList();
    }
    
    /// <summary>
    /// Получение полей и описаний полей enum
    /// </summary>
    /// <typeparam name="T">Enum</typeparam>
    /// <returns>Словарь значений и описаний полей enum</returns>
    private static Dictionary<T, string> GetDescriptionDictionary<T>() where T : Enum
    {
        var descriptions = new Dictionary<T, string>();

        foreach (var item in Enum.GetValues(typeof(T)))
        {
            var fi = item.GetType().GetRuntimeField(item.ToString()!);

            var attribute = fi?.GetCustomAttribute<DescriptionAttribute>();
            
            descriptions.Add((T)item, attribute?.Description ?? item.ToString()!);
        }

        return descriptions;
    }

    /// <summary>
    /// Получение описания поля
    /// </summary>
    /// <param name="source">Значение enum</param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
    public static string GetDescription(this Enum source)
    {
        var fi = source.GetType().GetRuntimeField(source.ToString());

        var attribute = fi?.GetCustomAttribute<DescriptionAttribute>();

        return attribute?.Description ?? source.ToString();
    }
}