import { Nullable } from "@/types/utility";
import { NewsCity } from "../../types/news-city";

export type NewsCityDto = Nullable<"spb" | "obn" | "nvz">;

export const fromNewsCityDto = (dto: NewsCityDto): NewsCity => {
  switch (dto) {
    case null:
      return "all";
    default:
      return dto;
  }
};

export const toNewsCityDto = (newsCity: NewsCity): NewsCityDto => {
  switch (newsCity) {
    case "all":
      return null;
    default:
      return newsCity;
  }
};
