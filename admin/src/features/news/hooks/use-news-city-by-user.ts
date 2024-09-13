import { useMemo } from "react";

import { useAuthentication } from "@/lib/authentication";
import { assertNotNullable } from "@/utils/assert";
import { NewsCity } from "../types/news-city";

export interface UseNewsCityByUserReturn {
  city: NewsCity;
  accessToOtherCities: boolean;
}

export const useNewsCityByUser = (): UseNewsCityByUserReturn => {
  const { user } = useAuthentication();
  assertNotNullable(user);

  const city = useMemo<NewsCity>(() => {
    switch (user.role) {
      case "admin":
        return "all";
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
