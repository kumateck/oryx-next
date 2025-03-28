import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createFinalDetailsRequestSchema = z.object({
  invoiceNumber: z.string().min(1, { message: "Invoice Number is required" }),
  totalFobValue: z
    .number({
      required_error: "Total FOB Value is required",
      invalid_type_error: "Total FOB Value must be a number",
    })
    .positive({
      message: "Total FOB Value must be greater than 0",
    }),
  cifValue: z
    .number({
      required_error: "Total CIF Value is required",
      invalid_type_error: "Total CIF Value must be a number",
    })
    .positive({
      message: "Total CIF Value must be greater than 0",
    }),
  freight: z
    .number({
      required_error: "Freight Cost is required",
      invalid_type_error: "Freight Cost must be a number",
    })
    .positive({
      message: "Freight Cost must be greater than 0",
    }),
  insuranceAmount: z
    .number({
      required_error: "Insurance Amount is required",
      invalid_type_error: "Insurance Amount must be a number",
    })
    .positive({
      message: "Insurance Amount must be greater than 0",
    }),
  amountInFigures: z
    .string()
    .min(1, { message: "Amount in Figures is required" }),
  termsOfPayment: z.object(
    {
      value: z.string().min(1, { message: "Terms of Payment is required" }),
      label: z.string(),
    },
    {
      message: "Terms of Payment is required",
    },
  ),
  deliveryMode: z.object(
    {
      value: z.string().min(1, { message: "Delivery Mode is required" }),
      label: z.string(),
    },
    {
      message: "Delivery Mode is required",
    },
  ),
  estimatedDeliveryDate: z.date({
    required_error: "Estimated Delivery Date is required",
  }),
});

export type FinalDetailsRequestDto = z.infer<
  typeof createFinalDetailsRequestSchema
>;
export const CreateFinalDetailsValidator = zodResolver(
  createFinalDetailsRequestSchema,
);
