"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomTextAreaAutoSize from "@/component/shared/input/custom-text-area-autosize";
import { CustomTextField } from "@/component/shared/input/custom-textfield";
import ModalCustom from "@/component/shared/modal/modal-custom";
import { useCreateProject } from "@/hooks/mutation/project/use-project";
import { Grid } from "@mui/material";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import {
  createProjectSchema,
  ProjectFormSchema,
} from "../../schema/project.schema";

interface AddAssessmentProjectModalProps {
  openModal: boolean;
  toggle: () => void;
}

export const AddAssessmentProjectModal = ({
  openModal,
  toggle,
}: AddAssessmentProjectModalProps) => {
  const t = useTranslations("page.project");
  const tValidation = useTranslations("page.project.validation");
  const { mutateAsync: createProject, isPending } = useCreateProject();
  const form = useForm<ProjectFormSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createProjectSchema(tValidation)),
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: ProjectFormSchema) => {
    try {
      const res = await createProject(data);

      if (res.status && res.code === 200) {
        enqueueSnackbar(t("modal.modal-add.success"), {
          variant: "success",
        });
        toggle();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ?? t("modal.modal-add.error");
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };

  return (
    <ModalCustom
      title={t("modal.modal-add.title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
        loading: isPending,
      }}
    >
      <Grid container spacing={2} sx={{ bgColor: "red" }}>
        <Grid size={12}>
          <CustomTextField
            control={control}
            name="name"
            label={t("form.projectName")}
            required
          />
        </Grid>
        <Grid size={12} sx={{ bgColor: "blue" }}>
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
