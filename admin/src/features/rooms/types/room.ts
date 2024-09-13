import { City, LangRecord } from "@/features/misc";
import { Image } from "@/features/images";
import { Nullable } from "@/types/utility";

export type Room = {
  id: string;
  titles: LangRecord<string>;
  descriptions: LangRecord<string>;
  peculiarities: LangRecord<string[]>;
  price: number;
  city: City;
  cover: Nullable<Image>;
  images: Image[];
};
