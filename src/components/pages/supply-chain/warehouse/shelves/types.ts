import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateShelfSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rack: z.string().min(1, { message: "Rack is required" }),
  description: z.string().optional(),
  type: z.number(),
  code: z.string().min(1, { message: "Code is required" }),
});

export type ShelfRequestDto = z.infer<typeof CreateShelfSchema>;
export const CreateShelfValidator = zodResolver(CreateShelfSchema);
