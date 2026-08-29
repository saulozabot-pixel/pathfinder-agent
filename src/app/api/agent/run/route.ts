import { NextResponse } from "next/server";
import { searchDolH2B } from "@/lib/dol";
import { assessJobFit, type AgentAssessment } from "@/lib/gemini";
import { defaultCandidate, type CandidateProfile } from "@/lib/candidate";
import type { DolCase } from "@/lib/dol";

export type AgentResult = {
  job: DolCase;
  assessment: AgentAssessment;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const keywords: string[] = Array.isArray(body.keywords) && body.keywords.length
    ? body.keywords
    : ["cook", "chef", "kitchen", "sushi", "culinary"];

  const candidate: CandidateProfile = body.candidate ?? defaultCandidate;
  const daysBack: number = typeof body.daysBack === "number" ? body.daysBack : 7;
  const maxResults: number = typeof body.maxResults === "number" ? body.maxResults : 6;

  let jobs: DolCase[];
  try {
    jobs = await searchDolH2B({ keywords, daysBack, maxResults });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to search DOL feed: ${(err as Error).message}` },
      { status: 502 }
    );
  }

  if (jobs.length === 0) {
    return NextResponse.json({ results: [] satisfies AgentResult[] });
  }

  const settled = await Promise.allSettled(
    jobs.map(async (job) => {
      const assessment = await assessJobFit(job, candidate);
      return { job, assessment } satisfies AgentResult;
    })
  );

  const results = settled
    .filter((r): r is PromiseFulfilledResult<AgentResult> => r.status === "fulfilled")
    .map((r) => r.value)
    .sort((a, b) => b.assessment.fitScore - a.assessment.fitScore);

  return NextResponse.json({ results });
}
