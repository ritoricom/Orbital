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
import { PageBar, PagePaper } from "@/ui/layout/";
import { toOptional } from "@/utils/to";
import { AddButton } from "@/features/misc/ui/AddButton";
import { USERS_PAGE_SIZE } from "@/features/users";
import { SPECIAL_OFFERS_PAGE_SIZE } from "../config/page-size";
import { useDeleteSpecialOfferConfirm } from "../hooks/use-delete-special-offer-confirm";
import { useSpecialOffersTable } from "../hooks/use-special-offers-table";
import { useSpecialOffers } from "../hooks/use-special-offers";

export const SpecialOffers: FC = () => {
  const navigate = useNavigate();

  const { page, count, setPage, resetPage, setTotal } = usePagination({
    pageSize: USERS_PAGE_SIZE,
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

  const { columns } = useSpecialOffersTable({
    onEdit: (specialOffer) => {
      navigate(`/special-offers/${specialOffer.id}/edit`);
    },
    onDelete: (specialOffer) => {
      openDeleteSpecialOfferConfirm(specialOffer.id);
    },
  });

  const {
    isFetching,
    data: paginatedSpecialOffers,
    refetch: refetchSpecialOffers,
  } = useSpecialOffers({
    search: debouncedSearch,
    sorting,
    pagination: {
      page,
      pageSize: SPECIAL_OFFERS_PAGE_SIZE,
    },
    queryConfig: {
      onSuccess: (data) => {
        setTotal(data.total);
      },
    },
  });

  const { openDeleteSpecialOfferConfirm } = useDeleteSpecialOfferConfirm({
    onSuccess: () => {
      refetchSpecialOffers();
    },
  });

  const handleChangeSearch = (_: unknown, newSearch: string) => {
    setSearch(newSearch);
  };

  const handleClickAdd = () => {
    navigate("/special-offers/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Спецпредложения" />
      <PagePaper>
        <Typography variant="h4">Спецпредложения</Typography>
        <PageBar>
          <SearchInput search={search} onChange={handleChangeSearch} />
          <AddButton onClick={handleClickAdd} />
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={USERS_PAGE_SIZE}
          rows={paginatedSpecialOffers?.items}
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
