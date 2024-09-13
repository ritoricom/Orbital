import { FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import { DeleteIcon, EditIcon } from "@/ui/icons";

export interface ActionsCellProps {
  disabledEdit?: boolean;
  disabledDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ActionsCell: FC<ActionsCellProps> = ({
  disabledEdit = false,
  disabledDelete = false,
  onEdit,
  onDelete,
}) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <IconButton disabled={disabledEdit} onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton disabled={disabledDelete} onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </Box>
);
