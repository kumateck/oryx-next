import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const locationSchema = z.object({
  quantity: z
    .number()
    .positive({ message: "Quantity must be greater than 0" })
    .min(0.1, { message: "Minimum quantity is 0.1" }),
  rackId: z.object(
    {
      value: z.string().min(1, { message: "Rack is required" }),
      label: z.string(),
    },
    { message: "Rack is required" },
  ),
  shelfId: z.object(
    {
      value: z.string().min(1, { message: "Shelf is required" }),
      label: z.string(),
    },
    { message: "Shelf is required" },
  ),
  note: z.string().optional(),
});

export const associateLocationRequestSchema = z.object({
  locations: z.array(locationSchema),
});

export type LocationRequestDto = z.infer<typeof associateLocationRequestSchema>;

export const LocationValidator = zodResolver(associateLocationRequestSchema);
