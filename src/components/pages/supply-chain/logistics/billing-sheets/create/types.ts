import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createBillingSheetRequestSchema = z.object({
  grnNumber: z.string().min(1, { message: "GRN Number is required" }),
  carrierName: z.string().min(1, { message: "Carrier Name is required" }),
  vehicleNumber: z.string().min(1, { message: "Vehicle Number is required" }),
  remarks: z.string().optional(), //.min(1, { message: "Remarks is required" }),
  containerSize: z.string().min(1, { message: "Container Size is required" }),
  numberOfPackages: z
    .string()
    .min(1, { message: "Number of Packages is required" }),
  uom: z.string().min(1, { message: "Unit of Measure is required" }),
});

export type BillingSheetRequestDto = z.infer<
  typeof createBillingSheetRequestSchema
>;
export const CreateBillingSheetValidator = zodResolver(
  createBillingSheetRequestSchema,
);
