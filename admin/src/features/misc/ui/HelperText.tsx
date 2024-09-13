import { FC, ReactElement, ReactNode } from "react";
import Box from "@mui/material/Box";

import { ErrorIcon, WarningIcon } from "@/ui/icons";

export type HelperTextVariant = "warning" | "error";

export interface HelperTextProps {
  variant?: HelperTextVariant;
  children: ReactNode;
}

const getIcon = (variant: HelperTextVariant): ReactElement => {
  switch (variant) {
    case "warning":
      return <WarningIcon />;
    case "error":
      return <ErrorIcon />;
  }
};

export const HelperText: FC<HelperTextProps> = ({
  variant = "warning",
  children,
}) => {
  const icon = getIcon(variant);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "16px",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "180%",
        ...(variant === "warning" && {
          color: theme.palette.text.secondary,
        }),
        ...(variant === "error" && {
          color: theme.palette.error.main,
        }),
      })}
    >
      {icon}
      {children}
    </Box>
  );
};
