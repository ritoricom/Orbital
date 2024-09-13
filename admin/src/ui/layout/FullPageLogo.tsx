import { FC } from "react";
import Box from "@mui/material/Box";

import { Logo } from "./Logo";

export const FullPageLogo: FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      backgroundColor: "background.default",
    }}
  >
    <Logo />
  </Box>
);
