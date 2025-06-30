// import { z } from "zod";

// const MAX_FILE_SIZE = 5 * 1024 * 1024;

// const allowedMimeTypes = [
//   "application/vnd.ms-excel",
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// ];

// export const imageValidationSchema = z.any().refine(
//   (image: Blob[] | FileList) => {
//     // If it's an array of blobs, validate each blob
//     if (Array.isArray(image)) {
//       return image.every(
//         (blob) =>
//           z
//             .instanceof(Blob)
//             .refine((blob) => allowedMimeTypes.includes(blob.type), {
//               message: "Only Excel files (xls, xlsx) under 5MB are allowed",
//             })
//             .safeParse(blob).success,
//       );
//     }

//     // If it's a FileList, validate each file
//     if (image instanceof FileList) {
//       return Array.from(image).every(
//         (file) =>
//           z
//             .instanceof(File)
//             .refine((file) => allowedMimeTypes.includes(file.type), {
//               message: "Only Excel files (xls, xlsx) under 5MB are allowed",
//             })
//             .safeParse(file).success,
//       );
//     }

//     return false; // If none of the above conditions are satisfied
//   },
//   {
//     message: "Invalid file. Please upload a valid file (XLS, XLSX)",
//   },
// );

// export const AttendanceReportSchema = z.object({
//   file: imageValidationSchema,
// });

// export type AttendanceReportDto = z.infer<typeof AttendanceReportSchema>;

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

const allowedMimeTypes = [
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
];

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

export const AttendanceReportSchema = z.object({
  file: imageValidationSchema,
});

export type AttendanceReportDto = z.infer<typeof AttendanceReportSchema>;
