import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateGoodsTranferSchema = z.object({
  product: z.object(
    {
      value: z.string().min(1, { message: "Name is required" }),
      label: z.string(),
    },
    {
      message: "Product is required",
    },
  ),
  department: z.object(
    {
      value: z.string().min(1, { message: "Name is required" }),
      label: z.string(),
    },
    {
      message: "Product is required",
    },
  ),
  batchNumber: z.string().min(1, { message: "Batch number is required" }),
  menufacturedDate: z.date(),
  expiryDate: z.date(),
  quantityPerPack: z
    .number()
    .min(1, { message: "Quantity per pack is required" }),
  totalTranfareQuantity: z
    .number()
    .min(1, { message: "Totoal quantity to transfare is required" }),
  unitMeasure: z.object(
    {
      value: z.string().min(1, { message: "Name is required" }),
      label: z.string(),
    },
    {
      message: "Product is required",
    },
  ),
});

export type GoodTransfereDto = z.infer<typeof CreateGoodsTranferSchema>;
export const CreateGoodsValidator = zodResolver(CreateGoodsTranferSchema);
