import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { QuestionType } from "@/lib";

export const QuestRequestSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Question is required"),
  type: z.object({
    value: z.string().min(1, "Type is required"),
    label: z.string().min(1, "Type is required"),
  }),
  isMultiSelect: z.boolean().optional(),
  options: z
    .array(z.object({ name: z.string().min(1, "Option cannot be empty") }))
    .optional(),
});

const QuestionSchema = QuestRequestSchema.superRefine((data, ctx) => {
  const { type, options } = data;

  // Conditional validation: if type is "Multiple Choice" or "Checkboxes", options must be present
  if (
    (Number(type.value) === QuestionType.SingleChoice ||
      Number(type.value) === QuestionType.Checkbox ||
      Number(type.value) === QuestionType.Dropdown) &&
    (!options || options.length === 0)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["options"],
      message: "At least one option is required for this question type",
    });
  }

  // If the type is not "Multiple Choice" or "Checkboxes", make sure options are an empty array
  if (
    Number(type.value) !== QuestionType.SingleChoice &&
    Number(type.value) !== QuestionType.Checkbox &&
    Number(type.value) !== QuestionType.Dropdown
  ) {
    data.options = [];
  }
});

export type QuestionRequestDto = z.infer<typeof QuestRequestSchema>;
export const CreateQuestionValidator = zodResolver(QuestionSchema);
