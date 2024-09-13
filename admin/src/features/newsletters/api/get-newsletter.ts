import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromNewsletterDto } from "./dto/newsletter-dto";
import { Newsletter } from "../types/newsletter";

export interface GetNewsletterPayload {
  newsletterID: string;
}

export const getNewsletter = (
  payload: GetNewsletterPayload
): Promise<Newsletter> =>
  fetch(`${API_URL}/api/admin/newsletters/${payload.newsletterID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromNewsletterDto);
