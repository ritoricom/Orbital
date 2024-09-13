import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

import { noopFn } from "@/utils/noop";
import { isNonNullable } from "@/utils/eq";
import { ConfirmLabels } from "./types";

export interface ConfirmModalProps {
  title: string;
  subtitle?: string;
  labels?: ConfirmLabels;
  onClose: () => void;
  onCancel?: () => Promise<void> | void;
  onConfirm?: () => Promise<void> | void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  title,
  subtitle,
  labels: {
    cancel: cancelLabel = "Отменить",
    confirm: confirmLabel = "Подтвердить",
  } = {},
  onClose,
  onCancel = noopFn,
  onConfirm = noopFn,
}) => {
  const { isLoading: loadingCancel, mutate: cancel } = useMutation({
    mutationFn: onCancel as () => Promise<void>,
    onSettled: () => {
      onClose();
    },
  });
  const { isLoading: loadingConfirm, mutate: confirm } = useMutation({
    mutationFn: onConfirm as () => Promise<void>,
    onSettled: () => {
      onClose();
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleCancel = () => {
    cancel();
  };

  const handleConfirm = () => {
    confirm();
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={true}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          width: "568px",
          borderRadius: "6px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle variant="h5" sx={{ padding: 0 }}>
        {title}
      </DialogTitle>
      {isNonNullable(subtitle) && (
        <DialogContent sx={{ padding: 0 }}>
          <DialogContentText>{subtitle}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions sx={{ marginTop: "25px", padding: 0 }}>
        <LoadingButton
          loading={loadingCancel}
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          {cancelLabel}
        </LoadingButton>
        <LoadingButton
          loading={loadingConfirm}
          variant="contained"
          onClick={handleConfirm}
        >
          {confirmLabel}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
