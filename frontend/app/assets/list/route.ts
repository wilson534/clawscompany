import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const staticDir = path.join(process.cwd(), "public", "static");
  const items = (await readdir(staticDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => ({
      name: entry.name,
      path: entry.name,
    }));

  return NextResponse.json({
    ok: true,
    count: items.length,
    items,
  });
}
