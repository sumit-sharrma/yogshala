"use client";

import { QuestionOption } from "@/lib/types";

interface AgreementProps {
  options?: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name: string;
}

export default function Agreement({ options, value, onChange, onBlur, name }: AgreementProps) {
  return (
    <div className="space-y-2">
      {options?.map((option) => (
        <label
          key={option.value}
          className={`flex items-start p-3 rounded-lg border cursor-pointer transition-colors ${
            value === option.value
              ? "border-pine-700 bg-pine-050"
              : "border-hairline hover:border-ink-faint/50"
          }`}
        >
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            onBlur={onBlur}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded border-2 mr-3 mt-0.5 flex-shrink-0 flex items-center justify-center ${
              value === option.value
                ? "border-pine-700 bg-pine-700"
                : "border-ink-faint"
            }`}
          >
            {value === option.value && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-ink">{option.label}</span>
        </label>
      ))}
    </div>
  );
}