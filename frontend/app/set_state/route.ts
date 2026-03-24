import { NextRequest, NextResponse } from "next/server";
import { setStarOfficeStatus, type StarOfficeStateValue } from "@/lib/star-office-runtime";

export const runtime = "nodejs";

const allowedStates = new Set<StarOfficeStateValue>([
  "idle",
  "writing",
  "researching",
  "executing",
  "syncing",
  "error",
]);

export async function POST(request: NextRequest) {
  const data = (await request.json()) as {
    state?: StarOfficeStateValue;
    detail?: string;
    progress?: number;
  };

  if (!data.state || !allowedStates.has(data.state)) {
    return NextResponse.json(
      { status: "error", msg: "缺少有效 state" },
      { status: 400 },
    );
  }

  await setStarOfficeStatus({
    state: data.state,
    detail: data.detail,
    progress: data.progress,
  });

  return NextResponse.json({ status: "ok" });
}
