import { Nullable } from "@/types/utility";
import { Image } from "@/features/images";
import { LeisureDay } from "./leisure-day";

export type Leisure = {
  id: string;
  title: string;
  description: string;
  note: Nullable<string>;
  route: Nullable<string>;
  phone: Nullable<string>;
  email: Nullable<string>;
  days: LeisureDay[];
  cover: Image;
  images: Image[];
  createdAt: Date;
};
