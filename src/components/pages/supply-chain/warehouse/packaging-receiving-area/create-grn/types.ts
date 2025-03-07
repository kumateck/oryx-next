import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createGRNRequestSchema = z.object({
  grnNumber: z.string().min(1, { message: "GRN Number is required" }),
  carrierName: z.string().min(1, { message: "Carrier Name is required" }),
  vehicleNumber: z.string().min(1, { message: "Vehicle Number is required" }),
  remarks: z.string().optional(), //.min(1, { message: "Remarks is required" }),
});

export type GRNRequestDto = z.infer<typeof createGRNRequestSchema>;
export const CreateGRNValidator = zodResolver(createGRNRequestSchema);
