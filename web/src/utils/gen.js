import { CITIES } from "@/config/cities";
import { LOCALES } from "@/config/locales";

const toArray = (value) => (Array.isArray(value) ? value : [value]);

export const genByLocales = (fn) =>
  LOCALES.reduce((acc, locale) => [...acc, ...toArray(fn(locale))], []);

export const genByLocalesAndCities = (fn) =>
  genByLocales((locale) =>
    CITIES.reduce((acc, city) => [...acc, ...toArray(fn(locale, city))], [])
  );
