"use client";

interface ProgressBarProps {
  sections: { id: string; title: string }[];
  currentSection: number;
}

export default function ProgressBar({ sections, currentSection }: ProgressBarProps) {
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {sections[currentSection].title}
        </span>
        <span className="text-sm text-gray-500">
          {currentSection + 1} of {sections.length}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`w-2 h-2 rounded-full transition-colors ${
              index <= currentSection ? "bg-emerald-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
