import { NewsCity } from "../types/news-city";

export const displayNewsCity = (newsCity: NewsCity): string => {
  switch (newsCity) {
    case "spb":
      return "Санкт-Петербург";
    case "obn":
      return "Обнинск";
    case "nvz":
      return "Нововоронеж";
    case "all":
      return "Все города";
  }
};
