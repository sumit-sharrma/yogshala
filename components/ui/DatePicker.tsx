"use client";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  onEnter?: () => void;
}

export default function DatePicker({ value, onChange, onBlur, autoFocus, onEnter }: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          e.preventDefault();
          onEnter();
        }
      }}
      autoFocus={autoFocus}
      className="w-full px-4 py-3 rounded-lg border bg-surface border-hairline focus:border-clay-600 focus:ring-2 focus:ring-clay-600/15 outline-none transition-colors text-sm"
    />
  );
}