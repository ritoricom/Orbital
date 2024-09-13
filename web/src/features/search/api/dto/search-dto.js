import { mapFromLeisureDto } from "@/features/leisures";
import { mapFromNewsDto } from "@/features/news";
import { mapFromRoomDto } from "@/features/rooms";
import { mapFromSpecialOfferDto } from "@/features/special-offers";

export const mapFromSearchDto = (dto) => ({
  rooms: dto.rooms.map(mapFromRoomDto),
  news: dto.news.map(mapFromNewsDto),
  specialOffers: dto.specialOffers.map(mapFromSpecialOfferDto),
  leisures: dto.leisures.map(mapFromLeisureDto),
});
