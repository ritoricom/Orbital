import { LangRecord } from "@/features/misc";
import { Image } from "@/features/images";
import { NewsCity } from "./news-city";

export type News = {
  id: string;
  city: NewsCity;
  titles: LangRecord<string>;
  descriptions: LangRecord<string>;
  publishedAt: Date;
  cover: Image;
  images: Image[];
};
