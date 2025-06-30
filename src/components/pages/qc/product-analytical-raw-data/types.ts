import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export enum Stage {
  intermediate = 0,
  bulk = 1,
  finished = 2,
}

export const stageLabels = {
  [Stage.intermediate]: "Intermediate",
  [Stage.bulk]: "Bulk",
  [Stage.finished]: "Finished",
} as const;

export const stageValues = {
  intermediate: 0,
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

export const stageOptions = [
  {
    value: Stage.intermediate as unknown as string,
    label: "Intermediate",
  },
  { value: Stage.bulk as unknown as string, label: "Bulk" },
  { value: Stage.finished as unknown as string, label: "Finished" },
];
