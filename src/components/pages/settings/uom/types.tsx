import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateUomSchema = z.object({
  name: z.string({ required_error: "Prefix is required" }).min(1, {
    message: "Prefix is required",
  }),
  symbol: z.string({ required_error: "Prefix is required" }).min(1, {
    message: "Prefix is required",
  }),
  description: z.string().optional(),
  type: z.object(
    {
      value: z.string().min(1, { message: "Model Type is required" }),
      label: z.string(),
    },
    {
      message: "Model Type is required",
    },
  ),
  category: z.object(
    {
      value: z.string().min(1, { message: "Name Type is required" }),
      label: z.string(),
    },
    {
      message: "Name Type is required",
    },
  ),
});

export type UomRequestDto = z.infer<typeof CreateUomSchema>;
export const CreateUomValidator = zodResolver(CreateUomSchema);
