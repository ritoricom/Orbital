import { mapToPaginated } from "@/lib/api";
import { API_URL } from "@/config/api";
import { mapFromLeisureDto } from "@/features/leisures";
import { checkSuccess } from "@/utils/check-success";

const mapToGetLeisureParamsDto = ({ page, pageSize }) =>
  new URLSearchParams({
    page: page,
    pageSize: pageSize,
  }).toString();

export const getLeisures = ({ page, pageSize }) =>
  fetch(
    `${API_URL}/api/leisures?${mapToGetLeisureParamsDto({
      page,
      pageSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToPaginated(mapFromLeisureDto));
