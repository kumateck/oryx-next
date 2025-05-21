import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const AttendanceReportSchema = z.object({
  File: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "File must be less than 5MB",
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Unsupported file type. Only Excel is allowed.",
    }),
});

export type AttendanceReportDto = z.infer<typeof AttendanceReportSchema>;
export const AttendanceReportValidator = zodResolver(AttendanceReportSchema);
