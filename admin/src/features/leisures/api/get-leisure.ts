import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromLeisureDto } from "./dto/leisure-dto";
import { Leisure } from "../types/leisure";

export interface GetLeisurePayload {
  leisureID: string;
}

export const getLeisure = (payload: GetLeisurePayload): Promise<Leisure> =>
  fetch(`${API_URL}/api/admin/leisures/${payload.leisureID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromLeisureDto);
