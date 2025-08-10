import { LeaveCategories } from "@/lib";
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

export const CreateLeaveSchema = z
  .object({
    leaveTypeId: z
      .object(
        {
          value: z.string().min(1, { message: "Leave type is required" }),
          label: z.string(),
        },
        { required_error: "Leave type is required" },
      )
      .optional(),
    startDate: z.preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a valid date",
      }),
    ),
    endDate: z.preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z
        .date({
          invalid_type_error: "End date must be a valid date",
        })
        .optional(),
    ),
    employeeId: z.object(
      {
        value: z.string().min(1, { message: "Staff name is required" }),
        label: z.string(),
      },
      { required_error: "Staff name is required" },
    ),
    leaveCategory: z
      .object(
        {
          value: z.string(),
          label: z.string(),
        },
        { required_error: "Leave Category is required" },
      )
      .optional(),
    contactPerson: z.string().optional(),
    contactPersonNumber: z.string().optional(),
    attachments: imageValidationSchema.optional(),
    justification: z.string().optional(),
    destination: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isExitPass =
      data?.leaveCategory?.value === String(LeaveCategories.ExitPassRequest);

    if (!isExitPass) {
      if (!data.leaveTypeId?.value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Leave type is required",
          path: ["leaveTypeId"],
        });
      }

      if (!data.endDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date is required",
          path: ["endDate"],
        });
      }

      if (
        !data.contactPerson &&
        data.leaveCategory?.value !== String(LeaveCategories.OfficialDuty)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contact person is required",
          path: ["contactPerson"],
        });
      }

      if (
        !data.contactPersonNumber &&
        data.leaveCategory?.value !== String(LeaveCategories.OfficialDuty)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Contact person number is required",
          path: ["contactPersonNumber"],
        });
      }
    }
  });

export type LeaveRequestDto = z.infer<typeof CreateLeaveSchema>;
export const CreateLeaveValidator = zodResolver(CreateLeaveSchema);
