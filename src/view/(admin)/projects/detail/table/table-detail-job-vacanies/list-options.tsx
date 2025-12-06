"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import VisibilityIcon from "@mui/icons-material/Visibility";

import ModalDelete from "@/component/shared/modal/modal-delete";
import {
  TableActionItem,
  TableOptionsMenu,
} from "@/component/shared/table/table-options-menu";
import { useDeleteVacancies } from "@/hooks/mutation/vacancies/use-vacancies";
import { VacanciesInterface } from "@/types/vacancies";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useCallback, useMemo, useState } from "react";
import { ModalModules } from "../../modal/modal-modules";

interface JobVacancyOptionsProps {
  row: VacanciesInterface;
}

export function JobVacancyOptions({ row }: JobVacancyOptionsProps) {
  const t = useTranslations("page.project.modal.modal-delete");
  const { mutateAsync: deleteVacancies, isPending: isDeleting } =
    useDeleteVacancies();
  const [openModules, setOpenModules] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const toggleModules = useCallback(() => {
    setOpenModules(prev => !prev);
  }, []);

  const toggleDelete = useCallback(() => {
    setOpenDelete(prev => !prev);
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteVacancies({ id: row.id });
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
        id: "view",
        label: "View",
        icon: <VisibilityIcon />,
        onClick: () => {
          console.log("View", row);
        },
        divider: true,
        hoverColor: "#2196F3",
      },
      {
        id: "module",
        label: "Module",
        icon: <ViewModuleIcon />,
        onClick: toggleModules,
        divider: true,
        hoverColor: "#7B2CBF",
      },
      {
        id: "edit",
        label: "Edit",
        icon: <EditIcon />,
        onClick: () => {
          console.log("Edit", row);
        },
        divider: true,
        hoverColor: "#13DEB9",
      },
      {
        id: "delete",
        label: "Delete",
        icon: <DeleteIcon />,
        onClick: toggleDelete,
        hoverColor: "#F44336",
      },
    ],
    [row, toggleDelete, toggleModules]
  );

  return (
    <>
      <TableOptionsMenu row={row} actions={actions} />
      {openModules && (
        <ModalModules openModal={openModules} toggle={toggleModules} />
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
