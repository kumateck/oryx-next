import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const billingSheetChargesRequestSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  cost: z.string().min(1, { message: "Description is required" }),
});

export type ChargesRequestDto = z.infer<
  typeof billingSheetChargesRequestSchema
>;

export const createBillingSheetRequestSchema = z.object({
  billOfLading: z.string().min(1, { message: "Bill of Lading is required" }),
  expectedArrivalDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expected Start Date is required",
      invalid_type_error: "Expected Start Date must be a valid date",
    }),
  ),
  containerSize: z.string().min(1, { message: "Container size is required" }),
  numberOfPackages: z
    .string()
    .min(1, { message: "Container size is required" }),
  freeTimeDuration: z
    .string()
    .min(1, { message: "Free Time Duration is required" }),
  freeTimeExpiryDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Free Time Expiry Date is required",
      invalid_type_error: "Free Time Expiry Date must be a valid date",
    }),
  ),
  demurrageStartDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Demurrage Start Date is required",
      invalid_type_error: "Demurrage Start Date must be a valid date",
    }),
  ),
  invoiceId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  supplierId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  uom: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measure is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measure is required",
    },
  ),
  charges: z.array(billingSheetChargesRequestSchema),
});

export type BillingSheetRequestDto = z.infer<
  typeof createBillingSheetRequestSchema
>;
export const CreateBillingSheetValidator = zodResolver(
  createBillingSheetRequestSchema,
);

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
  manufacturerId: z.string().optional(),
  purchaseOrderId: z.string().optional(),
  purchaseOrderCode: z.string().optional(),
  options: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type MaterialRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;
