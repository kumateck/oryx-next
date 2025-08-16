import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
const createWaybillSchema = z.object({
  date: z.string().uuid(),
  time: z.string().min(2).max(100),
  waybillNumber: z.string().min(10).max(200),
  driversName: z.string().min(1, { message: "Driver name is required" }),
  customerName: z.string(),
  customerAddress: z.string(),
  vehicleNumber: z.string(),
  dispatchedBy: z.string(),
});

export type CreateWaybillSchema = z.infer<typeof createWaybillSchema>;
export const CreateWaybillValidator = zodResolver(createWaybillSchema);
