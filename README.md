# Yog Shala — Pre-Assessment Questionnaire

A Next.js multi-step form for collecting pre-assessment information from clients at Yog Shala. The form gathers posture, movement, pain history, and goals before an in-person assessment.

## Features

- **39 questions** across 9 sections with progress tracking
- **Auto-save** to browser localStorage — users can leave and resume later
- **Conditional logic** — neck/shoulder/back/knee quick questions appear only when that body area is selected
- **Sliders** for pain level (0–10)
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

## TODO: Swap the temporary Vercel domain for a custom domain

When replacing `yogshala-theta.vercel.app` with the real custom domain, complete these steps:

- [ ] Set the production env var in Vercel (**Settings → Environment Variables → Production**):
      `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
- [ ] (Optional) Update the hardcoded fallback in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts` if you want the fallback domain removed/changed.
- [ ] Add the custom domain in Vercel (**Settings → Domains**) and point DNS at Vercel as instructed by the dashboard.
- [ ] Deploy and verify these pages resolve to the new domain:
      `https://yourdomain.com`, `/sitemap.xml`, `/robots.txt`, `/opengraph-image`
- [ ] Confirm the rendered `canonical`, `og:url`, `og:image`, and sitemap `<loc>` URLs all use the new domain.
- [ ] Re-submit the sitemap in Google Search Console (and Bing Webmaster Tools, if used) for the new domain.
- [ ] Leave `NEXT_PUBLIC_GOOGLE_SHEETS_URL` in `.env.local` unchanged — it is unrelated to the domain.
