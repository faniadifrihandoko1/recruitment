"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomTextAreaAutoSize from "@/component/shared/input/custom-text-area-autosize";
import { CustomTextField } from "@/component/shared/input/custom-textfield";
import ModalCustom from "@/component/shared/modal/modal-custom";
import { useCreateProject } from "@/hooks/mutation/project/use-project";
import { Grid } from "@mui/material";
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
  const form = useForm<ProjectFormSchema>({
    defaultValues: {
      name: "",
      description: "",
    },
    resolver: zodResolver(createProjectSchema(tValidation)),
  });
  const { mutate: createProject, isPending } = useCreateProject({
    onSuccess: res => {
      const statusValue: unknown = res?.status;
      const codeValue: unknown = res?.code;

      const isStatusTrue =
        statusValue === true ||
        String(statusValue).toLowerCase() === "true" ||
        statusValue === 1;
      const isCodeSuccess =
        codeValue === 200 ||
        codeValue === 201 ||
        Number(codeValue) === 200 ||
        Number(codeValue) === 201;

      const isSuccess = isStatusTrue || isCodeSuccess;

      if (isSuccess) {
        enqueueSnackbar(res?.message || t("modal.modal-add.success"), {
          variant: "success",
        });
        toggle();
        // Reset form setelah sukses
        form.reset();
      } else {
        // Handle jika status false atau code bukan 200/201
        enqueueSnackbar(res?.message || t("modal.modal-add.error"), {
          variant: "error",
        });
      }
    },
    onError: error => {
      // Handle error dari server
      const message =
        error.response?.data?.message ?? t("modal.modal-add.error");
      enqueueSnackbar(message, {
        variant: "error",
      });
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: ProjectFormSchema) => {
    createProject(data);
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
