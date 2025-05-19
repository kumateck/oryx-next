import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateRackSchema = z.object({
  locationId: z.object(
    {
      value: z.string().min(1, { message: "Location is required" }),
      label: z.string(),
    },
    {
      message: "Location is required",
    },
  ),
  name: z.string().min(1, { message: "Rack name is required" }),
  description: z.string().optional(),
});

export type RackRequestDto = z.infer<typeof CreateRackSchema>;
export const CreateRackValidator = zodResolver(CreateRackSchema);
