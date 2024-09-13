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
import { PageBar, PageBarInner, PagePaper } from "@/ui/layout/";
import { toOptional } from "@/utils/to";
import { AddButton } from "@/features/misc/ui/AddButton";
import { CitySelectByUser } from "@/features/misc/ui/CitySelectByUser";
import { useCitySelectByUser } from "@/features/misc";
import { REVIEWS_PAGE_SIZE } from "../config/page-size";
import { useDeleteReviewConfirm } from "../hooks/use-delete-review-confirm";
import { useReviewsTable } from "../hooks/use-reviews-table";
import { useReviews } from "../hooks/use-reviews";

export const Reviews: FC = () => {
  const navigate = useNavigate();

  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: REVIEWS_PAGE_SIZE,
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

  const { canDelete, openDeleteReviewConfirm } = useDeleteReviewConfirm({
    onSuccess: () => {
      refetch();
    },
  });

  const { columns } = useReviewsTable({
    canDelete,
    onEdit: (review) => {
      navigate(`/reviews/${review.id}/edit`);
    },
    onDelete: (review) => {
      openDeleteReviewConfirm(review.id);
    },
  });

  const {
    isFetching,
    data: paginatedReviews,
    refetch,
  } = useReviews({
    search: debouncedSearch,
    city,
    sorting,
    pagination: {
      page,
      pageSize: REVIEWS_PAGE_SIZE,
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
    navigate("/reviews/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Отзывы" />
      <PagePaper>
        <Typography variant="h4">Отзывы</Typography>
        <PageBar>
          <CitySelectByUser {...selectProps} />
          <PageBarInner>
            <SearchInput search={search} onChange={handleChangeSearch} />
            <AddButton onClick={handleClickAdd} />
          </PageBarInner>
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={REVIEWS_PAGE_SIZE}
          rows={paginatedReviews?.items}
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
