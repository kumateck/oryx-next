import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const allowedMimeTypes = [
  "image/png",
  "image/jpeg", // covers both JPG and JPEG
  "image/webp",
  "application/pdf",
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
];

export const imageValidationSchema = z.any().refine(
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

const createMemoSchema = z.object({
  body: z.array(
    z.object({
      itemId: z.string().min(2, { message: "Item is required" }),
      marketRequisitionVendorId: z
        .string()
        .min(2, { message: "Market Requisition Vendor is required" }),
      quantity: z.number().min(0, { message: "Quantity is required" }),
      uoMId: z.string().min(2, { message: "UoM is required" }),
      vendorQuotationItemId: z
        .string()
        .min(2, { message: "Vendor Quotation is required" }),
      totalValue: z.number().min(0, { message: "Total Value is required" }),
      termsOfPayment: z.string(),
      date: z.date().refine(
        (date) => {
          const today = new Date();
          return date >= today;
        },
        {
          message: "Date must be today or in the future",
        },
      ),
    }),
  ),
  attachments: imageValidationSchema,
});

export type CreateMemoSchema = z.infer<typeof createMemoSchema>;
export const CreateMemoSchemaValidator = zodResolver(createMemoSchema);
