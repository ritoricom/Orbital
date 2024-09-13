import { useState } from "react";

import { Nullable } from "@/types/utility";
import { mapNullable } from "@/utils/fp";

export interface UsePaginationReturn {
  page: number;
  total: Nullable<number>;
  count: Nullable<number>;
  setPage: (page: number) => void;
  resetPage: () => void;
  setTotal: (total: Nullable<number>) => void;
}

export interface UsePaginationOptions {
  pageSize: number;
}

export const usePagination = (
  options: UsePaginationOptions
): UsePaginationReturn => {
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<Nullable<number>>(null);

  const count = mapNullable<number, number>((value) =>
    Math.ceil(value / options.pageSize)
  )(total);

  const resetPage = () => {
    setPage(1);
  };

  return { page, total, count, setPage, resetPage, setTotal };
};
