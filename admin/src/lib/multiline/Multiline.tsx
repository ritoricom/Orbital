import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

export interface MultilineProps {
  children: ReactNode;
}

export const Multiline: FC<MultilineProps> = ({ children }) => (
  <Box sx={{ whiteSpace: "pre-line" }}>{children}</Box>
);
