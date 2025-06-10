import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { imageValidationSchema } from "./type";

const MaterialArdSchema = z.object({
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
      value: z.string().min(1, { message: "Meterial is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  description: z.string().optional(),
  specNumber: z
    .string()
    .min(1, { message: "Specification number is required" }),
  attachments: imageValidationSchema.optional(),
});

export type MaterialArdSchemaType = z.infer<typeof MaterialArdSchema>;
export const MaterialArdSchemaResolver = zodResolver(MaterialArdSchema);
