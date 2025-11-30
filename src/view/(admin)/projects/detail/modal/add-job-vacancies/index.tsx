"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalCustom from "@/component/shared/modal/modal-custom";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { FormJobVacancies } from "../../form/form-job-vacancies";
import {
  JobVacancyFormSchema,
  createJobVacancySchema,
} from "../../schema/job-vacancies.schema";

interface AddJobVacanciesModalProps {
  openModal: boolean;
  toggle: () => void;
}

export const AddJobVacanciesModal = ({
  openModal,
  toggle,
}: AddJobVacanciesModalProps) => {
  const t = useTranslations(
    "page.project.detail.jobVacancies.modal.modal-add-job-vacancies"
  );
  const tValidation = useTranslations(
    "page.project.detail.jobVacancies.validation"
  );
  const form = useForm<JobVacancyFormSchema>({
    defaultValues: {
      positionTitle: "",
      jobDescriptions: [],
      jobRequirements: [
        {
          text: "",
          type: null,
        },
      ],
      employeeType: null,
      openings: "",
      location: "",
      minSalary: null,
      maxSalary: null,
      showSalary: false,
      openDate: "",
      closeDate: "",
    },
    resolver: zodResolver(createJobVacancySchema(tValidation)),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  console.log("errors", errors);
  const onSubmit = (data: JobVacancyFormSchema) => {
    console.log(data);
    toggle();
  };

  return (
    <ModalCustom
      title={t("title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
      }}
    >
      <FormJobVacancies form={form} />
    </ModalCustom>
  );
};
