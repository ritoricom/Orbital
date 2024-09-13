import { LangDto, LangRecord } from "@/features/misc";

export type LangRecordDto<T> = Record<LangDto, T>;

export const fromLangRecordDto = <T>(dto: LangRecordDto<T>): LangRecord<T> =>
  dto;

export const toLangRecordDto = <T>(
  langRecord: LangRecord<T>
): LangRecordDto<T> => langRecord;
