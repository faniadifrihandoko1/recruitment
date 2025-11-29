"use client";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { EditAssessmentProjectModal } from "../modal/edit-assessment-project";
import { ProjectInterface } from "../type";

interface ListOptionsProps {
  row: ProjectInterface;
}

export function ListOptions({ row }: ListOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);

  const toggleEdit = () => {
    setOpenEdit(!openEdit);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClose();
    toggleEdit();
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
          onClick={handleEditClick}
          sx={{
            gap: 1.5,
            px: 2,
            py: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <EditIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>{"Edit"}</Typography>
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
          <Typography fontSize={14}>{"Delete"}</Typography>
        </MenuItem>
      </Menu>
      {openEdit && (
        <EditAssessmentProjectModal
          openModal={openEdit}
          toggle={toggleEdit}
          data={row}
        />
      )}
    </>
  );
}
