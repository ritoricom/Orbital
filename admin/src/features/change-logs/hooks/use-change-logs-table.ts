import { TableColumns } from "@/lib/data-table";
import { getOr } from "@/utils/fp";
import { ChangeLog } from "../types/change-log";

export interface UseChangeLogsTableReturn {
  columns: TableColumns<ChangeLog>;
}

export const useChangeLogsTable = (): UseChangeLogsTableReturn => ({
  columns: [
    {
      key: "fullName",
      type: "сomputed",
      сomputed: ({ row: room }) => getOr("Система")(room.author?.fullName),
      headerName: "ФИО",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "author",
      },
    },
    {
      key: "message",
      type: "standard",
      field: "message",
      headerName: "Сообщение",
      align: "left",
      maxWidth: "50%",
      sortOptions: {
        sortable: true,
        field: "message",
      },
    },
    {
      key: "createdAt",
      type: "date",
      field: "createdAt",
      headerName: "Дата и время",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "createdAt",
      },
    },
  ],
});
