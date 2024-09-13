import { useMemo } from "react";

import { useAuthentication } from "@/lib/authentication";
import { assertNotNullable } from "@/utils/assert";
import { City } from "../types/city";

export interface UseCityByUserReturn {
  city: City;
  accessToOtherCities: boolean;
}

export const useCityByUser = (): UseCityByUserReturn => {
  const { user } = useAuthentication();
  assertNotNullable(user);

  const city = useMemo<City>(() => {
    switch (user.role) {
      case "admin":
        return "spb";
      case "manager":
        assertNotNullable(user.city);
        return user.city;
    }
  }, [user]);

  const accessToOtherCities = user.role === "admin";

  return {
    city,
    accessToOtherCities,
  };
};
