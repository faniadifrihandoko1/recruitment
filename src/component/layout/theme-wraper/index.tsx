"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

interface ThemeWrapperProps {
  children: ReactNode;
}

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Hindari rendering sebelum client siap
    return null;
  }

  return <ThemeProvider theme={baselightTheme}>{children}</ThemeProvider>;
};
