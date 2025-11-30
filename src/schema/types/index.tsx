import { z } from "zod";

export const generalOptionSchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional(),
    label: z.string().optional(),
  })
  .nullable();

export const generalOptionTransformSchema = generalOptionSchema.transform(
  value => value?.id ?? null
);

export const NewGeneralOptionSchema = z
  .object({
    Id: z.number().optional(),
    Name: z.string().optional(),
  })
  .nullable();

export const NewGeneralOptionTransformSchema = NewGeneralOptionSchema.transform(
  value => value?.Id ?? null
);
