"use client";

import { QuestionOption } from "@/lib/types";

interface RadioGroupProps {
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name: string;
}

export default function RadioGroup({ options, value, onChange, onBlur, name }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
            value === option.value
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            onBlur={onBlur}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
              value === option.value ? "border-emerald-600" : "border-gray-300"
            }`}
          >
            {value === option.value && (
              <div className="w-2 h-2 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
