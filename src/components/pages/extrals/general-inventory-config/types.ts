import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const departmentSchema = z.object({
  departmentId: z.object({
    value: z.string().min(1, "Department ID is required"),
    label: z.string(),
  }),
  initialStockQuantity: z.number().nonnegative(),
  minimumLevel: z.number().nonnegative(),
  maximumLevel: z.number().nonnegative(),
  reorderLevel: z.number().nonnegative(),
});

const inventoryConfigSchema = z.object({
  materialName: z.string().min(1, "Material name is required"),
  code: z.string().min(1, "Code is required"),
  inventoryTypeId: z.string().min(1, "Inventory type is required"),
  unitOfMeasureId: z.object({
    value: z.string().min(1, "Unit of measure is required"),
    label: z.string(),
  }),
  remarks: z.string().min(1, "Remarks are required"),
  reorderRule: z.object(
    {
      value: z
        .string()
        .min(1, "Reorder rule must be a valid ISO datetime string"),
      label: z.string(),
    },
    {
      message: "Reorder rule is required",
    },
  ),
  initialStockQuantity: z.number().nonnegative(),
  departmentId: z.object({
    value: z.string().min(1, "Department is required"),
    label: z.string(),
  }),
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
  departments: z.array(departmentSchema),
});

export type CreateInventoryDto = z.infer<typeof inventoryConfigSchema>;
export type CreateDepartmentDto = z.infer<typeof departmentSchema>;
export const CreateInventoryValidator = zodResolver(inventoryConfigSchema);
