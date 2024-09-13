import { Sorting, SortOrder } from "@/lib/sorting";
import { isNonNullable } from "@/utils/eq";

interface SortingDto {
  sortField?: string;
  sortOrder?: SortOrder;
}

export const toSortingDto = (sort: Sorting): SortingDto => ({
  ...(isNonNullable(sort.field) && {
    sortField: sort.field,
  }),
  ...(isNonNullable(sort.order) && {
    sortOrder: sort.order,
  }),
});
