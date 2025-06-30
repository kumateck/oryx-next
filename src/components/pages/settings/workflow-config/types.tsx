import { QuestionType } from "@/lib";

// Define a type for the "type" object
interface Type {
  id: string;
  name: QuestionType;
  title: string;
}

// Option interface for dropdown and multiple-choice questions
interface QuestionOption {
  name: string;
}

// Question interface for individual questions
export interface Question {
  id: string;
  label: string;
  typeId: string;
  type: Type;
  validation: number;
  questionOptions?: QuestionOption[]; // Options will be present for dropdown and multiple choice
  questionTags?: string[] | null;
  tags: string[];
}

// FormField interface for form fields within a section
interface FormField {
  id: string;
  question: Question;
  required: boolean;
  rank: number;
}

// Section interface for a section of form fields
interface Section {
  id: string;
  title?: string | null;
  description?: string | null;
  formFields: FormField[];
}

// FormType interface for the type of the form
interface FormType {
  id: string;
  name: string;
  isDisabled: boolean;
}

// Main Form interface
export interface FormTemplate {
  id: string;
  name: string;
  sections: Section[];
  formType: FormType;
  createdAt: string; // ISO date string
}
