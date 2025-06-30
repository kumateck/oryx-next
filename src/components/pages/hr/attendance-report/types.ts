import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const AttendanceReportSchema = z.object({
  file: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Please upload a file",
    })
    .refine((fileList) => fileList.length > 0, {
      message: "No file selected",
    })
    .refine(
      (fileList) => {
        return Array.from(fileList).every(
          (file) =>
            ACCEPTED_FILE_TYPES.includes(file.type) &&
            file.size <= MAX_FILE_SIZE,
        );
      },
      {
        message: "Only Excel files (xls, xlsx) under 5MB are allowed",
      },
    ),
});

export type AttendanceReportDto = z.infer<typeof AttendanceReportSchema>;
