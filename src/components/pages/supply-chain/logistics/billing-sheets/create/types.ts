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
  freeTimeDuration: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Free Time Expiry Date is required",
      invalid_type_error: "Free Time Expiry Date must be a valid date",
    }),
  ),
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
