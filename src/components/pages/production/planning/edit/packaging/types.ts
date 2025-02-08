import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreatePackagingSchema = z.object({
  materialThickness: z.string().optional(),
  otherStandards: z.string().optional(),
  id: z.string().optional(),
  idIndex: z.string().optional(),
  materialId: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),

  directLinkMaterialId: z
    .object(
      {
        value: z.string().min(1, { message: "Material is required" }),
        label: z.string(),
      },
      {
        message: "UOM is required",
      },
    )
    .optional(),

  baseQuantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
  unitCapacity: z
    .number({
      required_error: "Unit Capacity is required",
      invalid_type_error: "Unit Capacity must be a number",
    })
    .positive({
      message: "Unit Capacity must be greater than 0",
    }),
});

export type PackagingRequestDto = z.infer<typeof CreatePackagingSchema>;
export const CreatePackagingValidator = zodResolver(CreatePackagingSchema);
