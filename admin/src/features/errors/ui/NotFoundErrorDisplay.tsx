import { FC } from "react";
import { ErrorTemplate } from "./ErrorTemplate";

export const NotFoundErrorDisplay: FC = () => (
  <ErrorTemplate
    statusCode={404}
    description="Страница, которую Вы ищете, не может быть найдена"
  />
);
