import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PackingSchema = z.object({
  uomId: z.object(
    {
      value: z.string().min(1, { message: "UoM is required" }),
      label: z.string(),
    },
    {
      message: "UoM is required",
    },
  ),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
});
export const CreatePackingStyleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  id: z.string().optional(),
  idIndex: z.string().optional(),
  packingLists: z
    .array(PackingSchema)
    .min(1, { message: "Packing is required" }),
});
export type PackingDto = z.infer<typeof PackingSchema>;
export type PackingStyleRequestDto = z.infer<typeof CreatePackingStyleSchema>;
export const CreatePackingalidator = zodResolver(CreatePackingStyleSchema);
