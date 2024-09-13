import { FC, ReactNode } from "react";
import Box from "@mui/material/Box";

import { Header, Sidebar, SIDEBAR_WIDTH } from "@/ui/layout";

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          display: "flex",
          marginLeft: SIDEBAR_WIDTH,
          padding: "30px",
          width: `calc(100% - ${SIDEBAR_WIDTH})`,
        }}
      >
        {children}
      </Box>
    </Box>
  </>
);
