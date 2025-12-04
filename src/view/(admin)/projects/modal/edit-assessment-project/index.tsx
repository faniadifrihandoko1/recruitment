"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomTextAreaAutoSize from "@/component/shared/input/custom-text-area-autosize";
import { CustomTextField } from "@/component/shared/input/custom-textfield";
import ModalCustom from "@/component/shared/modal/modal-custom";
import { useUpdateProject } from "@/hooks/mutation/project/use-project";
import { ProjectInterface } from "@/types/project";
import { Grid } from "@mui/material";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  createProjectSchema,
  ProjectFormSchema,
} from "../../schema/project.schema";

interface EditAssessmentProjectModalProps {
  openModal: boolean;
  toggle: () => void;
  data: ProjectInterface;
}

export const EditAssessmentProjectModal = ({
  openModal,
  toggle,
  data,
}: EditAssessmentProjectModalProps) => {
  const t = useTranslations("page.project");
  const tValidation = useTranslations("page.project.validation");
  const { mutateAsync: updateProject, isPending } = useUpdateProject();
  const form = useForm<ProjectFormSchema>({
    defaultValues: {
      name: data.name,
      description: data.description,
    },
    resolver: zodResolver(createProjectSchema(tValidation)),
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (datas: ProjectFormSchema) => {
    const payload = {
      id: data.id,
      name: datas.name,
      description: datas.description,
    };

    try {
      const res = await updateProject(payload);

      console.log("res", res);

      if (res.status && res.code === 200) {
        enqueueSnackbar(t("modal.modal-edit.success"), {
          variant: "success",
        });
        toggle();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ?? t("modal.modal-edit.error");
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };

  return (
    <ModalCustom
      title={t("modal.modal-edit.title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
        loading: isPending,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomTextField
            control={control}
            name="name"
            label={t("form.projectName")}
            required
          />
        </Grid>
        <Grid size={12}>
          <CustomTextAreaAutoSize
            control={control}
            name="description"
            label={t("form.projectDescription")}
            required
          />
        </Grid>
      </Grid>
    </ModalCustom>
  );
};
