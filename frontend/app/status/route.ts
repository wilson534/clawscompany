import { NextResponse } from "next/server";
import { getStarOfficeStatus } from "@/lib/star-office-runtime";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(await getStarOfficeStatus(), {
    headers: {
      "cache-control": "no-store",
    },
  });
}
