import { mapToPaginated } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromReviewDto } from "@/features/reviews";
import { checkSuccess } from "@/utils/check-success";

const mapToGetReviewsParamsDto = ({ city, lang, page, pageSize }) =>
  new URLSearchParams({
    city: city,
    language: lang,
    page: page,
    pageSize: pageSize,
  }).toString();

export const getReviews = ({ city, lang, page, pageSize }) =>
  fetch(
    `${API_URL}/api/reviews?${mapToGetReviewsParamsDto({
      city,
      lang,
      page,
      pageSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromReviewDto));
