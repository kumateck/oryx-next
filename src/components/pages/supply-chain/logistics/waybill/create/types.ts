import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const WaybillSchema = z.object({
  invoiceId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  supplierName: z.string().min(1, { message: "Supplier Name is required" }),
});

export type WaybillRequestDto = z.infer<typeof WaybillSchema>;
export const CreateWaybillValidator = zodResolver(WaybillSchema);
