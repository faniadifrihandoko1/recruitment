import { generalOptionSchema } from "@/schema/types";
import type { useTranslations } from "next-intl";
import { z } from "zod";

type ValidationTranslator = ReturnType<
  typeof useTranslations<"page.assessmentProjects.detail.jobVacancies.validation">
>;

export const createJobVacancySchema = (t: ValidationTranslator) =>
  z
    .object({
      positionTitle: z.string().min(1, t("positionTitleRequired")),

      jobDescriptions: z
        .array(z.string().min(3, t("jobDescriptionMinLength")))
        .min(1, t("jobDescriptionMinItems")),

      jobRequirements: z.array(
        z
          .object({
            text: z.string().min(3, t("jobRequirementMinLength")),
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

            if (data.type) newData.type = data.type.id;

            return newData;
          })
      ),
      // .min(1, t("jobRequirementMinItems")),

      employeeType: generalOptionSchema.superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("employeeTypeRequired"),
          });
        }
      }),
      openings: z.string().superRefine((data, ctx) => {
        if (!data && data !== "0") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("openingsRequired"),
          });
        }
      }),

      location: z.string().superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("locationRequired"),
          });
        }
      }),

      minSalary: z.string().nullable().optional(),
      maxSalary: z.string().nullable().optional(),

      showSalary: z.boolean(),

      openDate: z.string().superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("openDateRequired"),
          });
        }
      }),

      closeDate: z.string().superRefine((data, ctx) => {
        if (!data) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("closeDateRequired"),
          });
        }
      }),
    })
    .superRefine((data, ctx) => {
      // salary validation
      if (data.maxSalary && data.minSalary && data.maxSalary < data.minSalary) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("maxSalaryLessThanMin"),
          path: ["maxSalary"],
        });
      }
    })
    .transform(data => {
      const newData: any = data;

      if (data.employeeType) newData.employeeType = data.employeeType.id;

      return newData;
    });

export type JobVacancyFormSchema = z.infer<
  ReturnType<typeof createJobVacancySchema>
>;
