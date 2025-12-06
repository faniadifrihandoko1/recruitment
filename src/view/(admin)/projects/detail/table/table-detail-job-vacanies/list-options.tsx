"use client";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { MouseEvent, useState } from "react";

import { VacanciesInterface } from "@/types/vacancies";
import { ModalModules } from "../../modal/modal-modules";

interface JobVacancyOptionsProps {
  row: VacanciesInterface;
}

export function JobVacancyOptions({ row }: JobVacancyOptionsProps) {
  const t = useTranslations("page.project.detail.jobVacancies");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModules, setOpenModules] = useState(false);
  const open = Boolean(anchorEl);

  const toggleModules = () => setOpenModules(!openModules);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          color: "#5A6A85",
          "&:hover": {
            backgroundColor: "#E6FFFA",
            color: "#13DEB9",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <MoreVert fontSize="small" />
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
        {/* View */}
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("View", row);
            handleClose();
          }}
          sx={{
            gap: 1,
            px: 2,
            py: 1.5,
            "&:hover": {
              bgcolor: "#F5F7FA",
              "& .MuiSvgIcon-root": {
                color: "#2196F3",
              },
              "& .MuiTypography-root": {
                color: "#2196F3",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
            }}
          >
            <VisibilityIcon
              sx={{
                fontSize: 18,
                color: "#5A6A85",
                transition: "color 0.2s ease-in-out",
              }}
            />
          </Box>
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
              transition: "color 0.2s ease-in-out",
            }}
          >
            View
          </Typography>
        </MenuItem>

        {/* Module */}
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("Module", row);
            toggleModules();
          }}
          sx={{
            gap: 1,
            px: 2,
            py: 1.5,
            "&:hover": {
              bgcolor: "#F5F7FA",
              "& .MuiSvgIcon-root": {
                color: "#7B2CBF",
              },
              "& .MuiTypography-root": {
                color: "#7B2CBF",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
            }}
          >
            <ViewModuleIcon
              sx={{
                fontSize: 18,
                color: "#5A6A85",
                transition: "color 0.2s ease-in-out",
              }}
            />
          </Box>
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
              transition: "color 0.2s ease-in-out",
            }}
          >
            Module
          </Typography>
        </MenuItem>

        {/* Edit */}
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("Edit", row);
            handleClose();
          }}
          sx={{
            gap: 1,
            px: 2,
            py: 1.5,
            "&:hover": {
              bgcolor: "#F5F7FA",
              "& .MuiSvgIcon-root": {
                color: "#13DEB9",
              },
              "& .MuiTypography-root": {
                color: "#13DEB9",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
            }}
          >
            <EditIcon
              sx={{
                fontSize: 18,
                color: "#5A6A85",
                transition: "color 0.2s ease-in-out",
              }}
            />
          </Box>
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
              transition: "color 0.2s ease-in-out",
            }}
          >
            Edit
          </Typography>
        </MenuItem>

        {/* Delete */}
        <MenuItem
          onClick={event => {
            event.stopPropagation();
            console.log("Delete", row);
            handleClose();
          }}
          sx={{
            gap: 1,
            px: 2,
            py: 1.5,
            "&:hover": {
              bgcolor: "#F5F7FA",
              "& .MuiSvgIcon-root": {
                color: "#F44336",
              },
              "& .MuiTypography-root": {
                color: "#F44336",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
            }}
          >
            <DeleteIcon
              sx={{
                fontSize: 18,
                color: "#5A6A85",
                transition: "color 0.2s ease-in-out",
              }}
            />
          </Box>
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
              transition: "color 0.2s ease-in-out",
            }}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
      {openModules && (
        <ModalModules openModal={openModules} toggle={toggleModules} />
      )}
    </>
  );
}
