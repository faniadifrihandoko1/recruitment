"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomTextAreaAutoSize from "@/component/shared/input/custom-text-area-autosize";
import { CustomTextField } from "@/component/shared/input/custom-textfield";
import ModalCustom from "@/component/shared/modal/modal-custom";
import { Grid } from "@mui/material";
import { useTranslations } from "next-intl";
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
      projectName: "",
      projectDescription: "",
    },
    resolver: zodResolver(createProjectSchema(tValidation)),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: ProjectFormSchema) => {
    console.log(data);
  };

  return (
    <ModalCustom
      title={t("modal.modal-add.title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
      }}
    >
      <Grid container spacing={2} sx={{ bgColor: "red" }}>
        <Grid size={12}>
          <CustomTextField
            control={control}
            name="projectName"
            label={t("form.projectName")}
            required
          />
        </Grid>
        <Grid size={12} sx={{ bgColor: "blue" }}>
          <CustomTextAreaAutoSize
            control={control}
            name="projectDescription"
            label={t("form.projectDescription")}
            required
          />
        </Grid>
      </Grid>
    </ModalCustom>
  );
};
