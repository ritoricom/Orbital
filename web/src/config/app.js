import { genRuntimeConfigValue } from "@/lib/next-config";

export const APP_URL = genRuntimeConfigValue("APP_URL");
export const APP_HOST = new URL(APP_URL).host;
