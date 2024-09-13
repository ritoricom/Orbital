import { City, LangRecord } from "@/features/misc";
import { Location } from "./location";

export type Contacts = {
  addresses: LangRecord<string>;
  city: City;
  email: string;
  phone: string;
  location: Location;
  vkLink: string;
};
