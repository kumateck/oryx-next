import { z } from "zod";
import { Question } from "../settings/workflow-config/types";
import { QuestionType } from "@/lib";

export type FormField = {
  id: string;
  question: Question;
  required: boolean;
  rank: number;
  name: QuestionType;
};
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

export const buildSchema = (inputs: FormField[]) => {
  // console.log(inputs, "inputs");
  const shape = inputs?.reduce(
    (acc, input) => {
      const { type } = input.question;
      const id = input.id;
      const isRequired = input.required;
      switch (type.name) {
        case QuestionType.FileUpload:
          acc[id] = isRequired
            ? imageValidationSchema
            : imageValidationSchema.optional();
          break;
        // case QuestionType.Time:
        //   acc[id] = isRequired
        //     ? z
        //         .string({
        //           required_error: "Time is required",
        //           message: "Time is required",
        //         })
        //         .min(1, { message: "Time is required" })
        //     : z.string().optional();
        //   break;
        case QuestionType.Signature:
          acc[id] = isRequired
            ? z
                .string({
                  required_error: "Signature is required",
                  message: "Signature is required",
                })
                .min(1, { message: "Signature is required" })
            : z.string().optional();
          break;
        case QuestionType.Datepicker:
          acc[id] = isRequired
            ? z
                // .string().min(1, { message: "Date is required" })
                .date({
                  required_error: "Date is required",
                  message: "Date is required",
                })
                .refine((date) => date !== null && date !== undefined, {
                  message: "Date is required",
                })
            : z.date().optional();
          // string().optional();
          break;
        case QuestionType.Checkbox:
          acc[id] = isRequired
            ? z
                .array(
                  z
                    .string({
                      required_error: `${type.title} is required`,
                      message: `${type.title} is required`,
                    })
                    .min(1, { message: "Select at least one option" }),
                )
                .min(1, {
                  message: "Select at least one option",
                })
            : z.array(z.string().optional()).optional();
          break;
        case QuestionType.Formular:
          acc[id] = isRequired
            ? z
                .array(
                  z
                    .string({
                      required_error: `${type.title} is required`,
                      message: `${type.title} is required`,
                    })
                    .min(1, { message: "Select at least one option" }),
                )
                .min(1, {
                  message: "Select at least one option",
                })
            : z.array(z.string().optional()).optional();
          break;
        case QuestionType.Dropdown:
          acc[id] = isRequired
            ? z.object(
                {
                  value: z
                    .string({
                      required_error: `${type.title} is required`,
                      message: `${type.title} is required`,
                    })
                    .min(1, { message: "Select an option" }),
                  label: z.string(),
                },
                {
                  message: "Select an option",
                },
              )
            : z
                .object({
                  value: z.string().optional(),
                  label: z.string().optional(),
                })
                .optional();
          break;
        case QuestionType.SingleChoice:
          acc[id] = isRequired
            ? z
                .string({
                  required_error: `${type.title} is required`,
                  message: `${type.title} is required`,
                })
                .min(1, { message: "Select an option" })
            : z.string().optional();
          break;
        default:
          acc[id] = isRequired
            ? z
                .string({
                  required_error: `${type.title} is required`,
                  message: `${type.title} is required`,
                })
                .min(1, { message: `${type.title} is required` })
            : z.string().optional();
      }
      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );

  return z.object(shape);
};
export interface FormValues {
  [key: string]: any;
}

type FormResponseItem = {
  formFieldId: string;
  value: string | string[] | { [key: string]: any } | File | FileList;
};

export type Payload = {
  inspectionId: string;
  formId: string;
  formResponse: FormResponseItem[];
};

export function createFormData(payload: Payload): FormData {
  const formData = new FormData();

  // Append simple fields
  formData.append("inspectionId", payload.inspectionId);
  formData.append("formId", payload.formId);

  // Append formResponse fields
  payload.formResponse.forEach((response, index) => {
    formData.append(
      `formResponse[${index}][formFieldId]`,
      response.formFieldId,
    );

    const value = response.value;

    if (value instanceof File) {
      // Handle single File
      formData.append(`formResponse[${index}][value]`, value);
    } else if (value instanceof FileList) {
      // Handle FileList by iterating through each file
      Array.from(value).forEach((file, fileIndex) => {
        formData.append(`formResponse[${index}][value][${fileIndex}]`, file);
      });
    } else if (Array.isArray(value)) {
      // Handle array of values
      value.forEach((val, idx) => {
        formData.append(`formResponse[${index}][value][${idx}]`, String(val));
      });
    } else if (typeof value === "object" && value !== null) {
      // Handle objects with key-value pairs
      Object.entries(value).forEach(([subKey, subValue]) => {
        formData.append(
          `formResponse[${index}][value][${subKey}]`,
          String(subValue),
        );
      });
    } else {
      // Handle primitive values (e.g., strings, numbers)
      formData.append(`formResponse[${index}][value]`, String(value));
    }
  });

  return formData;
}
