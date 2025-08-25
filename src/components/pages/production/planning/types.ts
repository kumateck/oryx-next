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
  code: z
    .string({ required_error: "Code is required" })
    .min(1, {
      message: "Code is required",
    })
    .refine((val) => val !== "undefined", { message: "Invalid code value" }),
  description: z.string().optional(),
  genericName: z.string().optional(),
  storageCondition: z.string().optional(),
  packageStyle: z.string().optional(),
  shelfLife: z.string().optional(),
  actionUse: z.string().optional(),
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
  baseQuantity: z
    .number({
      required_error: "BaseQuantity is required",
      invalid_type_error: "Base Quantity must be a number",
    })
    .positive({
      message: "Base Quantity must be greater than 0",
    }),
  fullBatchSize: z
    .number({
      required_error: "Full Batch Size is required",
      invalid_type_error: "Full Batch Size must be a number",
    })
    .positive({
      message: "Full Batch Size must be greater than 0",
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
  division: z.object(
    {
      value: z.string().min(1, { message: "Division is required" }),
      label: z.string(),
    },
    {
      message: "Division is required",
    },
  ),
  packPerShipper: z
    .number({
      required_error: "Pack Per Shipper is required",
      invalid_type_error: "Pack Per Shipper must be a number",
    })
    .positive({
      message: "Pack Per Shipper must be greater than 0",
    }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({
      message: "Price must be greater than 0",
    }),
  equipment: z.object(
    {
      value: z.string().min(1, { message: "Equipment is required" }),
      label: z.string(),
    },
    {
      message: "Equipment is required",
    },
  ),
  department: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
  finishedProducts: z.array(CreateFinishedProductSchema).optional(),
});

export type ProductRequestDto = z.infer<typeof CreateProductSchema>;
export const CreateProductValidator = zodResolver(CreateProductSchema);
