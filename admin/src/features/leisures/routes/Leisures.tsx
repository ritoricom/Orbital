import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { SEO } from "@/lib/meta";
import { DataTable } from "@/lib/data-table";
import { usePagination } from "@/lib/pagination";
import { useSorting } from "@/lib/sorting";
import { useSearch } from "@/hooks";
import { SearchInput } from "@/ui/inputs";
import { PageBar, PagePaper } from "@/ui/layout";
import { toOptional } from "@/utils/to";
import { AddButton } from "@/features/misc/ui/AddButton";
import { LEISURES_PAGE_SIZE } from "../config/page-size";
import { useDeleteLeisureConfirm } from "../hooks/use-delete-leisure-confirm";
import { useLeisuresTable } from "../hooks/use-leisures-table";
import { useLeisures } from "../hooks/use-leisures";

export const Leisures: FC = () => {
  const navigate = useNavigate();

  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: LEISURES_PAGE_SIZE,
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

  const { canDelete, openDeleteLeisureConfirm } = useDeleteLeisureConfirm({
    onSuccess: () => {
      refetch();
    },
  });

  const { columns } = useLeisuresTable({
    canDelete,
    onEdit: (leisure) => {
      navigate(`/leisures/${leisure.id}/edit`);
    },
    onDelete: (review) => {
      openDeleteLeisureConfirm(review.id);
    },
  });

  const {
    isFetching,
    data: paginatedLeisures,
    refetch,
  } = useLeisures({
    search: debouncedSearch,
    sorting,
    pagination: {
      page,
      pageSize: LEISURES_PAGE_SIZE,
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

  const handleClickAdd = () => {
    navigate("/leisures/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Досуг" />
      <PagePaper>
        <Typography variant="h4">Досуг</Typography>
        <PageBar>
          <SearchInput search={search} onChange={handleChangeSearch} />
          <AddButton onClick={handleClickAdd} />
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={LEISURES_PAGE_SIZE}
          rows={paginatedLeisures?.items}
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
