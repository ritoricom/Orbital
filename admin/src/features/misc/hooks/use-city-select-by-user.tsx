import { useState } from "react";

import { useAuthentication } from "@/lib/authentication";
import { assertNotNullable } from "@/utils/assert";
import { CitySelectByUserProps } from "@/features/misc/ui/CitySelectByUser";
import { City, useCityByUser } from "@/features/misc";

export interface UseCitySelectByUserOptions {
  onChange?: () => void;
}

export interface UseCitySelectByUserReturn {
  city: City;
  selectProps: CitySelectByUserProps;
}

export const useCitySelectByUser = (
  options?: UseCitySelectByUserOptions
): UseCitySelectByUserReturn => {
  const { user } = useAuthentication();
  assertNotNullable(user);

  const { city: initialCity, accessToOtherCities } = useCityByUser();
  const [city, setCity] = useState<City>(initialCity);

  const disabled = !accessToOtherCities;

  const handleChange = (newCity: City) => {
    setCity(newCity);

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
