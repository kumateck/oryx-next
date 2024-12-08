import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { WarehouseType } from "@/lib";

export const CreateWarehouseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  // productionDepartment: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
  type: z.nativeEnum(WarehouseType, {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'Storage' or 'Production'",
  }),
  code: z.string().min(1, { message: "Code is required" }),
});

export type WarehouseRequestDto = z.infer<typeof CreateWarehouseSchema>;
export const CreateWarehouseValidator = zodResolver(CreateWarehouseSchema);
