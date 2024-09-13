using Core.Enums;
namespace Core.SearchContexts;

/// <summary>
/// Контекст поиска спецпредложений
/// </summary>
public class SpecialOffersSearchContext : SearchContext
{
    /// <summary>
    /// Поле для сортировки
    /// </summary>
    public SpecialOffersSortFields? SortField { get; set; }
}