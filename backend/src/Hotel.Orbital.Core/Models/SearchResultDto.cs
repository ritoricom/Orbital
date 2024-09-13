using Core.Enums;

namespace Core.Models;

public class SearchResultDto
{
    public List<RoomLocalizedDto> Rooms { get; set; }

    public List<NewsLocalizedDto> News { get; set; }
    
    public List<SpecialOfferLocalizedDto> SpecialOffers { get; set; }
    
    public List<LeisureDto> Leisures { get; set; }
}