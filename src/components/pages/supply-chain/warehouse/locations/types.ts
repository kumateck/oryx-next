import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateLocationSchema = z.object({
  warehouseId: z.object(
    {
      value: z.string().min(1, { message: "Warehouse is required" }),
      label: z.string(),
    },
    {
      message: "Warehouse is required",
    },
  ),
  name: z.string().min(1, { message: "Location Name is required" }),
  floorName: z.string().min(1, { message: "Floor is required" }),
  description: z.string().optional(),
});

export type LocationRequestDto = z.infer<typeof CreateLocationSchema>;
export const CreateLocationValidator = zodResolver(CreateLocationSchema);
