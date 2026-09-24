"use client";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}

export default function TextInput({ value, onChange, onBlur, placeholder, type = "text", autoFocus, onEnter }: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          e.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full px-4 py-3 rounded-lg border bg-surface border-hairline focus:border-clay-600 focus:ring-2 focus:ring-clay-600/15 outline-none transition-colors text-sm"
    />
  );
}