import { FC } from "react";

import { ErrorTemplate } from "./ErrorTemplate";

export const ForbiddenErrorDisplay: FC = () => (
  <ErrorTemplate statusCode={403} description="Доступ запрещен" />
);
