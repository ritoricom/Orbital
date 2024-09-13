import { API_URL } from "@/config/api";
import { getBearerAuthHeader, checkSuccess } from "@/lib/api";
import { fromNewsDto } from "./dto/news-dto";
import { News } from "../types/news";

export interface GetNewsArticlePayload {
  newsID: string;
}

export const getNewsArticle = (payload: GetNewsArticlePayload): Promise<News> =>
  fetch(`${API_URL}/api/admin/news/${payload.newsID}`, {
    headers: getBearerAuthHeader(),
  })
    .then(checkSuccess)
    .then((response) => response.json())
    .then(fromNewsDto);
