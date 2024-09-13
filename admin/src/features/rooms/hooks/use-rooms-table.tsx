import { TableColumns } from "@/lib/data-table";
import { toOptional } from "@/utils/to";
import { displayCity } from "@/features/misc";
import { ImageCell } from "@/features/images/ui/ImageCell";
import { RoomLinkCell } from "@/features/rooms/ui/RoomLinkCell";
import { UpdateRoomCoverCell } from "@/features/rooms/ui/UpdateRoomCoverCell";
import { Room } from "@/features/rooms";

export interface UseRoomsTableOptions {
  onSuccessUpdateCover?: () => void;
}

export interface UseRoomsTableReturn {
  columns: TableColumns<Room>;
}

export const useRoomsTable = (
  options?: UseRoomsTableOptions
): UseRoomsTableReturn => ({
  columns: [
    {
      key: "cover",
      type: "component",
      render: ({ row: room }) => <ImageCell image={toOptional(room.cover)} />,
      headerName: "Обложка",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "name",
      type: "component",
      render: ({ row: room }) => <RoomLinkCell room={room} />,
      headerName: "Название",
      maxWidth: "25%",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "title",
      },
    },
    {
      key: "city",
      type: "сomputed",
      сomputed: ({ row: room }) => displayCity(room.city),
      headerName: "Город",
      align: "left",
      sortOptions: {
        sortable: false,
      },
    },
    {
      key: "price",
      type: "сomputed",
      сomputed: ({ row: room }) => `${room.price} руб./сут.`,
      headerName: "Цена",
      align: "left",
      sortOptions: {
        sortable: true,
        field: "price",
      },
    },
    {
      key: "actions",
      type: "component",
      render: ({ row: room }) => (
        <UpdateRoomCoverCell
          roomID={room.id}
          onSuccess={options?.onSuccessUpdateCover}
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
