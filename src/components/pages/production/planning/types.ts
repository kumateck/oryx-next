import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinishedProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  baseUomId: z.object(
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
  genericName: z.string().optional(),
  storageCondition: z.string().optional(),
  packageStyle: z.string().optional(),
  shelfLife: z.string().optional(),
  actionuse: z.string().optional(),
  filledWeight: z.string().optional(),
  baseUomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  packingExcessMargin: z
    .number({
      required_error: "Excess Packing Margin is required",
      invalid_type_error: "Excess Packing Margin must be a number",
    })
    .positive({
      message: "Excess Packing Margin must be greater than 0",
    })
    .optional(),
  baseQuantity: z
    .number({
      required_error: "BaseQuantity is required",
      invalid_type_error: "Base Quantity must be a number",
    })
    .positive({
      message: "Base Quantity must be greater than 0",
    }),
  basePackingQuantity: z
    .number({
      required_error: "BaseQuantity is required",
      invalid_type_error: "Base Quantity must be a number",
    })
    .positive({
      message: "Base Quantity must be greater than 0",
    }),
  basePackingUomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
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
