import { FC, useEffect } from "react";
import { removeTokenInStorage } from "@/features/auth";

import { ErrorTemplate } from "./ErrorTemplate";

export const UnauthorizedErrorDisplay: FC = () => {
  useEffect(() => {
    removeTokenInStorage;
  }, []);

  return <ErrorTemplate statusCode={401} description="Требуется авторизация" />;
};
