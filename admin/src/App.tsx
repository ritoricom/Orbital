import { FC } from "react";

import { RootProvider } from "@/providers";
import { Routes } from "@/routes";

export const App: FC = () => (
  <RootProvider>
    <Routes />
  </RootProvider>
);
