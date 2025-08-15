import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
const createInvoiceShema = z.object({
  productionOrderId: z.object({
    value: z.string().min(1, { message: "Production order is required" }),
    label: z.string(),
  }),
  products: z.array(
    z.object({
      productId: z.object(
        {
          value: z.string().min(1, { message: "Product is required" }),
          label: z.string(),
        },
        { message: "Product is required" },
      ),
      quantity: z.number().min(1),
    }),
  ),
});

export type CreateInvoiceSchema = z.infer<typeof createInvoiceShema>;
export const CreateInvoiceSchemaValidator = zodResolver(createInvoiceShema);
