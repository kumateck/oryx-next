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

export const createGRNRequestSchema = z.object({
  code: z.string().optional(),
  numberOfBags: z.string().optional(),
  expiryDate: z.string().optional(),
  manufacturingDate: z.string().optional(),
  retestDate: z.string().optional(),
  batchQuantity: z.string().optional(),
  product: z.string().optional(),
  manufacturerName: z.string().optional(),
  invoiceNumber: z.string().optional(),
  expriryDate: z.string().optional(),
});

export type GRNRequestDto = z.infer<typeof createGRNRequestSchema>;
