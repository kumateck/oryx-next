import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreatePackagingSchema = z
  .object({
    materialThickness: z.string().optional(),
    otherStandards: z.string().optional(),
    id: z.string().optional(),
    idIndex: z.string().optional(),
    material: z.object(
      {
        value: z.string().min(1, { message: "Material is required" }),
        label: z.string(),
      },
      {
        message: "Material is required",
      },
    ),
    packingExcessMargin: z
      .number()
      .optional()
      .refine((val) => val === undefined || val >= 0, {
        message: "packingExcessMargin must be zero or a positive number",
      }),
    directLinkMaterial: z
      .object({
        value: z.string(),
        label: z.string(),
      })
      .optional(),
    unitCapacity: z
      .number({
        invalid_type_error: "Unit Capacity must be a number",
      })
      .positive("Unit Capacity must be greater than 0")
      .optional(),
    baseQuantity: z
      .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
      })
      .positive({
        message: "Quantity must be greater than 0",
      }),
  })
  .refine(
    (data) => {
      if (data.directLinkMaterial) {
        return data.unitCapacity !== undefined;
      }
      return true;
    },
    {
      message:
        "Unit Capacity is required when Direct Link Material is provided",
      path: ["unitCapacity"],
    },
  );

export type PackagingRequestDto = z.infer<typeof CreatePackagingSchema>;
export const CreatePackagingValidator = zodResolver(CreatePackagingSchema);
