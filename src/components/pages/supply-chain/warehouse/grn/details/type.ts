import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IdSchema } from "@/lib";

// import { RequisitionType } from "@/lib";

export const createRequisitionItemRequestSchema = z.object({
  code: z.string().optional(),
  materialName: z.string().optional(),
  uom: z.string().optional(),
  floatQuantity: z.string().optional(),
  finalQuantityNeeded: z.string().optional(),
  finalQuantityOnHand: z.string().optional(),
  finalQuantityRequested: z.string().optional(),
  finalTotalStock: z.string().optional(),
  floatedQuantity: z.string().optional(),
  totalStockLabel: z.string().optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
  uomId: z
    .string({ required_error: "UOM is required" })
    .min(1, { message: "UOM is required" }),
  quantityOnHand: z.number().min(1, { message: "Quantity is required" }),
  quantityRequested: z.number().min(1, { message: "Quantity is required" }),
  quantity: z.number().optional(),
  totalStock: z.number().min(1, { message: "Quantity is required" }),
});

export const itemsRequestSchema = z.array(
  z.object({
    materialId: z.string().min(1, { message: "Material is required" }),
    quantity: z.number().min(0.1, { message: "Quantity is required" }),
    uomId: z
      .string({ required_error: "UOM is required" })
      .min(1, { message: "UOM is required" }),
  }),
);

// Define the CreateRequisitionRequest schema
export const createRequisitionRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  comments: z.string().nullable().optional(),
  items: z.array(createRequisitionItemRequestSchema).nullable().optional(),
  //   expectedDelivery: z.preprocess(
  //     (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  //     z.date({
  //       required_error: "Expected Delivery Date is required",
  //       invalid_type_error: "Expected Delivery Date must be a valid date",
  //     }),
  //   ),
  expectedDelivery: z.date().optional(),
  // .min(1, { message: "Expected Delivery Date is required" })
  // .refine((val) => !isNaN(Date.parse(val)), {
  //   message: "Invalid date format",
  // }),
});

export type RequisitionRequestDto = z.infer<
  typeof createRequisitionRequestSchema
>;

export type MaterialRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;

export const CreateRequisitionValidator = zodResolver(
  createRequisitionRequestSchema,
);

export const associateLocationSchema = z.object({
  uom: z.string().optional(),
  productId: IdSchema("Product"),
  rackId: z.object(
    {
      value: z.string().min(1, { message: "Rack is required" }),
      label: z.string(),
    },
    {
      message: "Rack is required",
    },
  ),
  shelfId: z.object(
    {
      value: z.string().min(1, { message: "Shelf is required" }),
      label: z.string(),
    },
    {
      message: "Shelf is required",
    },
  ),
  quantity: z.number().min(0.1, { message: "Quantity is required" }),
  note: z.string().optional(),
});

export const associateLocationRequestSchema = z.array(associateLocationSchema);

export type LocationsDto = z.infer<typeof associateLocationRequestSchema>;

export const LocationValidator = zodResolver(associateLocationRequestSchema);
