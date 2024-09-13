import { FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { DeleteIcon, EditIcon, LockIcon } from "@/ui/icons";

export interface UserActionsCellProps {
  disabledChangePassword?: boolean;
  disabledEdit?: boolean;
  disabledDelete?: boolean;
  onChangePassword?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const UserActionsCell: FC<UserActionsCellProps> = ({
  disabledChangePassword = false,
  disabledEdit = false,
  disabledDelete = false,
  onChangePassword,
  onEdit,
  onDelete,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <IconButton disabled={disabledChangePassword} onClick={onChangePassword}>
      <LockIcon />
    </IconButton>
    <IconButton disabled={disabledEdit} onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton disabled={disabledDelete} onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </Box>
);
