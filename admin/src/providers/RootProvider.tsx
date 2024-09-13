import { FC, ReactNode, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";

import { AuthenticationProvider } from "@/lib/authentication";
import { ConfirmProvider } from "@/lib/confirm";
import { NotifyContainer } from "@/lib/notify";
import { ErrorBoundary } from "@/lib/error-boundary";
import { queryClient } from "@/lib/react-query";
import { theme } from "@/theme";
import { FullPageLogo, FullPageSpinner } from "@/ui/layout";

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <NotifyContainer />
    <Suspense fallback={<FullPageSpinner />}>
      <Router>
        <ErrorBoundary>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HelmetProvider>
              <QueryClientProvider client={queryClient}>
                <ConfirmProvider>
                  <AuthenticationProvider fallback={<FullPageLogo />}>
                    <YMaps>{children}</YMaps>
                  </AuthenticationProvider>
                </ConfirmProvider>
              </QueryClientProvider>
            </HelmetProvider>
          </LocalizationProvider>
        </ErrorBoundary>
      </Router>
    </Suspense>
  </ThemeProvider>
);
