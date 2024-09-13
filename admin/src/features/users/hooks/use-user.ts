import { useQuery } from "@tanstack/react-query";

import { QueryConfig, UseQueryReturn } from "@/lib/react-query";
import { getUser, User } from "@/features/users";

export interface UseUserOptions {
  userID: string;
  queryConfig?: QueryConfig<User>;
}

export const useUser = (options: UseUserOptions): UseQueryReturn<User> =>
  useQuery({
    ...options.queryConfig,
    queryKey: [
      "user",
      {
        userID: options.userID,
      },
    ],
    queryFn: () =>
      getUser({
        userID: options.userID,
      }),
  });
