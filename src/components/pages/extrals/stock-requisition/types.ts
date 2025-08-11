import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const objectSchema = z.object({
  // itemId: z.object({
  //   value: z.string({
  //     required_error: "Item is required",
  //     message: "Item is required",
  //   }),
  //   label: z.string({
  //     required_error: "Item is required",
  //     message: "Item is required",
  //   }),
  // }),
  // departmentId: z.object(
  //   {
  //     value: z.string({
  //       message: "Department is required",
  //     }),
  //     label: z.string(),
  //   },
  //   {
  //     message: "Department is required",
  //   },
  // ),
  // itemCode: z.string().optional(),
  // stockQuantity: z.number().nonnegative(),
  // orderQuantity: z.number().nonnegative(),
  value: z.string({
    required_error: "Item is required",
    message: "Item is required",
  }),
  label: z.string({
    required_error: "Item is required",
    message: "Item is required",
  }),
});

export const CreateStockRequisitionSchema = z.object({
  justification: z.string().min(1, { message: "Justification is required" }),
  number: z.string().min(1, { message: "Code is required" }),
  requisitionDate: z.date({
    message: "Delivery date is required",
  }),
  items: z.array(objectSchema).min(1, {
    message: "At least one service is required",
  }),
  departmentId: z.object(
    {
      value: z.string({
        message: "Department is required",
      }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
});

export type StockRequisitionDto = z.infer<typeof CreateStockRequisitionSchema>;
export const CreateStockRequisitionValidator = zodResolver(
  CreateStockRequisitionSchema,
);
