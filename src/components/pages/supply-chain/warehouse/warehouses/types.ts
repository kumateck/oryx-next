import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateWarehouseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  productionDepartment: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
  type: z.number(),
  code: z.string().min(1, { message: "Code is required" }),
});

export type WarehouseRequestDto = z.infer<typeof CreateWarehouseSchema>;
export const CreateWarehouseValidator = zodResolver(CreateWarehouseSchema);
