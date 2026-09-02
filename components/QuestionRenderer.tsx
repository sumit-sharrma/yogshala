"use client";

import { Question, FormData } from "@/lib/types";
import RadioGroup from "./ui/RadioGroup";
import MultiSelect from "./ui/MultiSelect";
import Slider from "./ui/Slider";
import TextInput from "./ui/TextInput";
import TextArea from "./ui/TextArea";
import DatePicker from "./ui/DatePicker";

interface QuestionRendererProps {
  question: Question;
  formData: FormData;
  onChange: (id: string, value: string | number | string[]) => void;
}

function isQuestionVisible(question: Question, formData: FormData): boolean {
  if (!question.dependsOn) return true;

  const { questionId, value } = question.dependsOn;
  const answer = formData[questionId];

  if (Array.isArray(answer)) {
    if (Array.isArray(value)) {
      return value.some((v) => answer.includes(v));
    }
    return answer.includes(value);
  }

  if (Array.isArray(value)) {
    return value.includes(answer as string);
  }

  return answer === value;
}

export default function QuestionRenderer({ question, formData, onChange }: QuestionRendererProps) {
  if (!isQuestionVisible(question, formData)) return null;

  const currentValue = formData[question.id];

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
          placeholder={question.placeholder}
        />
      )}

      {question.type === "textarea" && (
        <TextArea
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          placeholder={question.placeholder}
        />
      )}

      {question.type === "number" && (
        <TextInput
          value={(currentValue as number)?.toString() || ""}
          onChange={(v) => onChange(question.id, Number(v))}
          type="number"
          placeholder={question.placeholder}
        />
      )}

      {question.type === "single-select" && question.options && (
        <RadioGroup
          options={question.options}
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
          name={question.id}
        />
      )}

      {question.type === "multi-select" && question.options && (
        <MultiSelect
          options={question.options}
          value={(currentValue as string[]) || []}
          onChange={(v) => onChange(question.id, v)}
        />
      )}

      {question.type === "slider" && (
        <Slider
          value={(currentValue as number) ?? question.min ?? 0}
          onChange={(v) => onChange(question.id, v)}
          min={question.min ?? 0}
          max={question.max ?? 10}
          step={question.step ?? 1}
        />
      )}

      {question.type === "date" && (
        <DatePicker
          value={(currentValue as string) || ""}
          onChange={(v) => onChange(question.id, v)}
        />
      )}
    </div>
  );
}

export { isQuestionVisible };
