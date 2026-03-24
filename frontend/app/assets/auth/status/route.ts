import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    authed: false,
    drawer_default_pass: false,
  });
}
