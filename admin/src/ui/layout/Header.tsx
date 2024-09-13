import { FC } from "react";
import Box from "@mui/material/Box";

import {
  Logo,
  SidebarContainer,
  UserDisplay,
  ExitButton,
  SIDEBAR_WIDTH,
} from "@/ui/layout";

export const HEADER_HEIGHT = "80px";

export const Header: FC = () => (
  <Box
    component="header"
    sx={{
      position: "sticky",
      top: 0,
      display: "flex",
      alignItems: "center",
      height: HEADER_HEIGHT,
      backgroundColor: "common.white",
      boxShadow: "0px 2px 16px rgba(67, 63, 55, 0.08)",
      zIndex: 2,
    }}
  >
    <SidebarContainer
      sx={{
        padding: "0 30px",
      }}
    >
      <Logo />
    </SidebarContainer>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        padding: "0 32px 0 26px",
      }}
    >
      <UserDisplay />
      <ExitButton />
    </Box>
  </Box>
);
