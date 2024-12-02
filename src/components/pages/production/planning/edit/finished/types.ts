import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinishedProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
  id: z.string().optional(),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  uoMId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  standardCost: z
    .number({
      required_error: "Cost Price is required",
    })
    .min(1, {
      message: "Cost Price should be greater than 0",
    }),
  sellingPrice: z
    .number({
      required_error: "Selling Price is required",
    })
    .min(1, {
      message: "Selling Price should be greater than 0",
    }),
});
export const CreateProductSchema = z.object({
  finishedProducts: z.array(CreateFinishedProductSchema).optional(),
});

export type FinishedRequestDto = z.infer<typeof CreateFinishedProductSchema>;
export type ProductRequestDto = z.infer<typeof CreateProductSchema>;
export const CreateFinishedValidator = zodResolver(CreateFinishedProductSchema);
export const CreateProductValidator = zodResolver(CreateProductSchema);
