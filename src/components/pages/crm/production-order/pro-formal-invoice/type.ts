import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
const createInvoiceShema = z.object({
  productionOrderId: z
    .string()
    .min(1, { message: "Production order is required" }),
  productionOrderName: z.string().optional(),
  products: z.array(
    z.object({
      productId: z.string().min(1, { message: "Product is required" }),
      productName: z.string().optional(),
      quantity: z.number(),
    }),
  ),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceShema>;
export const CreateInvoiceSchemaValidator = zodResolver(createInvoiceShema);
