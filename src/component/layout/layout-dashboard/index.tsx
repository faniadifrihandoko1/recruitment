"use client";
import { Container, Box, useMediaQuery } from "@mui/material";
import React from "react";
import Header from "@/component/layout/header";
import Sidebar from "@/component/layout/sidebar/Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function LayoutDashboard({ children }: Props) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = React.useState(false);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const sidebarWidth = "270px";

  const toggleMobileSidebar = React.useCallback(() => {
    setIsMobileSidebarOpen((prev) => !prev);
  }, []);

  const handleSidebarClose = React.useCallback(() => {
    setIsMobileSidebarOpen(false);
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
      {/* <Sidebar
        isSidebarOpen={true}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={handleSidebarClose}
      /> */}

      {/* Main Content Area */}
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#FAFAFB",
          minHeight: "100vh",
        }}
      >
        {/* Fixed Header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: { xs: 0, lg: sidebarWidth },
            right: 0,
            zIndex: 1200,
            width: { xs: "100%", lg: `calc(100% - ${sidebarWidth})` },
          }}
        >
          <Header toggleMobileSidebar={toggleMobileSidebar} />
        </Box>

        {/* Page Content */}
        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "1200px",
              xl: "1400px",
            },
            px: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            paddingTop: "90px",
            paddingBottom: "20px",
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
