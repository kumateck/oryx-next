import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const materialWeightsRequestSchema = z
  .object({
    srNumber: z.string().optional(),
    grossWeight: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        (!data.srNumber && !data.grossWeight) ||
        (!!data.srNumber && !!data.grossWeight)
      );
    },
    {
      message: "Both SR Number and Gross Weight must be provided together",
      path: ["srNumber"],
    },
  );

export const checklistDetailsRequestSchema = z.object({
  numberOfContainers: z.string(),
  numberOfContainersUom: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  quantityPerContainer: z
    .string()
    .min(1, { message: "Quantity per container is required" }),
  // uom: z.object(
  //   {
  //     value: z.string().min(1, { message: "Unit of Measurement is required" }),
  //     label: z.string(),
  //   },
  //   {
  //     message: "Unit of Measurement is required",
  //   },
  // ),
  expiryDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expiry date is required",
      invalid_type_error: "Expiry date must be a valid date",
    }),
  ),
  manufacturingDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Manufacturing date is required",
      invalid_type_error: "Manufacturing date must be a valid date",
    }),
  ),
  retestDate: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date({
        required_error: "Restest date is required",
        invalid_type_error: "Restest date must be a valid date",
      }),
    )
    .optional(),
  weights: z
    .array(materialWeightsRequestSchema)
    .refine(
      (weights) => weights.some((w) => w.srNumber && w.grossWeight),
      "At least one SR Number and Gross Weight pair is required",
    ),
});

export const CreateChecklistSchema = z.object({
  materialName: z
    .string({ required_error: "Material name is required" })
    .min(1, {
      message: "Material name is required",
    }),
  // supplierStatus:  z
  //   .number({ required_error: "Supplier Status is required" })
  //   .min(1, {
  //     message: "Supplier Status is required",
  //   }),
  materialId: z.string().optional(),
  manufacturerId: z.string().optional(),
  supplierStatusId: z.number().optional(),
  materialKind: z.number().optional(),
  shipmentInvoiceId: z.string().optional(),
  supplierId: z.string().optional(),
  supplierStatus: z.string().optional(),
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid date",
    }),
  ),
  certificateOfAnalysisDelivered: z.object(
    {
      value: z
        .string()
        .min(1, { message: "Certificate Delivery Status is required" }),
      label: z.string(),
    },
    {
      message: "Certificate Delivery Status is required",
    },
  ),
  invoiceNumber: z
    .string({ required_error: "Invoice number is required" })
    .min(1, {
      message: "Invoice number is required",
    }),
  conditionOfConsignmentCarrier: z.object(
    {
      value: z
        .string()
        .min(1, { message: "Condition of consignment carrier is required" }),
      label: z.string(),
    },
    {
      message: "Condition of consignment carrier is required",
    },
  ),
  supplierName: z
    .string({
      required_error: "Supplier Name is required",
    })
    .min(1, {
      message: "Supplier Name is required",
    }),
  visibleLabelingOfContainers: z.object(
    {
      value: z
        .string()
        .min(1, { message: "Visible labelling Status is required" }),
      label: z.string(),
    },
    {
      message: "Visible labelling Status is required",
    },
  ),
  manufacturerName: z
    .string({
      required_error: "Manufacturer Name is required",
    })
    .min(1, {
      message: "Manufacturer Name is required",
    }),
  intactnessOfContainers: z.object(
    {
      value: z
        .string()
        .min(1, { message: "Intactness of Containers Status is required" }),
      label: z.string(),
    },
    {
      message: "Intactness of Containers Status is required",
    },
  ),
  details: z.array(checklistDetailsRequestSchema).min(1, {
    message: "Packaging Material details must be added",
  }),
});

export type ChecklistRequestDto = z.infer<typeof CreateChecklistSchema>;
export type ChecklistDetailsDto = z.infer<typeof checklistDetailsRequestSchema>;
export const CreateProductValidator = zodResolver(CreateChecklistSchema);
