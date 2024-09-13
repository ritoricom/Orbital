import {
  QueryClient,
  DefaultOptions,
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import { notify } from "@/lib/notify";
import { ContextError } from "@/lib/error-ctx";
import { displayError } from "@/utils/display";

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
    useErrorBoundary: true,
  },
  mutations: {
    retry: false,
    useErrorBoundary: false,
    onError: (err) => {
      const ctx = err instanceof ContextError ? err.ctx : "Произошла ошибка";

      notify({
        kind: "error",
        title: ctx,
        desc: displayError(err),
      });
    },
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type QueryConfig<T, R = T> = Omit<
  UseQueryOptions<T, unknown, R, any>,
  "queryKey" | "queryFn" | "select"
>;

export type UseQueryReturn<T> = UseQueryResult<T, unknown>;

export type MutationConfig<T, R = void> = Omit<
  UseMutationOptions<R, unknown, T, unknown>,
  "mutationKey" | "mutationFn"
>;

export type UseMutationReturn<T, R = void> = UseMutationResult<
  R,
  unknown,
  T,
  unknown
>;
