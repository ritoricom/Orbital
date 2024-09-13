import { FC } from "react";
import Link from "@mui/material/Link";

import { CLIENT_URL } from "@/config/client";
import { Leisure } from "../types/leisure";

export interface LeisureLinkCellProps {
  leisure: Leisure;
}

export const LeisureLinkCell: FC<LeisureLinkCellProps> = ({ leisure }) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={`${CLIENT_URL}/obn/leisures/${leisure.id}`}
    sx={{ textOverflow: "ellipsis" }}
  >
    {leisure.title}
  </Link>
);
