import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

export interface PageBarInnerProps {
  children: ReactNode;
}

export const PageBarInner: FC<PageBarInnerProps> = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      gap: "20px",
      width: "100%",
    }}
  >
    {children}
  </Box>
);
