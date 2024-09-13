import { FC } from "react";
import Link from "@mui/material/Link";

import { CLIENT_URL } from "@/config/client";
import { SpecialOffer } from "../types/special-offer";

export interface SpecialOfferLinkCellProps {
  specialOffer: SpecialOffer;
}

export const SpecialOfferLinkCell: FC<SpecialOfferLinkCellProps> = ({
  specialOffer,
}) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={`${CLIENT_URL}/spb/special-offers/${specialOffer.id}`}
    sx={{ textOverflow: "ellipsis" }}
  >
    {specialOffer.titles.ru}
  </Link>
);
