import { NextResponse } from "next/server";
import { getStarOfficeAgents } from "@/lib/star-office-runtime";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getStarOfficeAgents(), {
    headers: {
      "cache-control": "no-store",
    },
  });
}
