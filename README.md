# Yog Shala — Pre-Assessment Questionnaire

A Next.js multi-step form for collecting pre-assessment information from clients at Yog Shala. The form gathers posture, movement, pain history, and goals before an in-person assessment.

## Features

- **40 questions** across 7 sections with progress tracking
- **Auto-save** to browser localStorage — users can leave and resume later
- **Conditional logic** — injury history and deadline questions show only when relevant
- **Sliders** for pain severity (0–10) and commitment (1–10)
- **Mobile-responsive** design for clients on phones
- **Google Sheets integration** — responses are stored in a Google Sheet via Apps Script

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets Setup

1. Create a new Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste the script from `setup/google-apps-script.js`
4. Click **Run** once to authorize
5. **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the deployment URL and add it to `.env.local`:

```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
```

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**
