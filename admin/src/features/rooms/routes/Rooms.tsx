import { FC } from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { SEO } from "@/lib/meta";
import { DataTable } from "@/lib/data-table";
import { usePagination } from "@/lib/pagination";
import { useSorting } from "@/lib/sorting";
import { useSearch } from "@/hooks";
import { SearchInput } from "@/ui/inputs";
import { PageBar, PageBarInner, PagePaper } from "@/ui/layout/";
import { toOptional } from "@/utils/to";
import { CitySelectByUser } from "@/features/misc/ui/CitySelectByUser";
import { useCitySelectByUser } from "@/features/misc";
import { SyncRoomsButton } from "@/features/rooms/ui/SyncRoomsButton";
import { ROOMS_PAGE_SIZE, useRoomsTable, useRooms } from "@/features/rooms";

export const Rooms: FC = () => {
  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: ROOMS_PAGE_SIZE,
  });
  const { search, debouncedSearch, setSearch } = useSearch({
    onChange: () => {
      resetPage();
    },
  });
  const { sorting, nextSorting } = useSorting({
    onChange: () => {
      resetPage();
    },
  });
  const { city, selectProps } = useCitySelectByUser({
    onChange: () => {
      resetPage();
    },
  });

  const { columns } = useRoomsTable({
    onSuccessUpdateCover: () => {
      refetch();
    },
  });

  const {
    isFetching,
    data: paginatedRooms,
    refetch,
  } = useRooms({
    search: debouncedSearch,
    city,
    sorting,
    pagination: {
      page,
      pageSize: ROOMS_PAGE_SIZE,
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

  const handleSuccessSync = () => {
    refetch();
  };

  return (
    <>
      <SEO title="Номера" />
      <PagePaper>
        <Typography variant="h4">Номера</Typography>
        <PageBar>
          <CitySelectByUser {...selectProps} />
          <PageBarInner>
            <SearchInput search={search} onChange={handleChangeSearch} />
            <SyncRoomsButton onSuccess={handleSuccessSync} />
          </PageBarInner>
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={ROOMS_PAGE_SIZE}
          rows={paginatedRooms?.items}
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
