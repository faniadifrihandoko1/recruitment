"use client";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
  isCollapsed?: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isCollapsed = false,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const sidebarWidth = "270px";
  const sidebarCollapsedWidth = "80px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  if (lgUp) {
    const currentWidth = isCollapsed ? sidebarCollapsedWidth : sidebarWidth;

    return (
      <Box
        sx={{
          width: currentWidth,
          flexShrink: 0,
          transition: "width 0.3s ease",
          bgcolor: "red",
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                boxSizing: "border-box",
                ...scrollbarStyles,
                width: currentWidth,
                transition: "width 0.3s ease",
                overflowX: "hidden",
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems isCollapsed={isCollapsed} />
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        paper: {
          sx: {
            boxShadow: theme => theme.shadows[8],
            ...scrollbarStyles,
            width: sidebarWidth,
          },
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box
        sx={{
          width: sidebarWidth,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar Items */}
        {/* ------------------------------------------- */}
        <SidebarItems isCollapsed={false} />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
    </Drawer>
  );
};

export default MSidebar;
