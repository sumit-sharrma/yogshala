"use client";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export default function DatePicker({ value, onChange, onBlur }: DatePickerProps) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors text-sm"
    />
  );
}
