import { NextResponse } from "next/server";
import { getApplicationStatuses, markApplicationStatus } from "@/lib/firestore";

export async function GET() {
  try {
    const statuses = await getApplicationStatuses();
    return NextResponse.json({ statuses });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to load application statuses: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const caseNumber: string | undefined = body.caseNumber;
  const applied: boolean = !!body.applied;

  if (!caseNumber) {
    return NextResponse.json({ error: "caseNumber is required" }, { status: 400 });
  }

  try {
    await markApplicationStatus(caseNumber, applied);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to save application status: ${(err as Error).message}` },
      { status: 502 }
    );
  }
}
