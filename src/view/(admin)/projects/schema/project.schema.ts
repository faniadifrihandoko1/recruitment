import type { useTranslations } from "next-intl";
import { z } from "zod";

type ValidationTranslator = ReturnType<
  typeof useTranslations<"page.assessmentProjects.validation">
>;

export const createProjectSchema = (t: ValidationTranslator) =>
  z.object({
    projectName: z
      .string()
      .trim()
      .min(1, t("projectNameRequired"))
      .min(3, t("projectNameMinLength")),
    projectDescription: z
      .string()
      .trim()
      .min(1, t("projectDescriptionRequired"))
      .min(10, t("projectDescriptionMinLength")),
  });

export type ProjectFormSchema = z.infer<ReturnType<typeof createProjectSchema>>;