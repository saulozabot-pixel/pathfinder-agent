# Devpost Submission — Pathfinder Agent
### Cole cada seção no campo correspondente do formulário de submissão do Devpost

---

## Título do projeto
```
Pathfinder Agent
```

## Tagline / one-liner (se pedir um resumo curto)
```
An autonomous agent that searches real US Department of Labor job filings, honestly
scores candidate fit, and drafts tailored cover letters — built from a job search I lived.
```

---

## Inspiration

```
A few months ago I was manually applying to H-2B seasonal jobs in the US — cook and
kitchen roles. Every application meant the same repetitive loop by hand: search public
government job listings, read the filing, decide if I was actually a fit, and write a
custom cover letter from scratch. It took hours per batch of applications, across dozens
of employers. It worked — I ended up hired. But living that process end-to-end made the
opportunity obvious: this exact workflow — search, evaluate, draft, track — is precisely
what an autonomous agent should do. Pathfinder Agent is that workflow, automated, built on
top of the same real government data source I used by hand.
```

## What it does

```
Pathfinder Agent is an autonomous job-search agent for H-2B seasonal work in the US. Given
a candidate profile, it:

1. Searches real, live job postings by pulling directly from the US Department of Labor's
   public H-2B case data feed — the same registry employers use to file legally binding
   job orders, not scraped or simulated data.
2. Evaluates how well the candidate's real, documented experience fits each specific job,
   producing a 0-100 fit score with grounded reasoning that cites concrete overlaps and
   gaps against the job's actual stated requirements. It does not inflate scores — a
   mismatch is reported as a mismatch.
3. Drafts a complete, ready-to-send cover letter for every job, personalized to the
   employer, the job title, and the case number, using only the candidate's real,
   documented background. No invented qualifications, ever.
4. Lets the candidate track which applications have been sent, closing the loop from
   discovery to submission in a single dashboard.

The default candidate profile in the demo is real: my own kitchen work history, including
nine years as a line cook and two seasons as a sushi chef.
```

## How we built it

```
- Next.js 16 (App Router, Turbopack) for the frontend and API routes
- Gemini 2.5 Flash (via the @google/genai SDK) for both fit-scoring and cover-letter
  generation, using structured JSON output (responseSchema) so the agent's reasoning,
  score, and letter are always machine-parseable
- The DOL's public seasonaljobs.dol.gov H-2B case data feed as the live data source —
  fetched, unzipped in-memory, and filtered by role keywords server-side
- Deployed on Vercel

The DOL feed is a non-cumulative daily snapshot: each date's file only contains cases
touched that day, so the agent scans several recent days and deduplicates by case number
to build a real result set, rather than sampling a single day and missing most matches.
```

## Challenges we ran into

```
- The DOL feed returns a ZIP archive, not raw JSON, so the fetch pipeline had to unzip in
  memory server-side before parsing — and each daily file is several megabytes with ~500+
  case records and 100+ fields per case, requiring careful filtering to stay fast.
- Getting the agent to be honestly critical, not just persuasive, took real prompt design:
  early drafts tended to inflate every fit score. The final prompt explicitly instructs the
  model to be honest and cite concrete gaps, which is what produces the low-score,
  low-confidence results you'll see in the demo for genuine mismatches.
- Keeping the generated cover letters strictly grounded in the candidate's real, listed
  experience — with zero invented credentials — required an explicit constraint in the
  prompt, since left unconstrained the model would otherwise pad the letter with plausible
  sounding but unverified claims.
```

## Accomplishments that we're proud of

```
- The agent's honesty: it scores a genuine mismatch (a job requiring Sichuan cuisine
  specialization) at 15/100 and says exactly why, instead of writing a flattering letter
  for a job the candidate isn't qualified for.
- Using real, live, legally-filed government labor data instead of a mocked or scraped
  dataset — every job in a demo run is a real, currently open H-2B filing.
- Shipping the full search → evaluate → draft → track loop, live and deployed, not just a
  single-shot chatbot demo.
```

## What we learned

```
Agentic usefulness depends more on calibrated honesty than on generation quality. A
cover-letter generator alone is a commodity; what makes this genuinely useful is that the
same model that writes the pitch is also willing to say, in plain language, when the pitch
shouldn't be made at all.
```

## What's next for Pathfinder Agent

```
- Persist search history and applications in Supabase instead of browser-local storage
- Let the agent auto-send applications by email once a job crosses a fit-score threshold,
  with human approval in the loop
- Expand beyond H-2B to other public labor registries and visa categories
- Multi-language cover letter generation for non-native English speakers
```

---

## Built With (tags — adicione essas no campo "Built With" do Devpost)
```
nextjs
typescript
gemini
google-genai
tailwindcss
vercel
nodejs
```

## Try it out (link do projeto ao vivo)
```
https://pathfinder-agent.vercel.app
```
