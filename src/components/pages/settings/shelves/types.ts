import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateShelfSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  rackId: z.object(
    {
      value: z.string().min(1, { message: "Rack is required" }),
      label: z.string(),
    },
    {
      message: "Rack is required",
    },
  ),
  description: z.string().optional(),
  code: z.string().min(1, { message: "Code is required" }),
});

export type ShelfRequestDto = z.infer<typeof CreateShelfSchema>;
export const CreateShelfValidator = zodResolver(CreateShelfSchema);
