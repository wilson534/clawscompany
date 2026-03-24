import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      msg: "当前 Demo 不开放资产抽屉编辑。",
    },
    { status: 401 },
  );
}
