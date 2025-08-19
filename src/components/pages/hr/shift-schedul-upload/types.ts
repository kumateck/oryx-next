import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const allowedMimeTypes = [
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export type ShiftsReportSummary = {
  staffId: string;
  staffName: string;
  category: string;
  startDate: Date;
  endDate: string;
  shiftType: string;
  scheduleName: string;
  departmentName: string;
};

export const imageValidationSchema = z.any().refine(
  (image: Blob[] | FileList) => {
    const isValidFile = (file: Blob | File) =>
      allowedMimeTypes.includes(file.type) && file.size <= MAX_FILE_SIZE;

    if (Array.isArray(image)) {
      return image.every(isValidFile);
    }

    if (image instanceof FileList) {
      return Array.from(image).every(isValidFile);
    }

    return false;
  },
  {
    message: "Only Excel files (.xls, .xlsx) under 5MB are allowed",
  },
);

export const ShiftScheduleUploadSchema = z.object({
  file: imageValidationSchema,
  departmentId: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
  shiftScheduleId: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      message: "Shift schedule is require",
    },
  ),
});

export type ShiftScheduleUploadDto = z.infer<typeof ShiftScheduleUploadSchema>;
