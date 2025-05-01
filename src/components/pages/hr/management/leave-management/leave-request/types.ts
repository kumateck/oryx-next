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

export const CreateLeaveSchema = z.object({
  leaveTypeId: z.object(
    {
      value: z.string().min(1, { message: "Leave type is required" }),
      label: z.string(),
    },
    {
      message: "Leave type is required",
    },
  ),
  startDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a valid date",
    }),
  ),
  endDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "End date is required",
      invalid_type_error: "End date must be a valid date",
    }),
  ),
  employeeId: z.object(
    {
      value: z.string().min(1, { message: "Staff name is required" }),
      label: z.string(),
    },
    {
      message: "Staff name is required",
    },
  ),
  leaveCategory: z.object(
    {
      value: z.string().min(1, { message: "Leave Category is required" }),
      label: z.string(),
    },
    {
      message: "Leave Category is required",
    },
  ),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactPersonNumber: z
    .string()
    .min(1, { message: "Contact Person's Number is required" }),
  attachments: imageValidationSchema.optional(),
});

export type LeaveRequestDto = z.infer<typeof CreateLeaveSchema>;
export const CreateLeaveValidator = zodResolver(CreateLeaveSchema);
