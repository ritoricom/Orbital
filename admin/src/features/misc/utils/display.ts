import { City } from "@/features/misc";

export const displayCity = (city: City): string => {
  switch (city) {
    case "spb":
      return "Санкт-Петербург";
    case "obn":
      return "Обнинск";
    case "nvz":
      return "Нововоронеж";
  }
};
