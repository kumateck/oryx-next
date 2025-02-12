import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateDepartmentSchema = z.object({
  // warehouseId: z.a().min(1, {message: "Warehouse ID is required",},),
  warehouseIds: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, {
      message: "Warehouses are required",
    }),
  name: z.string().min(1, { message: "Location Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().optional(),
});

export type DepartmentRequestDto = z.infer<typeof CreateDepartmentSchema>;
export const CreateDepartmentValidator = zodResolver(CreateDepartmentSchema);
