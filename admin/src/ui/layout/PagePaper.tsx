import { FC, ReactNode } from "react";
import Paper from "@mui/material/Paper";

export interface PagePaperProps {
  hasLimitWidth?: boolean;
  children: ReactNode;
}

export const PagePaper: FC<PagePaperProps> = ({
  hasLimitWidth = false,
  children,
}) => (
  <Paper
    sx={{
      display: "flex",
      flexDirection: "column",
      padding: "24px",
      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.04)",
      borderRadius: "4px",
      width: "100%",
      ...(hasLimitWidth && {
        maxWidth: "1169px",
      }),
    }}
  >
    {children}
  </Paper>
);
