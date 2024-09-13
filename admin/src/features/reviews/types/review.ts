import { City, LangRecord } from "@/features/misc";

export type Review = {
  id: string;
  headers: LangRecord<string>;
  descriptions: LangRecord<string>;
  authors: LangRecord<string>;
  grade: number;
  city: City;
  publishedAt: Date;
};
