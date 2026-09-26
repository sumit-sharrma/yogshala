"use client";

const stroke = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// About pillar 1 — Assessment first: clipboard with a drawing progress check
export function PillarAssessmentIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Clipboard */}
      <g className="floaty">
        <rect x="62" y="28" width="76" height="104" rx="8" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
        <rect x="52" y="22" width="48" height="14" rx="7" className="fill-clay-600" />
        {/* Form lines */}
        <rect x="74" y="52" width="52" height="6" rx="3" className="fill-hairline" />
        <rect x="74" y="66" width="52" height="6" rx="3" className="fill-hairline" />
        <rect x="74" y="80" width="34" height="6" rx="3" className="fill-hairline" />
        {/* Progress bar filling */}
        <rect x="74" y="104" width="52" height="8" rx="4" className="fill-pine-100" />
        <rect x="74" y="104" width="30" height="8" rx="4" className="draw fill-clay-500" />
      </g>
      {/* Pen tip drawing the check */}
      <path
        d="M92 96 L101 105 L118 86"
        className="draw-delay stroke-clay-500"
        strokeWidth="6"
        style={{ strokeDasharray: 120, ...stroke }}
      />
    </svg>
  );
}

// About pillar 2 — Yoga at the core: meditating figure with a breath arc
export function PillarYogaIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Breath / energy arc */}
      <path
        d="M54 60 A 60 60 0 0 1 146 60"
        className="draw stroke-pine-600"
        strokeWidth="3"
        strokeDasharray="200"
        style={{ strokeLinecap: "round" }}
      />
      <circle cx="146" cy="60" r="6" className="fill-clay-500 pulse-dot" />
      {/* Meditating figure */}
      <g className="floaty" style={{ transformOrigin: "100px 120px" }}>
        <circle cx="100" cy="48" r="12" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
        <path d="M100 62 L100 94" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        {/* Arms resting on knees */}
        <path d="M100 68 C 88 76, 86 90, 86 96" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M100 68 C 112 76, 114 90, 114 96" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        {/* Crossed lotus legs */}
        <path d="M76 112 L124 112 L100 134 L76 112" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" {...stroke} />
      </g>
    </svg>
  );
}

// About pillar 3 — One-to-one care: two figures with a heart between them
export function PillarCareIllustration() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full" fill="none" aria-hidden="true">
      {/* Heart connecting the two */}
      <g className="floaty" style={{ transformOrigin: "100px 76px" }}>
        <path
          d="M100 92 C 85 81, 85 67, 96 63 C 105 60, 100 69, 100 69 C 100 69, 95 60, 104 63 C 115 67, 115 81, 100 92 Z"
          className="fill-clay-500 stroke-clay-600"
          strokeWidth="2.5"
          {...stroke}
        />
        <circle cx="100" cy="76" r="14" className="fill-none stroke-clay-600 pulse-dot" strokeWidth="2" />
      </g>
      {/* Left figure — facing right */}
      <g className="floaty" style={{ transformOrigin: "58px 118px" }}>
        <circle cx="58" cy="110" r="11" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
        <path d="M58 124 L58 142" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M58 127 L43 137" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M58 127 L73 137" className="draw-delay stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M58 145 L46 156" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M58 145 L70 156" className="stroke-pine-600" strokeWidth="3" {...stroke} />
      </g>
      {/* Right figure — facing left */}
      <g className="floaty" style={{ transformOrigin: "142px 118px" }}>
        <circle cx="142" cy="110" r="11" className="fill-pine-050 stroke-pine-600" strokeWidth="2.5" />
        <path d="M142 124 L142 142" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M142 127 L127 137" className="draw-delay stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M142 127 L157 137" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M142 145 L130 156" className="stroke-pine-600" strokeWidth="3" {...stroke} />
        <path d="M142 145 L154 156" className="stroke-pine-600" strokeWidth="3" {...stroke} />
      </g>
    </svg>
  );
}