import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Badge,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
// components
import Profile from "../profile";
import { IconBellRinging, IconMenu } from "@tabler/icons-react";

interface HeaderProps {
  toggleMobileSidebar?: () => void;
}

const Header = ({ toggleMobileSidebar }: HeaderProps) => {
  const theme = useTheme();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  const sidebarWidth = "270px";

  return (
    <AppBar
      position="relative"
      color="default"
      sx={{
        boxShadow: "none",
        background: theme.palette.background.paper,
        borderBottom: "1px solid #e0e0e0",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        minHeight: "70px",
        zIndex: theme.zIndex.drawer + 1,
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "100%",
          color: theme.palette.text.secondary,
          boxSizing: "border-box",
          paddingLeft: { xs: 1, sm: 2 },
          paddingRight: { xs: 1, sm: 2 },
          display: "flex",
          alignItems: "center",
          minHeight: "70px",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
            flexShrink: 0,
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            flexShrink: 0,
          }}
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>
        <Box flexGrow={1} sx={{ minWidth: 0 }} />
        <Stack
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <Profile />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
