import { FC } from "react";
import Button from "@mui/material/Button";

import { AddIcon } from "@/ui/icons";

export interface AddButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const AddButton: FC<AddButtonProps> = ({
  disabled = false,
  onClick,
}) => (
  <Button
    fullWidth
    disabled={disabled}
    variant="contained"
    size="medium"
    endIcon={<AddIcon />}
    sx={{
      maxWidth: "154px",
    }}
    onClick={onClick}
  >
    добавить
  </Button>
);
