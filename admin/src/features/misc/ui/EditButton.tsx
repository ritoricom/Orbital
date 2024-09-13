import { FC } from "react";
import Button from "@mui/material/Button";

import { EditIcon } from "@/ui/icons";

export interface EditButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const EditButton: FC<EditButtonProps> = ({
  disabled = false,
  onClick,
}) => (
  <Button
    fullWidth
    disabled={disabled}
    variant="contained"
    size="medium"
    endIcon={<EditIcon />}
    sx={{
      maxWidth: "198px",
    }}
    onClick={onClick}
  >
    редактировать
  </Button>
);
