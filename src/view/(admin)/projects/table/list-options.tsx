"use client";
import ModalDelete from "@/component/shared/modal/modal-delete";
import { useDeleteProject } from "@/hooks/mutation/project/use-project";
import { ProjectInterface } from "@/types/project";
import { MoreVert } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { MouseEvent, useState } from "react";
import { EditAssessmentProjectModal } from "../modal/edit-assessment-project";

interface ListOptionsProps {
  row: ProjectInterface;
}

export function ListOptions({ row }: ListOptionsProps) {
  const t = useTranslations("page.project.modal.modal-delete");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mutateAsync: deleteProject, isPending: isDeleting } =
    useDeleteProject();
  const open = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleDelete = () => {
    setOpenDelete(!openDelete);
  };

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

  const handleDeleteClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClose();
    toggleDelete();
  };

  const handleDelete = async () => {
    try {
      const res = await deleteProject(row.id);
      if (res.status && res.code === 200) {
        enqueueSnackbar(t("success"), {
          variant: "success",
        });
        toggleDelete();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t("error"), {
        variant: "error",
      });
    }
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
            borderRadius: "8px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            border: "1px solid #E5EAEF",
            minWidth: "140px",
            mt: 0.5,
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
        <MenuItem
          divider
          onClick={handleEditClick}
          sx={{
            gap: 1.5,
            px: 2,
            py: 1.25,
            "&:hover": {
              bgcolor: "#E6FFFA",
              "& .MuiSvgIcon-root": {
                color: "#13DEB9",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <EditIcon
            sx={{
              fontSize: 18,
              color: "#5A6A85",
            }}
          />
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
            }}
          >
            {"Edit"}
          </Typography>
        </MenuItem>

        <MenuItem
          onClick={handleDeleteClick}
          sx={{
            gap: 1.5,
            px: 2,
            py: 1.25,
            "&:hover": {
              bgcolor: "#FDEDE8",
              "& .MuiSvgIcon-root": {
                color: "#FA896B",
              },
              "& .MuiTypography-root": {
                color: "#FA896B",
              },
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <DeleteIcon
            sx={{
              fontSize: 18,
              color: "#5A6A85",
            }}
          />
          <Typography
            fontSize={14}
            sx={{
              color: "#2A3547",
              fontWeight: 500,
            }}
          >
            {"Delete"}
          </Typography>
        </MenuItem>
      </Menu>
      {openEdit && (
        <EditAssessmentProjectModal
          openModal={openEdit}
          toggle={toggleEdit}
          data={row}
        />
      )}
      {openDelete && (
        <ModalDelete
          maxWidth="xs"
          name={row.name}
          open={openDelete}
          toggle={toggleDelete}
          handleDelete={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
}
