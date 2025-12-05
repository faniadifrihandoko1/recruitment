"use client";
import ModalUnauthorized from "@/component/shared/modal/modal-unauthorized";
import { UnauthorizedModalProvider } from "@/context/unauthorized-modal-context";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ReactNode, useEffect, useState } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000 * 5,

      refetchOnWindowFocus: false, // Prevent refetch when window regains focus
      refetchOnReconnect: true, // Still refetch when reconnecting to network
    },
  },
});

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Hindari rendering sebelum client siap
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={baselightTheme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <UnauthorizedModalProvider>
            {children}
            <ModalUnauthorized />
          </UnauthorizedModalProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
