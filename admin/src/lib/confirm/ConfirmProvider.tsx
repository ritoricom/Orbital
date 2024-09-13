import { FC, ReactNode, useState } from "react";

import { Nullable } from "@/types/utility";
import { ConfirmOptions } from "./types";
import { ConfirmContext } from "./context";
import { ConfirmModal } from "./ConfirmModal";
import { isNonNullable } from "@/utils/eq";

export interface ConfirmProviderProps {
  children: ReactNode;
}

export const ConfirmProvider: FC<ConfirmProviderProps> = ({ children }) => {
  const [confirm, setConfirm] = useState<Nullable<ConfirmOptions>>(null);

  const handleClose = () => {
    setConfirm(null);
  };

  return (
    <ConfirmContext.Provider value={setConfirm}>
      {isNonNullable(confirm) && (
        <ConfirmModal
          title={confirm.title}
          subtitle={confirm.subtitle}
          labels={confirm.labels}
          onClose={handleClose}
          onCancel={confirm.onCancel}
          onConfirm={confirm.onConfirm}
        />
      )}
      {children}
    </ConfirmContext.Provider>
  );
};
