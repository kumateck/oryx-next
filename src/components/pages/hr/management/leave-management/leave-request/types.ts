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
    leaveTypeId: z.object(
      {
        value: z.string().min(1, { message: "Leave type is required" }),
        label: z.string(),
      },
      { required_error: "Leave type is required" },
    ),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }),
    employeeId: z.object(
      {
        value: z.string().min(1, { message: "Staff name is required" }),
        label: z.string(),
      },
      { required_error: "Staff name is required" },
    ),
    leaveCategory: z.string().optional(),
    contactPerson: z.string().min(1, { message: "Contact person is required" }),
    contactPersonNumber: z
      .string()
      .min(1, { message: "Contact person phone is required" }),
    attachments: imageValidationSchema.optional(),
    justification: z.string().optional(),
    destination: z.string().min(1, { message: "Designation is required" }),
  })
  .refine(
    (data) =>
      data.leaveCategory !== LeaveCategories.OfficialDutyRequest.toString() ||
      data.leaveCategory !== LeaveCategories.ExitPassRequest.toString(),
    {
      message: "Destination is required",
      path: ["destination"],
    },
  )
  .refine(
    (data) =>
      data.leaveCategory !== LeaveCategories.OfficialDutyRequest.toString() ||
      data.leaveCategory !== LeaveCategories.ExitPassRequest.toString(),
    {
      message: "Contact person is required",
      path: ["contactPerson"],
    },
  )
  .refine(
    (data) =>
      data.leaveCategory !== LeaveCategories.OfficialDutyRequest.toString() ||
      data.leaveCategory !== LeaveCategories.ExitPassRequest.toString(),
    {
      message: "Contact person phone number is required",
      path: ["contactPersonNumber"],
    },
  )
  .refine(
    (data) =>
      data.leaveCategory !== LeaveCategories.OfficialDutyRequest.toString() ||
      data.leaveCategory !== LeaveCategories.ExitPassRequest.toString(),
    {
      message: "Start date is required",
      path: ["startDate"],
    },
  )
  .refine(
    (data) =>
      data.leaveCategory !== LeaveCategories.OfficialDutyRequest.toString(),
    {
      message: "End date is required",
      path: ["endDate"],
    },
  );
export type LeaveRequestDto = z.infer<typeof CreateLeaveSchema>;
export const CreateLeaveValidator = zodResolver(CreateLeaveSchema);
