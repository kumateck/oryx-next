import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { IdSchema } from "@/lib";

// import { ScheduleType } from "@/lib";

export const associateProductRequestSchema = z.object({
  // uom: z.string().optional(),
  // productId: IdSchema("Product"),
  sizeType: z.object(
    {
      value: z.string().min(1, { message: "Batch Size Type is required" }),
      label: z.string(),
    },
    {
      message: `Batch Size Type is required`,
    },
  ),
  productId: z.object(
    {
      value: z.string().min(1, { message: "Product is required" }),
      label: z.string(),
    },
    {
      message: `Product is required`,
    },
  ),
  // quantity: z.number().min(0.1, { message: "Quantity is required" }),
});

export const itemsRequestSchema = z.array(associateProductRequestSchema);

// Define the CreateScheduleRequest schema
export const createScheduleRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),

  remarks: z.string().optional(),
  products: z.array(associateProductRequestSchema),
  scheduledStartTime: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Scheduled Start Date is required",
      invalid_type_error: "Scheduled Start Date must be a valid date",
    }),
  ),
  scheduledEndTime: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Scheduled End Date is required",
      invalid_type_error: "Scheduled End Date must be a valid date",
    }),
  ),
});

export type ScheduleRequestDto = z.infer<typeof createScheduleRequestSchema>;

export type ProductRequestDto = z.infer<typeof associateProductRequestSchema>;

export const CreateScheduleValidator = zodResolver(createScheduleRequestSchema);

// ScheduleType?: ScheduleType;
// comments?: string | null;
// items?: CreateScheduleItemRequest[] | null;
