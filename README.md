# Pathfinder Agent

An autonomous agent that scans real US Department of Labor H-2B job filings, scores
candidate fit honestly, and drafts tailored cover letters — built from a job search I
actually lived.

**Live demo:** https://pathfinder-agent.vercel.app

## What it does

Given a candidate profile, the agent runs a full search → evaluate → draft loop with no
step-by-step human guidance:

1. **Search** — pulls several recent days of the DOL's public H-2B case data feed
   (`api.seasonaljobs.dol.gov`) and filters for role-matching keywords. The feed is a
   non-cumulative daily snapshot, so the agent scans multiple days and deduplicates by
   case number.
2. **Evaluate** — for each job, Gemini 2.5 Flash scores 0-100 how well the candidate's
   real, documented experience fits the job's actual stated duties and requirements, with
   grounded reasoning. Mismatches are reported honestly, not smoothed over.
3. **Draft** — Gemini writes a complete, ready-to-send cover letter per job, referencing
   the real case number and employer, using only the candidate's real background — no
   invented qualifications.
4. **Track** — each application can be marked as sent, closing the loop in one dashboard.

## Tech stack

- Next.js 16 (App Router, Turbopack)
- Gemini 2.5 Flash via `@google/genai`, with `responseSchema` structured JSON output
- DOL public H-2B case data feed (fetched + unzipped server-side with `adm-zip`)
- Tailwind CSS v4
- Deployed on Vercel

## Running it locally

```bash
npm install
```

Create `.env.local` with a Gemini API key (get one free at
[aistudio.google.com/apikey](https://aistudio.google.com/apikey)):

```
GEMINI_API_KEY=your-key-here
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Reproducible testing

1. Open the app (locally or the [live demo](https://pathfinder-agent.vercel.app)).
2. The default candidate profile (a real 9-year kitchen career, including two seasons as
   a sushi chef) is pre-loaded — no setup needed.
3. Leave the default keywords (`cook, chef, kitchen, sushi, culinary`) and days-to-scan
   (`7`), or adjust them.
4. Click **"Executar agente" / "Run agent"**. The three-step progress indicator shows the
   agent searching the live DOL feed, scoring fit, and drafting letters — this takes
   roughly 30-60 seconds depending on how many day-feeds and jobs are found.
5. Results appear sorted by fit score. Click **"Ver carta gerada" / "See generated
   letter"** on any result to expand its cover letter. Notice that a genuine mismatch
   (e.g. a job requiring a cuisine specialization the candidate doesn't have) is scored
   low with an honest explanation, not glossed over.
6. Toggle **"Candidatura enviada" / "Application sent"** to track a result — this persists
   in the browser's local storage.

Because the data source is a live, real government feed, exact results (which jobs
appear, their case numbers) vary run to run — the agent's search → evaluate → draft
behavior is what to verify, not a fixed output.
