import { mapToPaginated } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromNewsDto } from "@/features/news";
import { checkSuccess } from "@/utils/check-success";

const mapToGetNewsParamsDto = ({ city, lang, page, pageSize }) =>
  new URLSearchParams({
    city: city,
    language: lang,
    page: page,
    pageSize: pageSize,
  }).toString();

export const getNews = ({ city, lang, page, pageSize }) =>
  fetch(
    `${API_URL}/api/news?${mapToGetNewsParamsDto({
      city,
      lang,
      page,
      pageSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromNewsDto));
