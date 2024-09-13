import { FC } from "react";
import Link from "@mui/material/Link";

import { CLIENT_URL } from "@/config/client";
import { City } from "@/features/misc";
import { NewsCity } from "../types/news-city";
import { News } from "../types/news";

export interface NewsLinkCellProps {
  news: News;
}

const getCity = (newsCity: NewsCity): City => {
  switch (newsCity) {
    case "all":
      return "spb";
    default:
      return newsCity;
  }
};

export const NewsLinkCell: FC<NewsLinkCellProps> = ({ news }) => {
  const city = getCity(news.city);

  return (
    <Link
      target="_blank"
      rel="noreferrer"
      href={`${CLIENT_URL}/${city}/news/${news.id}`}
      sx={{ textOverflow: "ellipsis" }}
    >
      {news.titles.ru}
    </Link>
  );
};
