import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { useAuthentication } from "@/lib/authentication";
import { SEO } from "@/lib/meta";
import { DataTable } from "@/lib/data-table";
import { usePagination } from "@/lib/pagination";
import { useSorting } from "@/lib/sorting";
import { useSearch } from "@/hooks";
import { SearchInput } from "@/ui/inputs";
import { PageBar, PagePaper } from "@/ui/layout/";
import { isNonNullable } from "@/utils/eq";
import { toOptional } from "@/utils/to";
import { AddButton } from "@/features/misc/ui/AddButton";
import {
  USERS_PAGE_SIZE,
  useDeleteUserConfirm,
  useUsers,
  useUsersTable,
} from "@/features/users";

export const Users: FC = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthentication();

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

  const { columns } = useUsersTable({
    onChangePassword: (user) => {
      navigate(`/users/${user.id}/change-password`);
    },
    onEdit: (user) => {
      navigate(`/users/${user.id}/edit`);
    },
    onDelete: (user) => {
      openDeleteUserConfirm(user.id);
    },
  });

  const {
    isFetching,
    data: paginatedUsers,
    refetch,
  } = useUsers({
    search: debouncedSearch,
    sorting,
    pagination: {
      page,
      pageSize: USERS_PAGE_SIZE,
    },
    queryConfig: {
      onSuccess: (data) => {
        setTotal(data.total);
      },
    },
  });

  const { openDeleteUserConfirm } = useDeleteUserConfirm({
    onSuccess: (userID) => {
      if (isNonNullable(user) && userID === user.id) {
        logout();
      } else {
        refetch();
      }
    },
  });

  const handleChangeSearch = (_: unknown, newSearch: string) => {
    setSearch(newSearch);
  };

  const handleClickAdd = () => {
    navigate("/users/create");
  };

  const handleChangePage = (_: unknown, value: number) => {
    setPage(value);
  };

  return (
    <>
      <SEO title="Пользователи" />
      <PagePaper>
        <Typography variant="h4">Пользователи</Typography>
        <PageBar>
          <SearchInput search={search} onChange={handleChangeSearch} />
          <AddButton onClick={handleClickAdd} />
        </PageBar>
        <DataTable
          loading={isFetching}
          skeletonCount={USERS_PAGE_SIZE}
          rows={paginatedUsers?.items}
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
