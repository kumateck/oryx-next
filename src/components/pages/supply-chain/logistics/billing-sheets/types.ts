import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const allowedMimeTypes = [
  "image/png",
  "image/jpeg", // covers both JPG and JPEG
  "image/webp",
  "application/pdf",
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
];

const imageValidationSchema = z.any().refine(
  (image: Blob[] | FileList) => {
    // If it's an array of blobs, validate each blob
    if (Array.isArray(image)) {
      return image.every(
        (blob) =>
          z
            .instanceof(Blob)
            .refine((blob) => allowedMimeTypes.includes(blob.type), {
              message:
                "All attachments must be valid files (PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX)",
            })
            .safeParse(blob).success,
      );
    }

    // If it's a FileList, validate each file
    if (image instanceof FileList) {
      return Array.from(image).every(
        (file) =>
          z
            .instanceof(File)
            .refine((file) => allowedMimeTypes.includes(file.type), {
              message:
                "All attachments must be valid files (PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX)",
            })
            .safeParse(file).success,
      );
    }

    return false; // If none of the above conditions are satisfied
  },
  {
    message:
      "Invalid file. Please upload a valid file (PNG, JPG, JPEG, WEBP, PDF, DOC, DOCX, XLSX)",
  },
);

export const AttachInvoiceSchema = z.object({
  attachments: imageValidationSchema,
});

export const billingSheetChargesRequestSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
  cost: z.string().min(1, { message: "Description is required" }),
});

export type ChargesRequestDto = z.infer<
  typeof billingSheetChargesRequestSchema
>;

export const createBillingSheetRequestSchema = z.object({
  code: z.string().optional(),
  billOfLading: z.string().min(1, { message: "Bill of Lading is required" }),
  expectedArrivalDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expected Start Date is required",
      invalid_type_error: "Expected Start Date must be a valid date",
    }),
  ),
  containerSize: z.string().min(1, { message: "Container size is required" }),
  numberOfPackages: z
    .string()
    .min(1, { message: "Container size is required" }),
  freeTimeDuration: z
    .string()
    .min(1, { message: "Free Time Duration is required" }),
  freeTimeExpiryDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Free Time Expiry Date is required",
      invalid_type_error: "Free Time Expiry Date must be a valid date",
    }),
  ),
  demurrageStartDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Demurrage Start Date is required",
      invalid_type_error: "Demurrage Start Date must be a valid date",
    }),
  ),
  invoiceId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  supplierId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  uom: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measure is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measure is required",
    },
  ),
  charges: z.array(billingSheetChargesRequestSchema),
  attachments: imageValidationSchema,
});

export type BillingSheetRequestDto = z.infer<
  typeof createBillingSheetRequestSchema
>;
export const CreateBillingSheetValidator = zodResolver(
  createBillingSheetRequestSchema,
);
