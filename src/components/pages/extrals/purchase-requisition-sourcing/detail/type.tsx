import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IdSchema } from "@/lib";

export const createRequisitionItemRequestSchema = z.object({
  itemName: z.string().optional(),
  itemId: z.string().min(1, { message: "Item is required" }),
  uomId: z
    .string({ required_error: "UOM is required" })
    .min(1, { message: "UOM is required" }),
  quantity: z.number().min(0.1, { message: "Quantity is required" }),
  // code: z.string().optional(),
  uom: z.string().optional(),
  source: z.string().optional(),
  vendors: z.array(IdSchema("Supplier")).optional(),
});

export const itemsRequestSchema = z.array(createRequisitionItemRequestSchema);

export const createRequisitionRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  comments: z.string().nullable().optional(),
  items: z.array(createRequisitionItemRequestSchema).nullable().optional(),
  expectedDelivery: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expected Delivery Date is required",
      invalid_type_error: "Expected Delivery Date must be a valid date",
    }),
  ),
});

export type RequisitionRequestDto = z.infer<
  typeof createRequisitionRequestSchema
>;

export type InventoryRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;

export const CreateRequisitionValidator = zodResolver(
  createRequisitionRequestSchema,
);

// requisitionType?: RequisitionType;
// comments?: string | null;
// items?: CreateRequisitionItemRequest[] | null;
