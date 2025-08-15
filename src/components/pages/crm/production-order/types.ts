import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const ProductionOrderShema = z.object({
  code: z.string().min(1, "Code is required"),
  customerId: z.object(
    {
      label: z.string(),
      value: z.string().min(1, "Customer is required"),
    },
    {
      message: "Customer is required",
    },
  ),
  products: z.array(
    z.object({
      productId: z.object(
        {
          label: z.string(),
          value: z.string().min(1, "Product is required"),
        },
        {
          message: "Product is required",
        },
      ),
      quantity: z.number().min(1, "Quantity must be greater than 0"),
      price: z.number().min(0, "Price cannot be negative"),
    }),
  ),
});

export type CreateProductionSchemaOrders = z.infer<typeof ProductionOrderShema>;
export const CreateProductionSchemaOrdersValidator =
  zodResolver(ProductionOrderShema);
