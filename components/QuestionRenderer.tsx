"use client";

import { Question, FormData } from "@/lib/types";
import { isNodeVisible } from "@/lib/visibility";
import RadioGroup from "./ui/RadioGroup";
import MultiSelect from "./ui/MultiSelect";
import Slider from "./ui/Slider";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import DatePicker from "./ui/DatePicker";
import Agreement from "./ui/Agreement";

interface QuestionRendererProps {
  question: Question;
  formData: FormData;
  onChange: (id: string, value: string | number | string[]) => void;
  onBlur?: (id: string) => void;
  error?: string;
}

function isQuestionVisible(question: Question, formData: FormData): boolean {
  return isNodeVisible(question, formData);
}

export default function QuestionRenderer({ question, formData, onChange, onBlur, error }: QuestionRendererProps) {
  if (!isQuestionVisible(question, formData)) return null;

  const currentValue = formData[question.id];
  const blur = () => onBlur?.(question.id);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {question.label}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {question.type === "text" && (
        <TextInput
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
          placeholder={question.placeholder}
        />
      )}

      {question.type === "textarea" && (
        <TextArea
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
          placeholder={question.placeholder}
        />
      )}

      {question.type === "number" && (
        <TextInput
          value={(currentValue as number)?.toString() || ""}
          onChange={(v) => onChange(question.id, Number(v))}
          onBlur={blur}
          type="number"
          placeholder={question.placeholder}
        />
      )}

      {question.type === "single-select" && question.options && (
        <RadioGroup
          options={question.options}
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
          name={question.id}
        />
      )}

      {question.type === "multi-select" && question.options && (
        <MultiSelect
          options={question.options}
          value={(currentValue as string[]) || []}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
        />
      )}

      {question.type === "slider" && (
        <Slider
          value={(currentValue as number) ?? question.min ?? 0}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
          min={question.min ?? 0}
          max={question.max ?? 10}
          step={question.step ?? 1}
        />
      )}

      {question.type === "date" && (
        <DatePicker
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          onBlur={blur}
        />
      )}

      {question.type === "agree" && (
        <div>
          {question.description && (
            <div className="max-h-48 overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 text-xs text-gray-600 whitespace-pre-line leading-relaxed">
              {question.description}
            </div>
          )}
          <Agreement
            name={question.id}
            options={question.options}
            value={(currentValue as string) || ""}
            onChange={(v) => onChange(question.id, v)}
            onBlur={blur}
          />
        </div>
      )}

      {error && (
        <p className="mt-2 flex items-center text-sm text-red-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export { isQuestionVisible };
