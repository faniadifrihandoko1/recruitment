"use client";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import { JobRequest } from "./list";

interface ListOptionsProps {
  row: JobRequest;
}

export function ListOptions({ row }: ListOptionsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  console.log(row);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
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
          onClick={() => {
            console.log("Edit");
          }}
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
          //   onClick={handleOpenDelete}
          sx={{ gap: 1.5, px: 2, py: 1, "&:hover": { bgcolor: "grey.100" } }}
        >
          <DeleteIcon sx={{ fontSize: 16 }} />
          <Typography fontSize={14}>{"Delete"}</Typography>
        </MenuItem>
      </Menu>

      {/* {openDelete && (
        <ModalDelete
          maxWidth="xs"
          name={data.name}
          open={openDelete}
          toggle={handleOpenDelete}
          handleDelete={handleDelete}
        />
      )} */}

      {/* {openEdit && (
        <ModalEditCustomAPI open={openEdit} toggle={handleEdit} id={data.id} />
      )} */}
    </>
  );
}
