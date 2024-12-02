import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinishedProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
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
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  description: z.string().optional(),

  categoryId: z.object(
    {
      value: z.string().min(1, { message: "Category is required" }),
      label: z.string(),
    },
    {
      message: "Category is required",
    },
  ),

  finishedProducts: z.array(CreateFinishedProductSchema).optional(),
});

export type ProductRequestDto = z.infer<typeof CreateProductSchema>;
export const CreateProductValidator = zodResolver(CreateProductSchema);
