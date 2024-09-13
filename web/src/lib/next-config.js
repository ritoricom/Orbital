import getConfig from "next/config";

import { isServerSide } from "@/config/environment";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

export const genRuntimeConfigValue = (key) => {
  const runtimeConfig = isServerSide
    ? serverRuntimeConfig
    : publicRuntimeConfig;

  return runtimeConfig[key];
};
