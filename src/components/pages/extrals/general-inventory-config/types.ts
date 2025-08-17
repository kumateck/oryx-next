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
const inventoryConfigSchema = z.object({
  category: z.string().optional(),
  materialName: z.string().min(1, "Material name is required"),
  code: z.string().min(1, "Code is required"),
  storeType: z.string().min(1, "Store type is required"),
  unitOfMeasureId: z.object({
    value: z.string().min(1, "Unit of measure is required"),
    label: z.string(),
  }),
  isActive: z.boolean().default(true),
  description: z.string().optional(),
  classification: z.object(
    {
      value: z.string().min(1, "Classification is required"),
      label: z.string(),
    },
    {
      message: "Classification is required",
    },
  ),
  minimumLevel: z
    .number()
    .min(0, "Minimum level must be greater than or equal to 0"),
  maximumLevel: z
    .number()
    .min(0, "Maximum level must be greater than or equal to 0"),
  reorderLevel: z
    .number()
    .min(0, "Reorder level must be greater than or equal to 0"),
  attachments: imageValidationSchema.optional(),
});

export type CreateInventoryDto = z.infer<typeof inventoryConfigSchema>;
export const CreateInventoryValidator = zodResolver(inventoryConfigSchema);
