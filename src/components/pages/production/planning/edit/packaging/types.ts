import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreatePackagingSchema = z
  .object({
    // materialThickness: z.string().optional(),
    // otherStandards: z.string().optional(),
    id: z.string().optional(),
    idIndex: z.string().optional(),
    spec: z.string().optional(),
    code: z.string().optional(),
    materialId: z.object(
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
      .min(0, { message: "Unit Capacity must be zero or greater" }) // Allow zero
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
        return data.unitCapacity !== undefined && data.unitCapacity > 0;
      }
      return true;
    },
    {
      message:
        "Unit Capacity must be greater than 0 when Direct Link Material is provided",
      path: ["unitCapacity"],
    },
  );

export const PackagingFormSchema = z.object({
  items: z.array(CreatePackagingSchema),
});
export type PackagingFormData = z.infer<typeof PackagingFormSchema>;

export const PackagingFormValidator = zodResolver(PackagingFormSchema);

export type PackagingRequestDto = z.infer<typeof CreatePackagingSchema>;
export const CreatePackagingValidator = zodResolver(CreatePackagingSchema);
