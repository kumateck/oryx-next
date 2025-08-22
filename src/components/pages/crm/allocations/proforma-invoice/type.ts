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

// Extracted invoice data structure
export interface InvoiceProduct {
  id: string;
  name: string;
  code: string;
  description: string;
  price: number;
  fulfilledQuantity: number;
  totalValue: number;
  storageCondition: string;
  shelfLife: string;
  labelClaim: string | null;
}

export interface InvoiceCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface InvoiceData {
  orderCode: string;
  customer: InvoiceCustomer;
  products: InvoiceProduct[];
  orderDate: string;
  totalAmount: number;
  isApproved: boolean;
}
