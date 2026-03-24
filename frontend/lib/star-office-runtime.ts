import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { allData, getTaskById } from "@/lib/opc";
import type { AgentProfile, AgentStatus, OfficeId } from "@/lib/opc-types";

export type StarOfficeStateValue =
  | "idle"
  | "writing"
  | "researching"
  | "executing"
  | "syncing"
  | "error";

type StarOfficeStatus = {
  state: StarOfficeStateValue;
  detail: string;
  progress: number;
  updated_at: string;
  officeName: string;
};

const OFFICE_NAME = "OPC 一人公司总部";
const RUNTIME_DIR = path.join(process.cwd(), ".runtime");
const STATE_FILE = path.join(RUNTIME_DIR, "star-office-state.json");

const displayNameMap: Record<string, string> = {
  "team-peng": "彭智炜",
  "team-zhang": "张涛",
  "team-randy": "Randy",
  "team-shi": "千山",
  "intel-scout": "情报",
  "intel-synth": "洞察",
  "pm-investor": "PM",
  "design-director": "设计",
  "eng-bald": "工程A",
  "eng-builder": "工程B",
  "qa-inspector": "QA",
  "release-publisher": "发行",
  "growth-operator": "增长",
  "partner-scout": "渠道",
  "bd-operator": "商务",
};

const officeAreaMap: Record<OfficeId, string> = {
  founder: "researching",
  team: "team",
  intel: "intel",
  investment: "investment",
  design: "design",
  engineering: "engineering",
  qa: "qa",
  release: "release",
  growth: "growth",
  partner: "partner",
};

function latestEdge() {
  return [...allData.collaborationEdges].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime(),
  )[0];
}

function mapStatusToStarState(status: AgentStatus, officeId?: OfficeId): StarOfficeStateValue {
  if (status === "escalated") {
    return "error";
  }

  if (status === "waiting" || status === "idle") {
    return "idle";
  }

  if (status === "reviewing") {
    return officeId === "founder" || officeId === "investment" ? "researching" : "syncing";
  }

  if (status === "completed") {
    return officeId === "intel" || officeId === "investment" ? "researching" : "idle";
  }

  if (officeId === "intel" || officeId === "investment" || officeId === "founder") {
    return "researching";
  }

  if (officeId === "partner" || officeId === "release" || officeId === "growth") {
    return "syncing";
  }

  return "writing";
}

function toAuthStatus(status: AgentStatus) {
  if (status === "waiting") {
    return "pending";
  }

  return "approved";
}

function compactText(input: string | undefined, fallback: string) {
  if (!input) {
    return fallback;
  }

  return input.replace(/\s+/g, " ").trim();
}

function buildDefaultStatus(): StarOfficeStatus {
  const founder = allData.agents.find((agent) => agent.id === "founder-em01");
  const edge = latestEdge();
  const founderTask = founder ? getTaskById(founder.currentTaskId) : undefined;
  const detail = compactText(
    edge?.summary || founderTask?.title || founder?.tagline,
    "总部正在同步发布包、合作线索和最终拍板。",
  );

  return {
    state: mapStatusToStarState(founder?.status ?? "working", founder?.officeId),
    detail,
    progress: 78,
    updated_at: edge?.updatedAt ?? new Date().toISOString(),
    officeName: OFFICE_NAME,
  };
}

async function readStatusOverride(): Promise<StarOfficeStatus | null> {
  try {
    const raw = await readFile(STATE_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<StarOfficeStatus>;

    if (!parsed.state || !parsed.detail || !parsed.updated_at) {
      return null;
    }

    return {
      state: parsed.state,
      detail: parsed.detail,
      progress: typeof parsed.progress === "number" ? parsed.progress : 0,
      updated_at: parsed.updated_at,
      officeName: parsed.officeName || OFFICE_NAME,
    };
  } catch {
    return null;
  }
}

export async function getStarOfficeStatus() {
  return (await readStatusOverride()) ?? buildDefaultStatus();
}

export async function setStarOfficeStatus(input: {
  state: StarOfficeStateValue;
  detail?: string;
  progress?: number;
}) {
  const nextStatus: StarOfficeStatus = {
    state: input.state,
    detail: compactText(input.detail, "状态已更新。"),
    progress: typeof input.progress === "number" ? input.progress : 0,
    updated_at: new Date().toISOString(),
    officeName: OFFICE_NAME,
  };

  await mkdir(RUNTIME_DIR, { recursive: true });
  await writeFile(STATE_FILE, JSON.stringify(nextStatus, null, 2), "utf8");

  return nextStatus;
}

function bubbleTextForAgent(agent: AgentProfile) {
  const task = getTaskById(agent.currentTaskId);
  const outputId = agent.outputArtifactIds[0];
  const output = outputId ? allData.artifacts.find((artifact) => artifact.id === outputId) : undefined;

  return compactText(
    task?.title || output?.summary || agent.tagline,
    `${agent.name} 正在推进主链任务。`,
  );
}

function getDisplayName(agent: AgentProfile) {
  return displayNameMap[agent.id] || agent.name;
}

function getAreaByOffice(officeId: OfficeId) {
  return officeAreaMap[officeId] || "team";
}

export function getStarOfficeAgents() {
  return allData.agents
    .filter((agent) => agent.id !== "founder-em01")
    .map((agent) => {
      const state = mapStatusToStarState(agent.status, agent.officeId);

      return {
        agentId: agent.id,
        name: getDisplayName(agent),
        authStatus: toAuthStatus(agent.status),
        state,
        area: getAreaByOffice(agent.officeId),
        bubbleText: bubbleTextForAgent(agent),
        isMain: false,
        updated_at: new Date().toISOString(),
      };
    });
}

export function getYesterdayMemoPayload() {
  const lines = [
    "昨天把 OPC 的主链又向前推了一步：",
    "",
    "1. 情报部收敛了打工人工具信号簇，确认“工时 / 工资 / 周报助手”值得继续推进。",
    "2. 投资委员会和 Founder 完成了立项判断，主链开始进入发布准备阶段。",
    "3. 工程部把办公室舞台、A2A 回放和详情页打通，保证 demo 可以连续讲述。",
    "4. 发行部产出首版 Release Pack，今天的重点是把首页舞台真正拉满。",
  ];

  return {
    success: true,
    date: "2026-03-23",
    memo: lines.join("\n"),
  };
}
