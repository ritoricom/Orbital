import { useState } from "react";

import { Nullable } from "@/types/utility";
import { Sorting, SortOrder } from "./types";

export interface UseSortingOptions {
  onChange?: () => void;
}

export interface UseSortingReturn {
  sorting: Sorting;
  nextSorting: (field: string) => void;
  resetSorting: () => void;
}

export const useSorting = (options?: UseSortingOptions): UseSortingReturn => {
  const [sorting, setSorting] = useState<Sorting>({
    field: null,
    order: null,
  });

  const getNextSortField = (field: string): Nullable<string> => {
    switch (sorting.order) {
      case null:
      case "asc":
        return field;
      case "desc":
        return null;
    }
  };

  const getNextSortOrder = (): Nullable<SortOrder> => {
    switch (sorting.order) {
      case null:
        return "asc";
      case "asc":
        return "desc";
      case "desc":
        return null;
    }
  };

  // TODO: make reducer
  const nextSorting = (field: string) => {
    if (sorting.field === field) {
      setSorting({
        field: getNextSortField(field),
        order: getNextSortOrder(),
      });
    } else {
      setSorting({
        field: field,
        order: "asc",
      });
    }

    options?.onChange?.();
  };

  const resetSorting = () => {
    setSorting({
      field: null,
      order: null,
    });
  };

  return {
    sorting,
    nextSorting,
    resetSorting,
  };
};
