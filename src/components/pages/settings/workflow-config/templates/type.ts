import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { QuestionType } from "@/lib";

const CreateTemplateSchema = z.object({
  name: z.string().min(1, "name is required"),
  type: z.object({
    value: z.string().min(1, "Type is required"),
    label: z.string().min(1, "Type is required"),
  }),
  // sections: z
  //   .array(
  //     z.object({
  //       name: z.string().min(1, "Section name is required"),
  //       questions: z.array(z.string()).optional().default([]), // Array of question IDs
  //     })
  //   )
  //   .min(1, "At least one section is required"),
});

export type TemplateRequestDto = z.infer<typeof CreateTemplateSchema>;
export const CreateTemplateValidator = zodResolver(CreateTemplateSchema);

export interface QuestionsProps {
  questionId: string;
  required?: boolean;
  name: string;
  type: string;
  options: { name: string }[];
}

export interface templateQuestions {
  id: string;
  required?: boolean;
  label: string;
  type: QuestionType;
  options: { name: string }[];
  description?: string;
}

export interface TemplateSection {
  id: string; // Temporary ID for React keys
  name: string;
  description?: string;
  questions: templateQuestions[];
}
