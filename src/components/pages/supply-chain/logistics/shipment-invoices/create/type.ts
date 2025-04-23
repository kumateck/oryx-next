import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IdSchema } from "@/lib";

// import { RequisitionType } from "@/lib";

export const createRequisitionItemRequestSchema = z.object({
  code: z.string().optional(),
  materialName: z.string().optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
  uomId: z
    .string({ required_error: "UOM is required" })
    .min(1, { message: "UOM is required" }),
  expectedQuantity: z.number().min(0.1, { message: "Quantity is required" }),
  receivedQuantity: z
    .number()
    .min(0.1, { message: "Received Quantity is required" }),
  reason: z.string().optional(),
  uomName: z.string().optional(),
  costPrice: z.string().optional(),
  totalCost: z.string().optional(),
  manufacturerId: IdSchema("Manufacturer").optional(),
  purchaseOrderId: z.string().optional(),
  purchaseOrderCode: z.string().optional(),
  options: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export const itemsRequestSchema = z.array(createRequisitionItemRequestSchema);

// Define the CreateRequisitionRequest schema
export const createRequisitionRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  supplierId: IdSchema("Supplier"),
  purchaseOrderIds: z.array(IdSchema("Purchase Order")).min(1, {
    message: "Purchase Order is required",
  }),
  items: z.array(createRequisitionItemRequestSchema).nullable().optional(),
  // shipmentArrivedAt: z.preprocess(
  //   (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  //   z.date({
  //     required_error: "Expected Delivery Date is required",
  //     invalid_type_error: "Expected Delivery Date must be a valid date",
  //   }),
  // ),
});

export type InvoiceRequestDto = z.infer<typeof createRequisitionRequestSchema>;

export type MaterialRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;

export const CreateInvoiceValidator = zodResolver(
  createRequisitionRequestSchema,
);

export interface invoiceItemsDto {
  id: string;
  code: string;
  items: MaterialRequestDto[];
}
// requisitionType?: RequisitionType;
// comments?: string | null;
// items?: CreateRequisitionItemRequest[] | null;
