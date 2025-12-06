"use client";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { MouseEvent, ReactNode, useState } from "react";

export interface TableActionItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: (row: any, event?: MouseEvent<HTMLElement>) => void;
  divider?: boolean;
  hoverColor?: string;
  customContent?: ReactNode;
}

interface TableOptionsMenuProps<T = any> {
  row: T;
  actions: TableActionItem[];
  customModals?: ReactNode;
}

export function TableOptionsMenu<T = any>({
  row,
  actions,
  customModals,
}: TableOptionsMenuProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (
    action: TableActionItem,
    event: MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    action.onClick(row, event);
    // Menu akan ditutup otomatis setelah onClick dipanggil
    // User bisa menutup manual di dalam onClick handler jika diperlukan
    handleClose();
  };

  const menuItemSx: SxProps<Theme> = {
    gap: 1,
    px: 2,
    py: 1.5,
    transition: "all 0.2s ease-in-out",
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: "#5A6A85",
          width: 32,
          height: 32,
          padding: 0,
          "&:hover": {
            backgroundColor: "#E6FFFA",
            color: "#13DEB9",
          },
          "& .MuiSvgIcon-root": {
            fontSize: 18,
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            border: "1px solid #E5EAEF",
            mt: 0.5,
            overflow: "hidden",
          },
        }}
        MenuListProps={{
          sx: {
            py: 0,
            "& .MuiMenuItem-root": {
              whiteSpace: "nowrap",
            },
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {actions.map((action, index) => {
          const isLast = index === actions.length - 1;
          const hoverColor = action.hoverColor || "#13DEB9";

          return (
            <MenuItem
              key={action.id}
              divider={action.divider !== false && !isLast}
              onClick={event => handleActionClick(action, event)}
              sx={{
                ...menuItemSx,
                "&:hover": {
                  bgcolor: "#F5F7FA",
                  "& .MuiSvgIcon-root": {
                    color: hoverColor,
                  },
                  "& .MuiTypography-root": {
                    color: hoverColor,
                  },
                },
              }}
            >
              {action.customContent ? (
                action.customContent
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                    }}
                  >
                    {typeof action.icon === "string" ? (
                      <Typography
                        sx={{
                          fontSize: 18,
                          color: "#5A6A85",
                          transition: "color 0.2s ease-in-out",
                        }}
                      >
                        {action.icon}
                      </Typography>
                    ) : (
                      <Box
                        sx={{
                          fontSize: 18,
                          color: "#5A6A85",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.2s ease-in-out",
                          "& svg": {
                            fontSize: 18,
                          },
                        }}
                      >
                        {action.icon}
                      </Box>
                    )}
                  </Box>
                  <Typography
                    fontSize={14}
                    sx={{
                      color: "#2A3547",
                      fontWeight: 500,
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {action.label}
                  </Typography>
                </>
              )}
            </MenuItem>
          );
        })}
      </Menu>
      {customModals}
    </>
  );
}
