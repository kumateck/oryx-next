import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type Stage = 0 | 1 | 2;

export const stageLabels = {
  0: "intimidate",
  1: "bulk",
  2: "finished",
} as const;

export const stageValues = {
  intimidate: 0,
  bulk: 1,
  finished: 2,
} as const;

export type StageLabel = keyof typeof stageValues;

export const ProductArdSchema = z.object({
  stpId: z.object(
    {
      value: z.string().min(1, { message: "Meterial is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  formId: z.object(
    {
      value: z.string().min(1, { message: "form is required" }),
      label: z.string(),
    },
    {
      message: "Form is required",
    },
  ),
  stage: z.enum(["intimidate", "bulk", "finished"], {
    required_error: "Stage is required",
  }),
  description: z.string().optional(),
  specNumber: z
    .string()
    .min(1, { message: "Specification number is required" }),
});

export type ProductArdSchemaType = z.infer<typeof ProductArdSchema>;
export const ProductArdSchemaResolver = zodResolver(ProductArdSchema);
