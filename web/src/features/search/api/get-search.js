import { API_URL } from "@/config/api";
import { checkSuccess } from "@/utils/check-success";
import { mapFromSearchDto } from "@/features/search";

const mapToGetSearchParamsDto = ({ query, lang }) =>
  new URLSearchParams({
    search: query,
    language: lang,
  }).toString();

export const getSearch = ({ search, lang }) =>
  search &&
  fetch(
    `${API_URL}/api/search?${mapToGetSearchParamsDto({
      query: search,
      lang,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapFromSearchDto);
