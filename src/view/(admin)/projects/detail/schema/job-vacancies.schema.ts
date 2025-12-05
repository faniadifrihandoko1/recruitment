import { generalOptionSchema } from "@/schema/types";
import type { useTranslations } from "next-intl";
import { z } from "zod";

type ValidationTranslator = ReturnType<
  typeof useTranslations<"page.assessmentProjects.detail.jobVacancies.validation">
>;

export const createJobVacancySchema = (t: ValidationTranslator) =>
  z
    .object({
      name: z.string().min(1, t("positionTitleRequired")),
      description: z.string().optional().nullable(),
      job_description: z
        .array(
          z.object({
            title: z.string().min(3, t("jobDescriptionMinLength")),
          })
        )
        .optional(),

      job_requirement: z
        .array(
          z
            .object({
              title: z.string().min(3, t("jobRequirementMinLength")),
              type: generalOptionSchema.superRefine((data, ctx) => {
                if (!data) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Requirement type is required",
                  });
                }
              }),
            })
            .transform(data => {
              const newData: any = data;

              if (data.type) newData.type = data.type.name;

              return newData;
            })
        )
        .optional(),
      // .min(1, t("jobRequirementMinItems")),

      type: generalOptionSchema.superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("employeeTypeRequired"),
          });
        }
      }),
      status: generalOptionSchema.superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("employeeTypeRequired"),
          });
        }
      }),

      location: z.string().nullable().optional(),
      min_salary: z.string().nullable().optional(),
      max_salary: z.string().nullable().optional(),
      openings: z.string().superRefine((data, ctx) => {
        if (!data && data !== "0") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("openingsRequired"),
          });
        }
      }),

      showSalary: z.boolean(),

      open_date: z.string().nullable().optional(),

      close_date: z.string().nullable().optional(),
    })

    .transform(data => {
      const newData: any = data;

      if (data.type) newData.type = data.type.name;
      if (data.status) newData.status = data.status.name;

      return newData;
    });

export type JobVacancyFormSchema = z.infer<
  ReturnType<typeof createJobVacancySchema>
>;
