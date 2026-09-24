# Yog Shala — Design System

Direction: **Calm-clinical blend** — modern posture science meets the mindfulness of yoga.
Warm paper grounds, deep pine-green brand color, terracotta as the human/warm accent,
editorial serif for display, clean sans for UI. Generous whitespace, hairline borders,
soft shadows, outcome-named copy over generic labels.

---

## 1. Color

| Token              | Hex       | Usage                                                             |
| ------------------ | --------- | ----------------------------------------------------------------- |
| `--color-paper`    | `#FAF8F4` | Page background (warm off-white cream)                            |
| `--color-surface`  | `#FFFFFF` | Cards, modals, raised panels                                       |
| `--color-ink`      | `#1F2E29` | Primary text on light backgrounds (deep green-tinted near-black)  |
| `--color-ink-soft` | `#5B6B64` | Secondary/body text                                                |
| `--color-ink-faint`| `#8A9690` | Tertiary/hint text, placeholders, footer microcopy                 |
| `--color-pine-900` | `#1C3D33` | Brand dark — headings on dark zones, footer, active nav           |
| `--color-pine-700` | `#2F5D4E` | Brand green — primary accents                                     |
| `--color-pine-600` | `#3E7060` | Hover state of pine-700                                            |
| `--color-pine-100` | `#DDEBE4` | Soft icon chips, checkbox fills                                    |
| `--color-pine-050` | `#EEF4EF` | Very soft tint — highlighted hint panels                           |
| `--color-clay-600` | `#B85C38` | Accent — text highlights, focus rings, slider thumbs              |
| `--color-clay-500` | `#C96F4B` | Accent hover                                                       |
| `--color-clay-100` | `#F4E3DA` | Warm tint — testimonial quote marks, subtle panels                 |
| `--color-hairline` | `#E8E3DB` | 1px borders (cards, sections, inputs)                              |

Conventions:
- Borders `border-hairline`; never use pure gray for borders on light backgrounds.
- Text contrast: `ink` on `paper`/`surface` ≥ WCAG AA. `ink-soft` is AA on `surface` (4.6:1).
- Use `pine` for structure/brand moments, `clay` sparingly for emphasis (max 1 per viewport-ish area).

---

## 2. Typography

| Role       | Font        | Style / Size                                   |
| ---------- | ----------- | ---------------------------------------------- |
| Display / H1 | `Fraunces` (serif) | 600, `text-4xl sm:text-6xl`, `tracking-tight`, `leading-[1.05]` |
| H2         | `Fraunces`      | 600, `text-3xl sm:text-4xl`, `tracking-tight`  |
| H3         | `Geist` (sans)  | 600, `text-lg`                                  |
| Eyebrow    | `Geist`         | 600, `text-xs`, `uppercase`, `tracking-[0.2em]`, `text-clay-600` |
| Body       | `Geist`         | `text-base`/`text-lg`, `text-ink-soft`          |
| Micro      | `Geist`         | `text-sm`, `text-ink-faint`                     |

Rules:
- Headings set in `font-display` (Fraunces) for an editorial, human feel.
- Body never set below `14px`; form inputs at `15–16px` (no iOS zoom).
- `leading-relaxed` for paragraph copy (1.625).
- Eyebrow color is `clay-600` — the single recurring accent signal.

---

## 3. Spacing & Layout

Scale: Tailwind's default 4px base (`space-x-*`, `p-*`, `gap-*`).

| Context              | Token                                   |
| -------------------- | --------------------------------------- |
| Section gutters      | `max-w-6xl mx-auto px-4 sm:px-6`        |
| Section vertical pad | `py-20 sm:py-28` (alternate with page rhythm) |
| Card padding         | `p-8 md:p-14`                            |
| Grid gaps            | `gap-6` (cards), `gap-6 md:gap-8` (hero trust points) |
| Icon chip            | `w-12 h-12 rounded-full`                 |
| CTA button           | `px-8 py-3`                              |
| Form control gap     | `space-y-1.5` label→input; option `gap-3`|

Rhythm: every section starts with centered eyebrow + H2 + lede, `mt-3`/`mt-4`
gaps under headings; content block begins `mt-12 sm:mt-16`.

---

## 4. Borders & Radius

| Token            | Radius  | Usage                                  |
| ---------------- | ------- | -------------------------------------- |
| `rounded-md`     | 6px     | small chips / badges                    |
| `rounded-lg`     | 8px     | buttons, inputs, hint panels            |
| `rounded-xl`     | 12px    | cards, panels                           |
| `rounded-2xl`    | 16px    | hero showcase, primary content cards    |
| `rounded-full`   | 999px   | icon chips, avatars, trust chips        |

Border color: `hairline` (#E8E3DB). Only interactive/focus elements use color:
- Input focus: `border-clay-600` + `ring-2 ring-clay-600/15`.
- Selected options: `border-pine-700 bg-pine-050`.
- Section separators: `border-hairline` full-bleed.

---

## 5. Elevation / Shadow

| Token               | Class              | Usage                          |
| ------------------- | ------------------ | ------------------------------ |
| `shadow-soft`       | `shadow-[0_2px_12px_rgba(31,46,41,0.06)]` | resting cards, panels |
| `shadow-soft-lg`    | `shadow-[0_8px_30px_rgba(31,46,41,0.08)]`  | hero card, hover |

Cards rest on `surface` over `paper`; add a hairline border rather than heavy shadows.
Never use default Tailwind gray shadows — tint all shadows with `ink` at low alpha.

---

## 6. Components

- **Primary CTA**: `bg-pine-900 text-white rounded-lg px-8 py-3 font-medium hover:bg-pine-700 transition`.
- **Secondary**: `text-pine-900 border border-hairline rounded-lg px-8 py-3 hover:bg-surface`.
- **Trust chip**: `bg-surface border-hairline rounded-xl px-5 py-3`, `text-sm`.
- **Eyebrow**: `<span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay-600">…</span>`.
- **Navbar**: sticky, `bg-paper/80 backdrop-blur`, `border-b border-hairline`.
- **Forms**: label `text-sm font-medium text-ink`, control `rounded-lg border-hairline
  bg-surface focus:border-clay-600 focus:ring-2 focus:ring-clay-600/15`.
- **Logo mark**: pine lotus glyph in `bg-pine-050` rounded-full chip; wordmark in `font-display`.