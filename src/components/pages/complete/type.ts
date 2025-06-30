import { z } from "zod";

import { QuestionType } from "@/lib";
import {
  FormFieldDto,
  FormSectionDto,
} from "@/lib/redux/api/openapi.generated";

// File validation configuration
const allowedMimeTypes = [
  "image/png",
  "image/jpeg", // covers both JPG and JPEG
  "image/webp",
  "application/pdf",
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
];

// File validation schema
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

// Helper function to get question type title for error messages
const getQuestionTypeTitle = (type: QuestionType): string => {
  const typeMap = {
    [QuestionType.ShortAnswer]: "Short Answer",
    [QuestionType.LongAnswer]: "Long Answer",
    [QuestionType.Paragraph]: "Paragraph",
    [QuestionType.Datepicker]: "Date",
    [QuestionType.SingleChoice]: "Single Choice",
    [QuestionType.Dropdown]: "Dropdown",
    [QuestionType.Checkbox]: "Checkbox",
    [QuestionType.FileUpload]: "File Upload",
    [QuestionType.Signature]: "Signature",
    [QuestionType.Reference]: "Reference",
    [QuestionType.Formular]: "Formula",
  };
  return typeMap[type] || "Field";
};

// Build validation schema for a single form field
const buildFieldSchema = (field: FormFieldDto): z.ZodTypeAny => {
  const questionType = field.question?.type;
  const fieldId = field.question?.id;
  const isRequired = field.required;
  const typeTitle = getQuestionTypeTitle(questionType as QuestionType);

  if (!questionType || !fieldId) {
    return z.any().optional();
  }

  switch (questionType) {
    case QuestionType.FileUpload:
      return isRequired
        ? imageValidationSchema
        : imageValidationSchema.optional();

    case QuestionType.Signature:
      return isRequired
        ? z
            .string({
              required_error: "Signature is required",
              message: "Signature is required",
            })
            .min(1, { message: "Signature is required" })
        : z.string().optional();

    case QuestionType.Datepicker:
      return isRequired
        ? z
            .date({
              required_error: "Date is required",
              message: "Date is required",
            })
            .refine((date) => date !== null && date !== undefined, {
              message: "Date is required",
            })
        : z.date().optional();

    case QuestionType.Checkbox:
      return isRequired
        ? z
            .array(
              z
                .string({
                  required_error: `${typeTitle} is required`,
                  message: `${typeTitle} is required`,
                })
                .min(1, { message: "Select at least one option" }),
            )
            .min(1, {
              message: "Select at least one option",
            })
        : z.array(z.string().optional()).optional();

    case QuestionType.Formular:
      return isRequired
        ? z
            .string({
              required_error: `${typeTitle} is required`,
              message: `${typeTitle} is required`,
            })
            .min(1, { message: "Select at least one option" })
        : z.string().optional().optional();

    case QuestionType.Dropdown:
      return isRequired
        ? z.object(
            {
              value: z
                .string({
                  required_error: `${typeTitle} is required`,
                  message: `${typeTitle} is required`,
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

    case QuestionType.SingleChoice:
      return isRequired
        ? z
            .string({
              required_error: `${typeTitle} is required`,
              message: `${typeTitle} is required`,
            })
            .min(1, { message: "Select an option" })
        : z.string().optional();

    // case QuestionType.ShortAnswer:
    case QuestionType.LongAnswer:
    case QuestionType.Paragraph:
    case QuestionType.Reference:
    default:
      return isRequired
        ? z
            .string({
              required_error: `${typeTitle} is required`,
              message: `${typeTitle} is required`,
            })
            .min(1, { message: `${typeTitle} is required` })
        : z.string().optional();
  }
};

// Main function to build schema from sections
export const buildSchema = (sections?: FormSectionDto[] | null) => {
  if (!sections || sections.length === 0) {
    return z.object({});
  }

  const shape = sections.reduce(
    (acc, section) => {
      if (!section.fields) return acc;

      section.fields.forEach((field) => {
        const fieldId = field.question?.id;
        if (fieldId) {
          acc[fieldId] = buildFieldSchema(field);
        }
      });

      return acc;
    },
    {} as Record<string, z.ZodTypeAny>,
  );

  return z.object(shape);
};

// Type inference for form values
export type FormValues = z.infer<ReturnType<typeof buildSchema>>;

// Optional: Helper function to get all field IDs from sections
export const getFieldIds = (sections?: FormSectionDto[] | null): string[] => {
  if (!sections) return [];

  return sections.reduce((acc: string[], section) => {
    if (section.fields) {
      const sectionFieldIds = section.fields
        .map((field) => field.question?.id)
        .filter(Boolean) as string[];
      acc.push(...sectionFieldIds);
    }
    return acc;
  }, []);
};

// Optional: Helper function to get field by ID
export const getFieldById = (
  sections?: FormSectionDto[] | null,
  fieldId?: string,
): FormFieldDto | undefined => {
  if (!sections || !fieldId) return undefined;

  for (const section of sections) {
    if (section.fields) {
      const field = section.fields.find((f) => f.question?.id === fieldId);
      if (field) return field;
    }
  }
  return undefined;
};
