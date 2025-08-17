import { InventoryType } from "@/lib/enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const objectSchema = z.object({
  itemId: z.object({
    value: z.string({
      required_error: "Item is required",
      message: "Item is required",
    }),
    label: z.string({
      required_error: "Item is required",
      message: "Item is required",
    }),
  }),
  itemCode: z.string().optional(),
  quantity: z.number().nonnegative(),
});

export const CreateStockRequisitionSchema = z.object({
  justification: z.string().min(1, { message: "Justification is required" }),
  number: z.string().min(1, { message: "Code is required" }),
  requisitionDate: z.date({
    message: "Requisition date is required",
  }),
  items: z.array(objectSchema).min(1, {
    message: "At least one service is required",
  }),
  storyType: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .default({
      value: String(InventoryType["IT Store"]),
      label: "IT Store",
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
