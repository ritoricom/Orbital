import { FC } from "react";

import { ErrorTemplate } from "./ErrorTemplate";

export const InternalServerErrorDisplay: FC = () => (
  <ErrorTemplate statusCode={500} description="Внутренняя ошибка сервера" />
);
