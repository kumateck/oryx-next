import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateLocationSchema = z.object({
  warehouse: z.string().min(1, { message: "Warehouse is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  floor: z.string().min(1, { message: "Location is required" }),
  description: z.string().optional(),
  type: z.number(),
  code: z.string().min(1, { message: "Code is required" }),
});

export type LocationRequestDto = z.infer<typeof CreateLocationSchema>;
export const CreateLocationValidator = zodResolver(CreateLocationSchema);
