import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateManufacturerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  validityDate: z
    .string({ required_error: "Validity Date is required" })
    .min(1, {
      message: "Validity Date is required",
    }),
  materials: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, {
      message: "Materials is required",
    }),
});

export type ManufacturerRequestDto = z.infer<typeof CreateManufacturerSchema>;
export const CreateManufacturerValidator = zodResolver(
  CreateManufacturerSchema,
);
