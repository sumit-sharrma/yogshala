"use client";

import { QuestionOption } from "@/lib/types";

interface MultiSelectProps {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
}

export default function MultiSelect({ options, value, onChange, onBlur }: MultiSelectProps) {
  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
            value.includes(option.value)
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="checkbox"
            checked={value.includes(option.value)}
            onChange={() => toggle(option.value)}
            onBlur={onBlur}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
              value.includes(option.value)
                ? "border-emerald-600 bg-emerald-600"
                : "border-gray-300"
            }`}
          >
            {value.includes(option.value) && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
