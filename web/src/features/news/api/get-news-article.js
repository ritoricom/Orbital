import { mapToWithNested } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromNewsDto, NEWS_NESTED_SIZE } from "@/features/news";
import { checkSuccess } from "@/utils/check-success";

const mapToGetNewsArticleParamsDto = ({ nestedSize, lang, city }) =>
  new URLSearchParams({
    nestedSize,
    language: lang,
    city,
  }).toString();
export const getNewsArticle = ({
  newsID,
  nestedSize = NEWS_NESTED_SIZE,
  lang,
  city,
}) =>
  fetch(
    `${API_URL}/api/news/${newsID}?${mapToGetNewsArticleParamsDto({
      nestedSize,
      lang,
      city,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToWithNested(mapFromNewsDto));
