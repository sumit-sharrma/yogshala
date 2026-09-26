"use client";

const stroke = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Step 1 — Complete the pre-assessment: a form being filled, with a drawing check
export function StepAssessIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Clipboard body */}
      <g className="floaty">
        <rect x="62" y="30" width="76" height="104" rx="8" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
        <rect x="52" y="24" width="48" height="14" rx="7" className="fill-clay-600" />
        {/* Form lines */}
        <rect x="74" y="52" width="52" height="6" rx="3" className="fill-hairline" />
        <rect x="74" y="66" width="52" height="6" rx="3" className="fill-hairline" />
        <rect x="74" y="80" width="34" height="6" rx="3" className="fill-hairline" />
        {/* Progress bar filling */}
        <rect x="74" y="104" width="52" height="8" rx="4" className="fill-pine-100" />
      </g>
      {/* Pen tip drawing the check */}
      <path
        d="M92 98 L100 106 L116 88"
        className="draw stroke-clay-500"
        strokeWidth="6"
        style={{ strokeDasharray: 120, ...stroke }}
      />
    </svg>
  );
}

// Step 2 — We review your responses: a magnifier scanning your answers
export function StepReviewIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Document */}
      <rect x="52" y="36" width="96" height="96" rx="10" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
      <rect x="68" y="54" width="64" height="5" rx="2.5" className="fill-hairline" />
      <rect x="68" y="66" width="64" height="5" rx="2.5" className="fill-hairline" />
      <rect x="68" y="78" width="40" height="5" rx="2.5" className="fill-hairline" />
      {/* Data dots */}
      <circle cx="68" cy="98" r="4" className="fill-clay-500 pulse-dot" />
      <circle cx="84" cy="98" r="4" className="fill-pine-600 pulse-dot" style={{ animationDelay: "0.4s" }} />
      <circle cx="100" cy="98" r="4" className="fill-pine-600 pulse-dot" style={{ animationDelay: "0.8s" }} />
      <circle cx="116" cy="98" r="4" className="fill-pine-600 pulse-dot" style={{ animationDelay: "1.2s" }} />
      <circle cx="132" cy="98" r="4" className="fill-pine-600 pulse-dot" style={{ animationDelay: "1.6s" }} />
      {/* Magnifier scanning */}
      <g className="scan-lens">
        <circle cx="128" cy="50" r="26" className="fill-paper stroke-clay-600" strokeWidth="4" />
        <path d="M146 68 L158 80" className="stroke-clay-600" strokeWidth="6" {...stroke} />
      </g>
    </svg>
  );
}

// Step 3 — In-person assessment session: a figure reaching overhead with motion arc
export function StepSessionIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Motion arc */}
      <path
        d="M66 92 A48 48 0 0 1 138 92"
        className="draw stroke-pine-600"
        strokeWidth="3"
        strokeDasharray="200"
        style={{ strokeLinecap: "round" }}
      />
      <circle cx="138" cy="92" r="6" className="fill-clay-500 pulse-dot" />
      {/* Person */}
      <g className="floaty" style={{ transformOrigin: "100px 120px" }}>
        <circle cx="100" cy="56" r="13" className="fill-pine-900" />
        <path d="M100 72 L100 108" className="stroke-pine-900" strokeWidth="7" {...stroke} />
        <path d="M100 78 L70 94" className="stroke-pine-900" strokeWidth="7" {...stroke} />
        <path d="M100 78 L130 62" className="draw-delay stroke-clay-600" strokeWidth="6" strokeDasharray={120} {...stroke} />
        <path d="M100 112 L78 138" className="stroke-pine-900" strokeWidth="7" {...stroke} />
        <path d="M100 112 L122 136" className="stroke-pine-900" strokeWidth="7" {...stroke} />
      </g>
    </svg>
  );
}

// Step 4 — Get your personalized plan: a roadmap to a goal marker
export function StepPlanIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Road */}
      <path
        d="M54 134 C 78 88, 96 64, 96 128 S 118 56, 150 40"
        className="stroke-hairline"
        strokeWidth="14"
        {...stroke}
      />
      <path
        d="M54 134 C 78 88, 96 64, 96 128 S 118 56, 150 40"
        className="draw stroke-pine-600"
        strokeWidth="3.5"
        strokeDasharray="260"
        style={{ strokeLinecap: "round", strokeDashoffset: 260, animationDuration: "2.2s" }}
      />
      {/* Start pin */}
      <circle cx="54" cy="134" r="7" className="fill-clay-500 pulse-dot" />
      {/* Goal flag */}
      <g className="floaty" style={{ transformOrigin: "150px 40px" }}>
        <path d="M150 24 L150 56" className="stroke-pine-900" strokeWidth="5" {...stroke} />
        <path d="M150 24 L172 32 L150 42" className="fill-clay-600" />
      </g>
      {/* Checkpoints */}
      <circle cx="96" cy="128" r="5" className="fill-pine-600" />
      <circle cx="112" cy="74" r="5" className="fill-pine-600" />
    </svg>
  );
}