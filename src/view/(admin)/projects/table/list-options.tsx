"use client";
import ModalDelete from "@/component/shared/modal/modal-delete";
import {
  TableActionItem,
  TableOptionsMenu,
} from "@/component/shared/table/table-options-menu";
import { useDeleteProject } from "@/hooks/mutation/project/use-project";
import { ProjectInterface } from "@/types/project";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";
import { EditAssessmentProjectModal } from "../modal/edit-assessment-project";

interface ListOptionsProps {
  row: ProjectInterface;
}

export function ListOptions({ row }: ListOptionsProps) {
  const t = useTranslations("page.project.modal.modal-delete");
  const { mutateAsync: deleteProject, isPending: isDeleting } =
    useDeleteProject();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleDelete = useCallback(() => {
    setOpenDelete(prev => !prev);
  }, []);

  const toggleEdit = useCallback(() => {
    setOpenEdit(prev => !prev);
  }, []);

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

  const actions: TableActionItem[] = useMemo(
    () => [
      {
        id: "edit",
        label: "Edit",
        icon: <EditIcon />,
        onClick: toggleEdit,
        divider: true,
        hoverColor: "#13DEB9",
      },
      {
        id: "delete",
        label: "Delete",
        icon: <DeleteIcon />,
        onClick: toggleDelete,
        hoverColor: "#FA896B",
      },
    ],
    [toggleDelete, toggleEdit]
  );

  return (
    <>
      <TableOptionsMenu row={row} actions={actions} />
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
