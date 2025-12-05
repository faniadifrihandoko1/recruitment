"use client";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";

import { VacanciesInterface } from "@/types/vacancies";
import { ModalModules } from "../../modal/modal-modules";

interface JobVacancyOptionsProps {
  row: VacanciesInterface;
}

export function JobVacancyOptions({ row }: JobVacancyOptionsProps) {
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
      <IconButton onClick={handleClick} size="small">
        <MoreVert fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("View", row);
            handleClose();
          }}
          sx={{
            gap: 1.5,
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <VisibilityIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>View</Typography>
        </MenuItem>
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("Module", row);
            toggleModules();
          }}
          sx={{ gap: 1.5, px: 2, py: 1, "&:hover": { bgcolor: "grey.100" } }}
        >
          <ViewModuleIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>{"Module"}</Typography>
        </MenuItem>
        <MenuItem
          divider
          onClick={event => {
            event.stopPropagation();
            console.log("Edit", row);
            handleClose();
          }}
          sx={{
            gap: 1.5,
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <EditIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>Edit</Typography>
        </MenuItem>
        <MenuItem
          onClick={event => {
            event.stopPropagation();
            console.log("Delete", row);
            handleClose();
          }}
          sx={{ gap: 1.5, px: 2, py: 1, "&:hover": { bgcolor: "grey.100" } }}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>Delete</Typography>
        </MenuItem>
      </Menu>
      {openModules && (
        <ModalModules openModal={openModules} toggle={toggleModules} />
      )}
    </>
  );
}
