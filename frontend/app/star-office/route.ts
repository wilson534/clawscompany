import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function injectStageCss(html: string) {
  const stageOnlyCss = `
<style>
body {
  padding: 0 !important;
  gap: 0 !important;
  background: #17182b !important;
}
#bottom-panels,
#control-bar,
#memo-panel,
#guest-agent-panel,
#asset-drawer-backdrop,
#asset-drawer,
#lang-toggle-group,
#pan-toggle,
#coords-toggle {
  display: none !important;
}
#main-stage {
  width: 100vw !important;
  max-width: 1280px !important;
  margin: 0 auto !important;
  transform: none !important;
}
#game-container {
  margin: 0 auto !important;
}
#status-text {
  left: 16px !important;
  bottom: 16px !important;
}
</style>`;

  return html.replace("</head>", `${stageOnlyCss}\n</head>`);
}

function patchStarOfficeHtml(html: string) {
  return injectStageCss(
    html
      .replaceAll("{{VERSION_TIMESTAMP}}", "20260324-room-v2")
      .replace("<title>Star 的像素办公室</title>", "<title>OPC 像素办公室</title>")
      .replaceAll("Loading Star’s pixel office...", "Loading OPC pixel office...")
      .replaceAll("Star 状态", "OPC 状态")
      .replaceAll("Star Status", "OPC Status")
      .replaceAll("海辛小龙虾的办公室", "OPC 一人公司总部")
      .replaceAll("Haixin Lobster Office", "OPC Headquarters")
      .replaceAll("正在加载 Star 的像素办公室...", "正在加载 OPC 像素办公室..."),
  );
}

export async function GET() {
  const htmlPath = path.join(
    process.cwd(),
    "..",
    "_refs",
    "Star-Office-UI",
    "frontend",
    "index.html",
  );
  const source = await readFile(htmlPath, "utf8");

  return new NextResponse(patchStarOfficeHtml(source), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
