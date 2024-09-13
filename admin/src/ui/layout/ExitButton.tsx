import { FC } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { useAuthentication } from "@/lib/authentication";
import { ExitIcon } from "@/ui/icons";

export const ExitButton: FC = () => {
  const { logout } = useAuthentication();

  const handleClick = () => {
    logout();
  };

  return (
    <Button
      variant="text"
      sx={{
        padding: 0,
        color: "text.primary",
        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.main",
        },
      }}
      onClick={handleClick}
      endIcon={<ExitIcon />}
    >
      <Box
        component="span"
        sx={(theme) => ({
          ...theme.typography.textUpM,
          borderBottom: "1px solid currentColor",
        })}
      >
        выйти
      </Box>
    </Button>
  );
};
