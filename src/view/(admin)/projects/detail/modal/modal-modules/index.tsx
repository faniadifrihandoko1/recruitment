"use client";

import ModalCustom from "@/component/shared/modal/modal-custom";
import { useTranslations } from "next-intl";
import ModulesList from "../../table/table-modules/list";

interface ModalModulesProps {
  openModal: boolean;
  toggle: () => void;
}

export const ModalModules = ({ openModal, toggle }: ModalModulesProps) => {
  const t = useTranslations(
    "page.project.detail.jobVacancies.modal.modal-modules"
  );

  return (
    <ModalCustom
      title={t("title")}
      open={openModal}
      toggle={toggle}
      maxWidth="sm"
      //   buttonOkProps={{
      //     onClick: handleSubmit(onSubmit),
      //   }}
    >
      <ModulesList />
    </ModalCustom>
  );
};
