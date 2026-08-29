import { GoogleGenAI, Type } from "@google/genai";
import type { DolCase } from "./dol";
import type { CandidateProfile } from "./candidate";

const MODEL = "gemini-2.5-flash";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenAI({ apiKey });
}

export type AgentAssessment = {
  fitScore: number;
  reasoning: string;
  coverLetter: string;
};

const assessmentSchema = {
  type: Type.OBJECT,
  properties: {
    fitScore: {
      type: Type.NUMBER,
      description: "0-100 score of how well the candidate fits this job",
    },
    reasoning: {
      type: Type.STRING,
      description:
        "2-3 sentences explaining the fit score, referencing specific candidate experience against the job's real requirements",
    },
    coverLetter: {
      type: Type.STRING,
      description:
        "A complete, ready-to-send cover letter (150-220 words) tailored to this specific job and employer, honest about the candidate's real background, no invented claims",
    },
  },
  required: ["fitScore", "reasoning", "coverLetter"],
};

export async function assessJobFit(
  job: DolCase,
  candidate: CandidateProfile
): Promise<AgentAssessment> {
  const ai = getClient();

  const prompt = `You are a job-search agent helping a real candidate evaluate and apply to H-2B seasonal job postings in the US.

CANDIDATE PROFILE
Name: ${candidate.name}
Summary: ${candidate.summary}
Experience:
${candidate.experience.map((e) => `- ${e}`).join("\n")}
Skills: ${candidate.skills.join(", ")}

JOB POSTING (real ETA case filed with the US Department of Labor)
Case Number: ${job.caseNumber}
Title: ${job.tempneedJobtitle} (SOC: ${job.tempneedSocTitle})
Employer: ${job.empBusinessName} — ${job.jobCity}, ${job.jobState}
Duties: ${job.jobDuties}
Minimum experience required: ${job.jobMinexpmonths ?? "not specified"} months
Special requirements: ${job.jobMinspecialreq ?? "none listed"}
Wage: ${job.wageFrom ?? "?"}${job.wageTo ? `-${job.wageTo}` : ""} per ${job.wagePer ?? "hour"}
Period: ${job.tempneedStart} to ${job.tempneedEnd}

TASK
1. Score how well the candidate's real, documented experience fits this specific job (0-100). Be honest — do not inflate the score for a mismatch.
2. Explain the score in 2-3 sentences, citing concrete overlaps or gaps between the candidate's history and this job's stated duties/requirements.
3. Draft a cover letter for this exact job and employer. It must be truthful and grounded only in the candidate's listed experience — never invent qualifications, certifications, or experience the candidate does not have. Reference the case number and job title. Sign as "${candidate.name}". Format it as 3-4 short paragraphs separated by a blank line (use "\\n\\n" between paragraphs) — never one dense block of text.`;

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: assessmentSchema,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from Gemini");

  const parsed = JSON.parse(text) as AgentAssessment;
  return parsed;
}
