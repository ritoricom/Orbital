import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { City } from "@/features/misc";
import { getContacts } from "../api/get-contacts";
import { Contacts } from "../types/contacts";

export interface UseContactsOptions {
  city: City;
  queryConfig?: QueryConfig<Contacts>;
}

export const useContacts = (
  options: UseContactsOptions
): UseQueryReturn<Contacts> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "contacts",
      {
        city: options.city,
      },
    ],
    queryFn: () =>
      getContacts({
        city: options.city,
      }),
  });
