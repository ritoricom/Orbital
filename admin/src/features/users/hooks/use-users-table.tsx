import { TableColumns } from "@/lib/data-table";
import { foldNullable } from "@/utils/fp";
import { displayNullable } from "@/utils/display";
import { displayCity, City } from "@/features/misc";
import { User, UserRole, displayUserRole } from "@/features/users";
import { UserActionsCell } from "../ui/UserActionsCell";

export interface UseUsersTableOptions {
  onChangePassword: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export interface UseUsersTableReturn {
  columns: TableColumns<User>;
}

export const useUsersTable = (
  options: UseUsersTableOptions
): UseUsersTableReturn => ({
  columns: [
    {
      key: "fullName",
      type: "standard",
      field: "fullName",
      headerName: "ФИО",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "fullname",
      },
    },
    {
      key: "email",
      type: "standard",
      field: "email",
      headerName: "E-mail",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "email",
      },
    },
    {
      key: "city",
      type: "сomputed",
      сomputed: (ctx) =>
        foldNullable<City, string>(displayCity, displayNullable)(ctx.row.city),
      headerName: "Город",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "city",
      },
    },
    {
      key: "role",
      type: "сomputed",
      сomputed: (ctx) =>
        foldNullable<UserRole, string>(
          displayUserRole,
          displayNullable
        )(ctx.row.role),
      headerName: "Роль",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "role",
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: user }) => (
        <UserActionsCell
          onChangePassword={() => options.onChangePassword(user)}
          onEdit={() => options.onEdit(user)}
          onDelete={() => options.onDelete(user)}
        />
      ),
      headerName: "",
      align: "right",
      sortOptions: {
        sortable: false,
      },
    },
  ],
});
