import React from "react";
import LayoutDashboard from "@/component/layout/layout-dashboard";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <LayoutDashboard>{children}</LayoutDashboard>;
}
