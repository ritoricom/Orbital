import { FC, ReactElement, ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { isNonNullable } from "@/utils/eq";

export interface SidebarLinkProps {
  disabled?: boolean;
  href: string;
  icon: ReactElement;
  children: ReactNode;
}

export const SidebarLink: FC<SidebarLinkProps> = ({
  disabled = false,
  href,
  icon,
  children,
}) => {
  const match = useMatch({
    path: href,
    end: false,
  });

  const isMatch = isNonNullable(match);

  return (
    <Box
      component={Link}
      to={href}
      sx={(theme) => ({
        display: "flex",
        gap: "18px",
        padding: "18px 50px 18px 30px",
        color: theme.palette.text.primary,
        textDecoration: "none",
        borderLeft: "3px solid transparent",
        "&:hover": {
          color: theme.palette.primary.main,
        },
        ...(isMatch && {
          color: theme.palette.primary.main,
          borderLeftColor: "currentColor",
        }),
        ...(disabled && {
          color: theme.palette.text.disabled,
          pointerEvents: "none",
        }),
      })}
    >
      {icon}
      <Typography variant="textBoldL">{children}</Typography>
    </Box>
  );
};
