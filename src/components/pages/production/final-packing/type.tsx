import { Units } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinalPackingSchema = z.object({
  numberOfBottlesPerShipper: z
    .number({
      required_error: "Number of Bottles per Shipper is required",
      invalid_type_error: "Number of Bottles per Shipper must be a number",
    })
    .positive({
      message: "Number of Bottles per Shipper must be greater than 0",
    }),
  nUmberOfFullShipperPacked: z
    .number({
      required_error: "Number of Full Shipper Packed is required",
      invalid_type_error: "Number of Full Shipper Packed must be a number",
    })
    .positive({
      message: "Number of Full Shipper Packed must be greater than 0",
    }),
  leftOver: z
    .number({
      required_error: "Left Over is required",
      invalid_type_error: "Left Over must be a number",
    })
    .nonnegative({ message: "Left Over cannot be negative" }),
  batchSize: z
    .number({
      required_error: "Batch Size is required",
      invalid_type_error: "Batch Size must be a number",
    })
    .positive({ message: "Batch Size must be greater than 0" }),
  averageVolumeFilledPerBottle: z
    .number({
      required_error: "Average Volume Filled Per Bottle is required",
      invalid_type_error: "Average Volume Filled Per Bottle must be a number",
    })
    .positive({
      message: "Average Volume Filled Per Bottle must be greater than 0",
    }),
  packSize: z
    .number({
      required_error: "Pack Size is required",
      invalid_type_error: "Pack Size must be a number",
    })
    .positive({ message: "Pack Size must be greater than 0" }),
  expectedYield: z
    .number({
      required_error: "Expected Yield is required",
      invalid_type_error: "Expected Yield must be a number",
    })
    .positive({ message: "Expected Yield must be greater than 0" }),
  yieldTotalQuantityPacked: z
    .number({
      required_error: "Total Quantity Packed is required",
      invalid_type_error: "Total Quantity Packed must be a number",
    })
    .positive({ message: "Total Quantity Packed must be greater than 0" }),
  totalQuantityPacked: z
    .number({
      required_error: "Total Quantity Packed is required",
      invalid_type_error: "Total Quantity Packed must be a number",
    })
    .positive({ message: "Total Quantity Packed must be greater than 0" }),
  qualityControlAnalyticalSample: z
    .number({
      required_error: "Quality Control Analytical Sample is required",
      invalid_type_error: "Quality Control Analytical Sample must be a number",
    })
    .nonnegative({
      message: "Quality Control Analytical Sample cannot be negative",
    }),
  retainedSamples: z
    .number({
      required_error: "Retained Samples is required",
      invalid_type_error: "Retained Samples must be a number",
    })
    .nonnegative({ message: "Retained Samples cannot be negative" }),
  stabilitySamples: z
    .number({
      required_error: "Stability Samples is required",
      invalid_type_error: "Stability Samples must be a number",
    })
    .nonnegative({ message: "Stability Samples cannot be negative" }),
  totalNumberOfBottles: z
    .number({
      required_error: "Total Number of Bottles is required",
      invalid_type_error: "Total Number of Bottles must be a number",
    })
    .positive({ message: "Total Number of Bottles must be greater than 0" }),
  totalGainOrLoss: z.number({
    required_error: "Total Gain or Loss is required",
    invalid_type_error: "Total Gain or Loss must be a number",
  }),
});

export type PackingRequestDto = z.infer<typeof CreateFinalPackingSchema>;
export const CreatePackingValidator = zodResolver(CreateFinalPackingSchema);

export interface MaterialMatrix {
  uoMId: string;
  uoMName: Units;
  materialId: string;
  materialName: string;
  receivedQuantity: number;
  subsequentDeliveredQuantity: number;
}

export const getMaterialSchema = (totalReceivedQuantity: number) =>
  z.object({
    receivedQuantity: z.number().nonnegative(), // Read-only
    subsequentDeliveredQuantity: z.number().nonnegative(),
    totalReceivedQuantity: z.number().nonnegative(), // Auto-calculated
    packedQuantity: z
      .number()
      .min(1, "Packed quantity must be greater than 0")
      .max(
        totalReceivedQuantity,
        "Packed quantity cannot exceed total received quantity",
      ),
    returnedQuantity: z.number().nonnegative(),
    rejectedQuantity: z.number().nonnegative(), // Auto-calculated
    sampledQuantity: z.number().nonnegative(),
    totalAccountedForQuantity: z.number().nonnegative(), // Auto-calculated
    percentageLoss: z.number().nonnegative(), // Auto-calculated
  });

export type GroupedData = {
  materialId: string;
  materialName: string;
  uoMId: string;
  uoMName: string;
  totalQty: number;
};
