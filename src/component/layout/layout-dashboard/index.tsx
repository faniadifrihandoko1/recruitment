"use client";
import Header from "@/component/layout/header";
import Sidebar from "@/component/layout/sidebar/Sidebar";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function LayoutDashboard({ children }: Props) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const sidebarWidth = "270px";
  const sidebarCollapsedWidth = "80px";

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen(prev => !prev);
  }, []);

  const handleSidebarClose = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, []);

  const toggleSidebarCollapse = React.useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={true}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={handleSidebarClose}
        isCollapsed={isSidebarCollapsed}
      />

      {/* Main Content Area */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          //   backgroundColor: "#FAFAFB",
          minHeight: "100vh",
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: {
              xs: 0,
              lg: isSidebarCollapsed ? sidebarCollapsedWidth : sidebarWidth,
            },
            right: 0,
            zIndex: 1200,
            width: {
              xs: "100%",
              lg: isSidebarCollapsed
                ? `calc(100% - ${sidebarCollapsedWidth})`
                : `calc(100% - ${sidebarWidth})`,
            },
            transition: "left 0.3s ease, width 0.3s ease",
          }}
        >
          <Header
            toggleMobileSidebar={toggleMobileSidebar}
            toggleSidebarCollapse={toggleSidebarCollapse}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        </Box>

        {/* Page Content */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            mx: "auto",
            boxSizing: "border-box",
            height: "auto",
            px: 3,
            paddingTop: "90px",
            paddingBottom: "20px",
            bgcolor: "#F1F5F9",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
