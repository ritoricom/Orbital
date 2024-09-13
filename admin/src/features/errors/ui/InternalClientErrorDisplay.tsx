import { FC } from "react";

import { ErrorTemplate } from "./ErrorTemplate";

export const InternalClientErrorDisplay: FC = () => (
  <ErrorTemplate description="Произошла внутренняя ошибка клиента" />
);
