import { NextResponse } from "next/server";
import { getYesterdayMemoPayload } from "@/lib/star-office-runtime";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(getYesterdayMemoPayload(), {
    headers: {
      "cache-control": "no-store",
    },
  });
}
