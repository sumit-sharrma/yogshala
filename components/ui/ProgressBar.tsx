"use client";

interface ProgressBarProps {
  sections: { id: string; title: string; subtitle?: string }[];
  currentSection: number;
  currentQuestion: number;
  totalQuestions: number;
  complete?: boolean;
}

export default function ProgressBar({
  sections,
  currentSection,
  currentQuestion,
  totalQuestions,
  complete = false,
}: ProgressBarProps) {
  const percent = complete
    ? 100
    : Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <span className="text-sm font-medium text-ink truncate">
          {complete ? "Review & submit" : `Section ${currentSection + 1} of ${sections.length}`}
        </span>
        <span className="text-sm text-ink-faint shrink-0">
          {complete ? `${sections.length} sections` : `Question ${currentQuestion + 1} of ${totalQuestions}`}
        </span>
      </div>
      <div className="w-full bg-hairline rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-pine-700 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}