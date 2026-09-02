"use client";

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function TextArea({ value, onChange, placeholder }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors text-sm resize-none"
    />
  );
}
