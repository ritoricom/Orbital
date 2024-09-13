import { useContext } from "react";

import { isNonNullable } from "@/utils/eq";
import { AuthenticationContext, AuthenticationContextResult } from "./context";

export const useAuthentication = (): AuthenticationContextResult => {
  const ctx = useContext(AuthenticationContext);
  if (!isNonNullable(ctx)) {
    throw new Error(
      "useAuthentication must be used within AuthenticationContext"
    );
  }

  return ctx;
};
