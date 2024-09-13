import { Lang } from "@/features/misc";

export type LangDto = Lang;

export const fromLangDto = (dto: LangDto): Lang => dto;

export const toLangDto = (lang: Lang): LangDto => lang;
