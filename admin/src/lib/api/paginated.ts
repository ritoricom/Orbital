import { Paginated } from "@/types/paginated";

interface PaginatedDto<T> {
  data: T[];
  totalCount: number;
}

export const mapFromPaginatedDto =
  <T, R>(mapFn: (value: T) => R) =>
  (dto: PaginatedDto<T>): Paginated<R> => ({
    items: dto.data.map(mapFn),
    total: dto.totalCount,
  });
