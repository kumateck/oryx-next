import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinishedProductSchema = z.object({
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid date",
    }),
  ),
  numberOfContainers: z
    .string({ required_error: "Number of containers is required" })
    .min(1, {
      message: "Number of containers is required",
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
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid date",
    }),
  ),
  numberOfContainers: z
    .string({ required_error: "Number of containers is required" })
    .min(1, {
      message: "Number of containers is required",
    }),
  categoryId: z.object(
    {
      value: z.string().min(1, { message: "Category is required" }),
      label: z.string(),
    },
    {
      message: "Category is required",
    },
  ),
  invoiceNumber: z
    .string({ required_error: "Invoice Number is required" })
    .min(1, {
      message: "Invoice Number is required",
    }),
  quantityPerContainer: z
    .string({ required_error: "Number of containers is required" })
    .min(1, {
      message: "Number of containers is required",
    }),
  manufacturerName: z
    .string({
      required_error: "Manufacturer Name is required",
    })
    .min(1, {
      message: "Manufacturer Name is required",
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

  finishedProducts: z.array(CreateFinishedProductSchema).optional(),
});

export type ProductRequestDto = z.infer<typeof CreateProductSchema>;
export const CreateProductValidator = zodResolver(CreateProductSchema);
