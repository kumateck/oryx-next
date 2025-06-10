import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export enum Stage {
  intimidate = 0,
  bulk = 1,
  finished = 2,
}

export const stageLabels = {
  [Stage.intimidate]: "intimidate",
  [Stage.bulk]: "bulk",
  [Stage.finished]: "finished",
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
  stage: z.object(
    {
      value: z.nativeEnum(stageValues, {
        message: "Stage is required",
      }),
      label: z.string(),
    },
    {
      message: "Stage is required",
    },
  ),
  description: z.string().optional(),
  specNumber: z
    .string()
    .min(1, { message: "Specification number is required" }),
});

export type ProductArdSchemaType = z.infer<typeof ProductArdSchema>;
export const ProductArdSchemaResolver = zodResolver(ProductArdSchema);
