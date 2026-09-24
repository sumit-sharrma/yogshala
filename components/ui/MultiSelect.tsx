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
    <div className="flex flex-wrap gap-2" onBlur={onBlur}>
      {options.map((option) => {
        const selected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(option.value)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-clay-600/20 ${
              selected
                ? "border-pine-700 bg-pine-700 text-white"
                : "border-hairline bg-surface text-ink-soft hover:border-pine-700 hover:text-ink"
            }`}
          >
            {selected && (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}