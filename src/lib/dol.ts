import AdmZip from "adm-zip";

export type DolCase = {
  caseNumber: string;
  tempneedJobtitle: string;
  tempneedSocTitle: string;
  tempneedDescription: string;
  tempneedStart: string;
  tempneedEnd: string;
  empBusinessName: string;
  empCity: string;
  empState: string;
  jobDuties: string;
  jobCity: string;
  jobState: string;
  jobMinexpmonths: number | null;
  jobMinspecialreq: string | null;
  wageFrom: number | null;
  wageTo: number | null;
  wagePer: string | null;
  recApplyEmail: string | null;
  recApplyUrl: string | null;
  recApplyPhone: string | null;
};

const DOL_FEED_BASE =
  "https://api.seasonaljobs.dol.gov/datahub-search/sjCaseData/zip/h2b";

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchDayFeed(date: string): Promise<DolCase[]> {
  const res = await fetch(`${DOL_FEED_BASE}/${date}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];

  const buffer = Buffer.from(await res.arrayBuffer());
  const zip = new AdmZip(buffer);
  const entries = zip.getEntries();
  if (entries.length === 0) return [];

  const raw = entries[0].getData().toString("utf-8");
  try {
    return JSON.parse(raw) as DolCase[];
  } catch {
    return [];
  }
}

/**
 * The DOL feed is a non-cumulative daily snapshot: each date's file lists
 * only cases touched that day, so matches for a given search have to be
 * accumulated by scanning several recent days rather than sampling one.
 */
export async function searchDolH2B(opts: {
  keywords: string[];
  daysBack?: number;
  maxResults?: number;
}): Promise<DolCase[]> {
  const { keywords, daysBack = 7, maxResults = 12 } = opts;
  const pattern = new RegExp(keywords.join("|"), "i");

  const results: DolCase[] = [];
  const seen = new Set<string>();
  const today = new Date();

  for (let i = 1; i <= daysBack && results.length < maxResults; i++) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const date = formatDate(day);

    let cases: DolCase[] = [];
    try {
      cases = await fetchDayFeed(date);
    } catch {
      continue;
    }

    for (const c of cases) {
      if (seen.has(c.caseNumber)) continue;
      const haystack = `${c.tempneedJobtitle} ${c.tempneedSocTitle}`;
      if (pattern.test(haystack)) {
        seen.add(c.caseNumber);
        results.push(c);
        if (results.length >= maxResults) break;
      }
    }
  }

  return results;
}
