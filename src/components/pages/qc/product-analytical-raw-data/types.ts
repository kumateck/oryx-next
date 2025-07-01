import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export enum Stage {
  intermediate = 0,
  bulk = 1,
  finished = 2,
}

export const stageLabels = {
  [Stage.intermediate]: "Intermediate",
  [Stage.bulk]: "Bulk",
  [Stage.finished]: "Finished",
} as const;

export const stageValues = {
  intermediate: 0,
  bulk: 1,
  finished: 2,
} as const;

export type StageLabel = keyof typeof stageValues;

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

export const ProductArdSchema = z.object({
  stpId: z.object(
    {
      value: z.string().min(1, { message: "Meterial is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  formId: z.object(
    {
      value: z.string().min(1, { message: "form is required" }),
      label: z.string(),
    },
    {
      message: "Form is required",
    },
  ),
  stage: z.object(
    {
      value: z.nativeEnum(stageValues, {
        message: "Stage is required",
      }),
      label: z.string(),
    },
    {
      message: "Stage is required",
    },
  ),
  description: z.string().optional(),
  specNumber: z
    .string()
    .min(1, { message: "Specification number is required" }),
  attachments: imageValidationSchema.optional(),
});

export type ProductArdSchemaType = z.infer<typeof ProductArdSchema>;
export const ProductArdSchemaResolver = zodResolver(ProductArdSchema);

export const stageOptions = [
  {
    value: Stage.intermediate as unknown as string,
    label: "Intermediate",
  },
  { value: Stage.bulk as unknown as string, label: "Bulk" },
  { value: Stage.finished as unknown as string, label: "Finished" },
];
