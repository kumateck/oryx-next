import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { WarehouseType } from "@/lib";

export const CreateWarehouseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  // productionDepartment: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
  type: z
    .string()
    .transform((value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("Invalid value for kind");
      }
      return numValue;
    })
    .refine(
      (value) =>
        value === WarehouseType.Storage || value === WarehouseType.Production,
      {
        message: "Type must be either 'Storage' (0) or 'Production' (1)",
      },
    ),
  // code: z.string().min(1, { message: "Code is required" }),
});

export type WarehouseRequestDto = z.infer<typeof CreateWarehouseSchema>;
export const CreateWarehouseValidator = zodResolver(CreateWarehouseSchema);
