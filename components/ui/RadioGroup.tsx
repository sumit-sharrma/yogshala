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
              ? "border-pine-700 bg-pine-050"
              : "border-hairline hover:border-ink-faint/50"
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
              value === option.value ? "border-pine-700" : "border-ink-faint"
            }`}
          >
            {value === option.value && (
              <div className="w-2 h-2 rounded-full bg-pine-700" />
            )}
          </div>
          <span className="text-sm text-ink">{option.label}</span>
        </label>
      ))}
    </div>
  );
}