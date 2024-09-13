import { useState } from "react";

import { useAuthentication } from "@/lib/authentication";
import { assertNotNullable } from "@/utils/assert";
import { NewsCity } from "../types/news-city";
import { useNewsCityByUser } from "./use-news-city-by-user";
import { NewsCitySelectByUserProps } from "../ui/NewsCitySelectByUser";

export interface UseNewsCitySelectByUserOptions {
  onChange?: () => void;
}

export interface UseNewsCitySelectByUserReturn {
  city: NewsCity;
  selectProps: NewsCitySelectByUserProps;
}

export const useNewsCitySelectByUser = (
  options?: UseNewsCitySelectByUserOptions
): UseNewsCitySelectByUserReturn => {
  const { user } = useAuthentication();
  assertNotNullable(user);

  const { city: initialCity, accessToOtherCities } = useNewsCityByUser();

  const [city, setCity] = useState<NewsCity>(initialCity);

  const disabled = !accessToOtherCities;

  const handleChange = (city: NewsCity) => {
    setCity(city);

    options?.onChange?.();
  };

  return {
    city,
    selectProps: {
      value: city,
      disabled,
      onChange: handleChange,
    },
  };
};
