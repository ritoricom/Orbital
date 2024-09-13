import { LangRecord } from "@/features/misc";
import { Image } from "@/features/images";
import { Nullable } from "@/types/utility";

export type SpecialOffer = {
  id: string;
  titles: LangRecord<string>;
  shortDescriptions: LangRecord<string>;
  descriptions: LangRecord<string>;
  notes: LangRecord<Nullable<string>>;
  primaryPhone: Nullable<string>;
  secondaryPhone: Nullable<string>;
  cover: Image;
  images: Image[];
};
