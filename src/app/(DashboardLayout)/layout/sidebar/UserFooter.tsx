"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  IconBadge,
  IconBadges,
  IconChevronDown,
  IconChevronsDown,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

const UserFooter = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

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
          {/* <IconButton size="small" onClick={handleOpen} aria-label="user menu">
          <IconChevronDown size={18} />
        </IconButton> */}
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
