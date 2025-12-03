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
import { ProjectInterface } from "../../type";

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
  const form = useForm<ProjectFormSchema>({
    defaultValues: {
      project_name: data.projectName,
      project_description: data.projectDescription,
    },
    resolver: zodResolver(createProjectSchema(tValidation)),
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: ProjectFormSchema) => {
    console.log(data);
  };

  return (
    <ModalCustom
      title={t("modal.modal-edit.title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <CustomTextField
            control={control}
            name="project_name"
            label={t("form.projectName")}
            required
          />
        </Grid>
        <Grid size={12}>
          <CustomTextAreaAutoSize
            control={control}
            name="project_description"
            label={t("form.projectDescription")}
            required
          />
        </Grid>
      </Grid>
    </ModalCustom>
  );
};
