import { FC } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { SEO } from "@/lib/meta";
import { DataTable } from "@/lib/data-table";
import { usePagination } from "@/lib/pagination";
import { useSorting } from "@/lib/sorting";
import { useSearch } from "@/hooks";
import { SearchInput } from "@/ui/inputs";
import { PageBar, PagePaper } from "@/ui/layout/";
import { toOptional } from "@/utils/to";
import { useChangeLogs } from "../hooks/use-change-logs";
import { useChangeLogsTable } from "../hooks/use-change-logs-table";
import { CHANGE_LOGS_PAGE_SIZE } from "../config/page-size";

export const ChangeLogs: FC = () => {
  const { search, debouncedSearch, setSearch } = useSearch();
  const { page, count, setPage, setTotal } = usePagination({
    pageSize: CHANGE_LOGS_PAGE_SIZE,
  });
  const { sorting, nextSorting } = useSorting();

  const { columns } = useChangeLogsTable();

  const { isFetching, data: paginatedChangeLogs } = useChangeLogs({
    search: debouncedSearch,
    sorting,
    pagination: {
      page,
      pageSize: CHANGE_LOGS_PAGE_SIZE,
    },
    queryConfig: {
      onSuccess: (data) => {
        setTotal(data.total);
      },
    },
  });

  const handleChangeSearch = (_: unknown, newSearch: string) => {
    setSearch(newSearch);
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Журнал действий" />
      <PagePaper>
        <Typography variant="h4">Журнал действий</Typography>
        <PageBar>
          <SearchInput search={search} onChange={handleChangeSearch} />
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={CHANGE_LOGS_PAGE_SIZE}
          rows={paginatedChangeLogs?.items}
          columns={columns}
          sortable={{ sorting, nextSorting }}
        />
        <Pagination
          size="large"
          page={page}
          count={toOptional(count)}
          sx={{ margin: "10px 0 0 auto" }}
          onChange={handleChangePage}
        />
      </PagePaper>
    </>
  );
};
