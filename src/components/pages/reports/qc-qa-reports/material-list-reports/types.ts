import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { EMaterialKind } from "@/lib";

export const CreateMaterialSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  // reorderLevel: z
  //   .number({
  //     required_error: "Re-order Level is required",
  //     invalid_type_error: "Re-order Level must be a number",
  //   })
  //   .positive({ message: "Re-order Level must be greater than 0" }),
  description: z.string().optional(),
  pharmacopoeia: z.string().optional(),
  // kind: z.nativeEnum(EMaterialKind, {
  //   required_error: "Type is required",
  //   invalid_type_error: "Type must be either 'Package' or 'Raw'",
  // }),
  kind: z
    .string()
    .transform((value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("Invalid value for kind");
      }
      return numValue;
    })
    .refine(
      (value) => value === EMaterialKind.Raw || value === EMaterialKind.Packing,
      {
        message: "Type must be either 'Raw' (0) or 'Package' (1)",
      },
    ),
  materialCategoryId: z.object(
    {
      value: z.string().min(1, { message: "Material Category is required" }),
      label: z.string(),
    },
    {
      message: "Material Category is required",
    },
  ),
});

export type MaterialRequestDto = z.infer<typeof CreateMaterialSchema>;
export const CreateMaterialValidator = zodResolver(CreateMaterialSchema);
