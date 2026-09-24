"use client";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export default function TextArea({ value, onChange, onBlur, placeholder }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-lg border bg-surface border-hairline focus:border-clay-600 focus:ring-2 focus:ring-clay-600/15 outline-none transition-colors text-sm resize-none"
    />
  );
}