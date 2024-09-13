import { Pagination } from "@/lib/pagination";

interface PaginationDto {
  page: string;
  pageSize: string;
}

export const toPaginationDto = (pagination: Pagination): PaginationDto => ({
  page: String(pagination.page - 1),
  pageSize: String(pagination.pageSize),
});
