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
import { NEWSLETTER_PAGE_SIZE } from "../config/page-size";
import { useDeleteNewsletterConfirm } from "../hooks/use-delete-newsletter-confirm";
import { useNewslettersTable } from "../hooks/use-newsletters-table";
import { useNewsletters } from "../hooks/use-newsletters";

export const Newsletters: FC = () => {
  const navigate = useNavigate();

  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: NEWSLETTER_PAGE_SIZE,
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

  const { canDelete, openDeleteNewsletterConfirm } = useDeleteNewsletterConfirm(
    {
      onSuccess: () => {
        refetchNewsletters();
      },
    }
  );

  const { columns } = useNewslettersTable({
    canDelete,
    onEdit: (newsletter) => {
      navigate(`/newsletters/${newsletter.id}/edit`);
    },
    onDelete: (newsletter) => {
      openDeleteNewsletterConfirm(newsletter.id);
    },
  });

  const {
    isFetching,
    data: paginatedNewsletters,
    refetch: refetchNewsletters,
  } = useNewsletters({
    search: debouncedSearch,
    city,
    sorting,
    pagination: {
      page,
      pageSize: NEWSLETTER_PAGE_SIZE,
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
    navigate("/newsletters/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Рассылки" />
      <PagePaper>
        <Typography variant="h4">Рассылки</Typography>
        <PageBar>
          <CitySelectByUser {...selectProps} />
          <PageBarInner>
            <SearchInput search={search} onChange={handleChangeSearch} />
            <AddButton onClick={handleClickAdd} />
          </PageBarInner>
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={NEWSLETTER_PAGE_SIZE}
          rows={paginatedNewsletters?.items}
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
