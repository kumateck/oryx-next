import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const inventoryConfigSchema = z.object({
  materialName: z.string().min(1, "Material name is required"),
  code: z.string().min(1, "Code is required"),
  storeType: z.string().min(1, "Store type is required"),
  unitOfMeasureId: z.object({
    value: z.string().min(1, "Unit of measure is required"),
    label: z.string(),
  }),
  // reorderRule: z.object(
  //   {
  //     value: z
  //       .string()
  //       .min(1, "Reorder rule must be a valid ISO datetime string"),
  //     label: z.string(),
  //   },
  //   {
  //     message: "Reorder rule is required",
  //   },
  // ),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  classification: z.object(
    {
      value: z.string().min(1, "Classification is required"),
      label: z.string(),
    },
    {
      message: "Classification is required",
    },
  ),
  minimumLevel: z
    .number()
    .min(0, "Minimum level must be greater than or equal to 0"),
  maximumLevel: z
    .number()
    .min(0, "Maximum level must be greater than or equal to 0"),
  reorderLevel: z
    .number()
    .min(0, "Reorder level must be greater than or equal to 0"),
});

export type CreateInventoryDto = z.infer<typeof inventoryConfigSchema>;
export const CreateInventoryValidator = zodResolver(inventoryConfigSchema);
