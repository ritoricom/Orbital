import { LangRecord } from "../types/lang-record";

export const mapLangRecord =
  <T, R>(mapFn: (value: T) => R) =>
  (langRecord: LangRecord<T>): LangRecord<R> => ({
    ru: mapFn(langRecord.ru),
    en: mapFn(langRecord.en),
  });
