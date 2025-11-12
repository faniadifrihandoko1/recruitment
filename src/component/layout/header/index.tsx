import {
  Badge,
  Box,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
// components
import {
  IconBellRinging,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMenu,
} from "@tabler/icons-react";
import Profile from "../profile";

interface HeaderProps {
  toggleMobileSidebar?: () => void;
  toggleSidebarCollapse?: () => void;
  isSidebarCollapsed?: boolean;
}

const Header = ({
  toggleMobileSidebar,
  toggleSidebarCollapse,
  isSidebarCollapsed = false,
}: HeaderProps) => {
  const theme = useTheme();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  return (
    <Box
      sx={{
        boxShadow: "none",
        background: theme.palette.background.paper,
        borderBottom: "1px solid #e0e0e0",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
        minHeight: "71px",
        zIndex: theme.zIndex.drawer + 1,
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        // boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          color: theme.palette.text.secondary,
          boxSizing: "border-box",
          // paddingLeft: { xs: 1, sm: 2 },
          // paddingRight: { xs: 1, sm: 2 },
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
        {lgUp && toggleSidebarCollapse && (
          <IconButton
            size="large"
            aria-label="toggle sidebar"
            color="inherit"
            onClick={toggleSidebarCollapse}
            sx={{
              flexShrink: 0,
              ml: 0.5,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {isSidebarCollapsed ? (
              <IconLayoutSidebarLeftExpand size="30" stroke="1.5" />
            ) : (
              <IconLayoutSidebarLeftCollapse size="30" stroke="1.5" />
            )}
          </IconButton>
        )}

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

        {/* Collapse Sidebar Button - Desktop Only */}

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
      </Box>
    </Box>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
