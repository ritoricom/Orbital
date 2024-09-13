import { FC } from "react";
import Link from "@mui/material/Link";

import { CLIENT_URL } from "@/config/client";
import { Room } from "../types/room";

export interface RoomLinkCellProps {
  room: Room;
}

export const RoomLinkCell: FC<RoomLinkCellProps> = ({ room }) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={`${CLIENT_URL}/${room.city}/rooms/${room.id}`}
  >
    {room.titles.ru}
  </Link>
);
