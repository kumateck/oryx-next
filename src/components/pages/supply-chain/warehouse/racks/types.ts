import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateRackSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  name: z.string().min(1, { message: "Rack name is required" }),
  description: z.string().optional(),
  type: z.number(),
  code: z.string().min(1, { message: "Code is required" }),
});

export type RackRequestDto = z.infer<typeof CreateRackSchema>;
export const CreateRackValidator = zodResolver(CreateRackSchema);
