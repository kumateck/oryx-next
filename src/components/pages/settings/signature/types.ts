import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const tabsStyles =
  "h-9 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:font-Bold data-[state=active]:text-primary-default data-[state=active]:shadow-none";
export const SIGNATURE_TABS = {
  SIGNATURE: "Draw",
  TEXT: "Type",
  ATTATCHMENT: "Upload",
} as const;

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

const SignatureSchema = z.object({
  signature: z.string().min(1, { message: "Signature is required" }),
  attatchment: imageValidationSchema.optional(),
  text: z.string().optional(),
});
export type SignatureSchemaType = z.infer<typeof SignatureSchema>;
export const CreateSignatureValidator = zodResolver(SignatureSchema);
export type SignatureTab = keyof typeof SIGNATURE_TABS;
