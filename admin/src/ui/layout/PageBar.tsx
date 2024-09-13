import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

export interface PageBarProps {
  children: ReactNode;
}

export const PageBar: FC<PageBarProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      margin: "26px 0 20px",
      gap: "20px",
    }}
  >
    {children}
  </Box>
);
