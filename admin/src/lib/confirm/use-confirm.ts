import { useContext } from "react";

import { isNonNullable } from "@/utils/eq";
import { ConfirmContext, ConfirmFn } from "./context";

export const useConfirm = (): ConfirmFn => {
  const ctx = useContext(ConfirmContext);
  if (!isNonNullable(ctx)) {
    throw new Error("useConfirm must be used within ConfirmContext");
  }

  return ctx;
};
