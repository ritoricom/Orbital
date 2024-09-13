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
import { AddButton } from "@/features/misc/ui/AddButton";
import { NEWS_PAGE_SIZE } from "../config/page-size";
import { useDeleteNewsConfirm } from "../hooks/use-delete-news-confirm";
import { useNewsCitySelectByUser } from "../hooks/use-news-city-select-by-user";
import { useNewsTable } from "../hooks/use-news-table";
import { useNews } from "../hooks/use-news";
import { NewsCitySelectByUser } from "../ui/NewsCitySelectByUser";
import { useNavigate } from "react-router-dom";

export const News: FC = () => {
  const navigate = useNavigate();

  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: NEWS_PAGE_SIZE,
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
  const { city, selectProps } = useNewsCitySelectByUser({
    onChange: () => {
      resetPage();
    },
  });

  const { canDelete, openDeleteNewsConfirm } = useDeleteNewsConfirm({
    onSuccess: () => {
      refetch();
    },
  });

  const { columns } = useNewsTable({
    canDelete,
    onEdit: (news) => {
      navigate(`/news/${news.id}/edit`);
    },
    onDelete: (news) => {
      openDeleteNewsConfirm(news.id);
    },
  });

  const {
    isFetching,
    data: paginatedChangeLogs,
    refetch,
  } = useNews({
    search: debouncedSearch,
    city,
    sorting,
    pagination: {
      page,
      pageSize: NEWS_PAGE_SIZE,
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
    navigate("/news/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Новости" />
      <PagePaper>
        <Typography variant="h4">Новости</Typography>
        <PageBar>
          <NewsCitySelectByUser {...selectProps} />
          <PageBarInner>
            <SearchInput search={search} onChange={handleChangeSearch} />
            <AddButton onClick={handleClickAdd} />
          </PageBarInner>
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={NEWS_PAGE_SIZE}
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
