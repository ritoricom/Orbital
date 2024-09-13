import { API_URL } from "@/config/api";
import { mapFromLeisureDto } from "@/features/leisures";
import { LEISURE_NESTED_SIZE } from "@/features/leisures";
import { mapToWithNested } from "@/lib/api";
import { checkSuccess } from "@/utils/check-success";

const mapToGetLeisureParamsDto = ({ nestedSize }) =>
  new URLSearchParams({
    nestedSize,
  }).toString();

export const getLeisure = ({ leisureID, nestedSize = LEISURE_NESTED_SIZE }) =>
  fetch(
    `${API_URL}/api/leisures/${leisureID}?${mapToGetLeisureParamsDto({
      nestedSize,
    })}`
  )
    .then(checkSuccess)
    .then((res) => res.json())
    .then(mapToWithNested(mapFromLeisureDto));
