"use client";
import { removeSession } from "@/lib/session";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { IconChevronsDown, IconLogout, IconUser } from "@tabler/icons-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserFooterProps {
  isCollapsed?: boolean;
}

const UserFooter = ({ isCollapsed = false }: UserFooterProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const locale = useLocale();
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleClose();
    removeSession();
    router.push(`/${locale}/authentication/login`);
  };

  if (isCollapsed) {
    return (
      <>
        <Tooltip title="amanda fitri" placement="right" arrow>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 2,
              py: 1,
              borderRadius: "8px",
              ":hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <IconButton
              size="medium"
              onClick={handleOpen}
              aria-label="user menu"
              sx={{
                width: "48px",
                height: "48px",
              }}
            >
              <Avatar
                src="/images/profile/user-1.jpg"
                alt="user"
                variant="rounded"
                sx={{ width: 36, height: 36, borderRadius: "10px" }}
              />
            </IconButton>
          </Box>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem component={Link} href="#" onClick={handleClose}>
            <ListItemIcon>
              <IconUser size={18} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <Box px={1} pb={1}>
            <Button
              color="primary"
              onClick={handleLogout}
              variant="outlined"
              aria-label="logout"
              size="small"
              startIcon={<IconLogout size={14} stroke={1.5} color="black" />}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </>
    );
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
        sx={{
          mt: 3,
          py: 1,
          px: 1,
          borderRadius: "8px",
          ":hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            src="/images/profile/user-1.jpg"
            alt="user"
            variant="rounded"
            sx={{ width: 32, height: 32, borderRadius: "10px" }}
          />
          <Box flex={1}>
            <Typography variant="h6" fontSize="14px" lineHeight={1.2}>
              amanda fitri
            </Typography>
            <Typography variant="body2" fontSize="12px" color="text.secondary">
              amandafitri878@gmail.com
            </Typography>
          </Box>
        </Box>
        <IconButton size="small" onClick={handleOpen} aria-label="user menu">
          <IconChevronsDown size={18} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} href="#" onClick={handleClose}>
          <ListItemIcon>
            <IconUser size={18} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <Box px={1} pb={1}>
          <Button
            color="primary"
            component={Link}
            href="/authentication/login"
            variant="outlined"
            aria-label="logout"
            size="small"
            startIcon={<IconLogout size={14} stroke={1.5} color="black" />}
            fullWidth
          >
            Logout
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default UserFooter;
