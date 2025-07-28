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
  floorName: z.object(
    {
      value: z.string().min(1, { message: "Floor is required" }),
      label: z.string(),
    },
    {
      message: "Floor is required",
    },
  ),
  name: z.object(
    {
      value: z.string().min(1, { message: "Location is required" }),
      label: z.string(),
    },
    {
      message: "Location is required",
    },
  ), //z.string().min(1, { message: "Location Name is required" }),
  // floorName: z.string().min(1, { message: "Floor is required" }),
  description: z.string().optional(),
  isEdit: z.string().optional(),
});

export type LocationRequestDto = z.infer<typeof CreateLocationSchema>;
export const CreateLocationValidator = zodResolver(CreateLocationSchema);
export interface WAREtYPES {
  id: string;
  name: string;
  type: number;
}
