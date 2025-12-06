"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalCustom from "@/component/shared/modal/modal-custom";
import { useCreateVacancies } from "@/hooks/mutation/vacancies/use-vacancies";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FormJobVacancies } from "../../form/form-job-vacancies";
import {
  JobVacancyFormSchema,
  createJobVacancySchema,
} from "../../schema/job-vacancies.schema";

interface AddJobVacanciesModalProps {
  openModal: boolean;
  toggle: () => void;
  projectId: number;
}

export const AddJobVacanciesModal = ({
  openModal,
  toggle,
  projectId,
}: AddJobVacanciesModalProps) => {
  const t = useTranslations(
    "page.project.detail.jobVacancies.modal.modal-add-job-vacancies"
  );
  const tValidation = useTranslations(
    "page.project.detail.jobVacancies.validation"
  );
  const form = useForm<JobVacancyFormSchema>({
    defaultValues: {
      project_id: projectId,
      name: "",
      description: "",
      job_description: [],
      job_requirement: [],
      type: null,
      status: null,
      openings: "0",
      location: "",
      min_salary: "0",
      max_salary: "0",
      showSalary: false,
      open_date: "",
      close_date: "",
    },
    resolver: zodResolver(createJobVacancySchema(tValidation)),
  });

  const { mutate: createVacancies, isPending } = useCreateVacancies({
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
        enqueueSnackbar(res?.message || "Vacancy created successfully", {
          variant: "success",
        });
        toggle();
        form.reset();
      } else {
        enqueueSnackbar(res?.message || "Failed to create vacancy", {
          variant: "error",
        });
      }
    },
    onError: error => {
      enqueueSnackbar(error.message || "Failed to create vacancy", {
        variant: "error",
      });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  console.log("errors", errors);
  const onSubmit = (data: JobVacancyFormSchema) => {
    console.log("data", data);
    createVacancies(data);
    // toggle();
  };

  return (
    <ModalCustom
      title={t("title")}
      open={openModal}
      toggle={toggle}
      maxWidth="md"
      buttonOkProps={{
        onClick: handleSubmit(onSubmit),
        loading: isPending,
      }}
    >
      <FormJobVacancies form={form} />
    </ModalCustom>
  );
};
