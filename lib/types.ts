export type QuestionType =
  | "text"
  | "textarea"
  | "number"
  | "single-select"
  | "multi-select"
  | "slider"
  | "date";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  dependsOn?: {
    questionId: string;
    value: string | string[];
  };
}

export interface FormSection {
  id: string;
  title: string;
  subtitle?: string;
  questions: Question[];
}

export type FormData = Record<string, string | number | string[]>;
