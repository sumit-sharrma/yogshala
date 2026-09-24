"use client";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  min: number;
  max: number;
  step: number;
}

export default function Slider({ value, onChange, onBlur, min, max, step }: SliderProps) {
  const getLabel = (val: number) => {
    if (min === 0 && max === 10) {
      if (val === 0) return "No Pain";
      if (val <= 3) return "Mild";
      if (val <= 6) return "Moderate";
      if (val <= 8) return "Severe";
      return "Worst Pain";
    }
    return `${val}`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-faint">{min}</span>
        <span className="font-display text-xl font-semibold text-clay-600">{value}</span>
        <span className="text-sm text-ink-faint">{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onBlur={onBlur}
        className="w-full h-2 bg-hairline rounded-lg appearance-none cursor-pointer accent-clay-600"
      />
      <div className="text-center text-sm text-ink-faint">{getLabel(value)}</div>
    </div>
  );
}