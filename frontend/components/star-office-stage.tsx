"use client";

import Link from "next/link";
import { useState } from "react";
import {
  formatShortDate,
  formatStatusLabel,
  getAgentById,
  getAgentCollaborators,
  getAgentOutputs,
  getAgentPlugins,
  getAgentSkills,
  getEdgeTone,
  getOfficeAgents,
  getOfficeById,
  getOfficeProject,
  getOfficeSummary,
  getProjectStageSummary,
  getStatusTone,
  getTaskById,
  allData,
} from "@/lib/opc";
import type { CollaborationEdge, OfficeId } from "@/lib/opc-types";

type TowerProps = {
  activeOfficeId?: OfficeId;
  mode?: "home" | "office";
};

type FloorConfig = {
  label: string;
  top: number;
  height: number;
  offices: OfficeId[];
};

type RoomFrame = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type RoomArt = {
  image: string;
  position?: string;
  overlay?: string;
};

type AgentAnchor = {
  left: string;
  top: string;
};

type RoomLinkEdge = CollaborationEdge & {
  fromOfficeId: OfficeId;
  toOfficeId: OfficeId;
};

const floors: FloorConfig[] = [
  { label: "5F", top: 4, height: 15, offices: ["founder"] },
  { label: "4F", top: 23, height: 16, offices: ["team", "partner"] },
  { label: "3F", top: 42, height: 16, offices: ["intel", "investment"] },
  { label: "2F", top: 61, height: 16, offices: ["design", "engineering"] },
  { label: "1F", top: 80, height: 16, offices: ["qa", "release", "growth"] },
];

const roomFrames: Record<OfficeId, RoomFrame> = {
  founder: { left: 12, top: 6.5, width: 74, height: 11.3 },
  team: { left: 7, top: 25.5, width: 39, height: 12.2 },
  partner: { left: 54, top: 25.5, width: 39, height: 12.2 },
  intel: { left: 7, top: 44.5, width: 39, height: 12.2 },
  investment: { left: 54, top: 44.5, width: 39, height: 12.2 },
  design: { left: 7, top: 63.5, width: 39, height: 12.2 },
  engineering: { left: 54, top: 63.5, width: 39, height: 12.2 },
  qa: { left: 4.5, top: 82.5, width: 28, height: 12.2 },
  release: { left: 36, top: 82.5, width: 28, height: 12.2 },
  growth: { left: 67.5, top: 82.5, width: 28, height: 12.2 },
};

const roomArt: Record<OfficeId, RoomArt> = {
  founder: {
    image: "/star-office/office-preview.jpg",
    position: "center 28%",
    overlay: "linear-gradient(180deg, rgba(3,7,12,0.08), rgba(3,7,12,0.28))",
  },
  team: {
    image: "/star-office/room_reference.webp",
    position: "left center",
    overlay: "linear-gradient(180deg, rgba(15,18,32,0.08), rgba(15,18,32,0.24))",
  },
  partner: {
    image: "/star-office/room_reference.webp",
    position: "center 24%",
    overlay: "linear-gradient(180deg, rgba(17,15,31,0.08), rgba(17,15,31,0.24))",
  },
  intel: {
    image: "/star-office/room_reference.webp",
    position: "center 36%",
    overlay: "linear-gradient(180deg, rgba(8,25,18,0.08), rgba(8,25,18,0.24))",
  },
  investment: {
    image: "/star-office/room_reference.webp",
    position: "center 18%",
    overlay: "linear-gradient(180deg, rgba(32,24,8,0.08), rgba(32,24,8,0.24))",
  },
  design: {
    image: "/star-office/room_reference.webp",
    position: "center 40%",
    overlay: "linear-gradient(180deg, rgba(36,17,26,0.08), rgba(36,17,26,0.24))",
  },
  engineering: {
    image: "/star-office/office-preview.jpg",
    position: "center 52%",
    overlay: "linear-gradient(180deg, rgba(8,16,30,0.08), rgba(8,16,30,0.24))",
  },
  qa: {
    image: "/star-office/office-preview.jpg",
    position: "right 58%",
    overlay: "linear-gradient(180deg, rgba(28,11,16,0.08), rgba(28,11,16,0.24))",
  },
  release: {
    image: "/star-office/office-preview.jpg",
    position: "center 65%",
    overlay: "linear-gradient(180deg, rgba(9,27,12,0.08), rgba(9,27,12,0.24))",
  },
  growth: {
    image: "/star-office/room_reference.webp",
    position: "left 20%",
    overlay: "linear-gradient(180deg, rgba(32,18,8,0.08), rgba(32,18,8,0.24))",
  },
};

const anchorLayouts: AgentAnchor[][] = [
  [{ left: "18%", top: "64%" }],
  [
    { left: "24%", top: "62%" },
    { left: "74%", top: "58%" },
  ],
  [
    { left: "18%", top: "62%" },
    { left: "48%", top: "56%" },
    { left: "74%", top: "64%" },
  ],
  [
    { left: "15%", top: "62%" },
    { left: "37%", top: "56%" },
    { left: "59%", top: "64%" },
    { left: "80%", top: "56%" },
  ],
];

function getRoomCenter(officeId: OfficeId) {
  const frame = roomFrames[officeId];
  return {
    x: frame.left + frame.width / 2,
    y: frame.top + frame.height / 2,
  };
}

function getRecentRoomLinks(limit = 8): RoomLinkEdge[] {
  const seen = new Set<string>();

  return allData.collaborationEdges
    .map((edge) => {
      const fromOfficeId = getAgentById(edge.fromAgentId)?.officeId;
      const toOfficeId = getAgentById(edge.toAgentId)?.officeId;

      if (!fromOfficeId || !toOfficeId || fromOfficeId === toOfficeId) {
        return null;
      }

      return { ...edge, fromOfficeId, toOfficeId };
    })
    .filter((edge): edge is RoomLinkEdge => Boolean(edge))
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .filter((edge) => {
      const key = [edge.fromOfficeId, edge.toOfficeId, edge.handoffType].sort().join(":");
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function shortAgentLabel(name: string) {
  return name.length <= 3 ? name : name.slice(0, 2);
}

function getAnchors(agentCount: number) {
  return anchorLayouts[Math.max(0, Math.min(anchorLayouts.length - 1, agentCount - 1))] ?? anchorLayouts[0];
}

function AgentDrawer({ agentId, onClose }: { agentId: string; onClose: () => void }) {
  const agent = getAgentById(agentId);
  if (!agent) {
    return null;
  }

  const office = getOfficeById(agent.officeId);
  const task = getTaskById(agent.currentTaskId);
  const skills = getAgentSkills(agent);
  const tools = getAgentPlugins(agent);
  const outputs = getAgentOutputs(agent);
  const collaborators = getAgentCollaborators(agent);

  return (
    <div className="absolute bottom-6 right-6 z-20 w-[400px] max-w-[42vw] rounded-[20px] border border-white/12 bg-[rgba(7,11,17,0.86)] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="opc-kicker text-[10px]">Agent</p>
          <h3 className="opc-title mt-2 truncate text-2xl text-white">{agent.name}</h3>
          <p className="mt-1 text-sm text-[var(--opc-muted)]">{agent.title}</p>
        </div>
        <button type="button" onClick={onClose} className="opc-nav-chip">
          关闭
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`rounded-full border px-3 py-1 text-xs ${getStatusTone(agent.status)}`}>
          {formatStatusLabel(agent.status)}
        </span>
        {office ? (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/72">
            {office.name}
          </span>
        ) : null}
      </div>

      {task ? (
        <div className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold text-white">{task.title}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--opc-muted)]">
            {task.stage} · 更新于 {formatShortDate(task.updatedAt)}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--opc-muted)]">下一步：{task.nextAction ?? "待同步"}</p>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Skills</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.slice(0, 5).map((skill) => (
              <span key={skill.id} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/76">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">Tools</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tools.slice(0, 4).map((tool) => (
              <span key={tool.id} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/76">
                {tool.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Collaborators</p>
            <p className="mt-2 text-sm leading-6 text-white/78">
              {collaborators.length ? collaborators.slice(0, 3).map((item) => item.name).join(" / ") : "当前无"}
            </p>
          </div>
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">Outputs</p>
            <p className="mt-2 text-sm leading-6 text-white/78">
              {outputs.length ? outputs.slice(0, 2).map((item) => item.title).join(" / ") : "当前无"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/agent/${agent.id}`} className="opc-nav-chip">
          完整档案
        </Link>
      </div>
    </div>
  );
}

function RoomSummaryDrawer({ officeId }: { officeId: OfficeId }) {
  const office = getOfficeById(officeId);
  if (!office) {
    return null;
  }

  const summary = getOfficeSummary(office.id);
  const project = getOfficeProject(office.id);
  const stage = project ? getProjectStageSummary(project) : undefined;

  return (
    <div className="absolute bottom-6 right-6 z-20 w-[340px] max-w-[38vw] rounded-[18px] border border-white/12 bg-[rgba(7,11,17,0.82)] p-4 backdrop-blur-xl">
      <p className="opc-kicker text-[10px]">Room</p>
      <h3 className="opc-title mt-2 text-xl text-white">{office.name}</h3>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/74">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{summary.totalAgents} agents</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{summary.activeTasks} tasks</span>
      </div>
      {stage ? <p className="mt-3 text-sm text-white/72">主阶段：{stage.primaryStage}</p> : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={`/office/${office.id}`} className="opc-nav-chip">
          打开房间
        </Link>
        {project ? (
          <Link href={`/project/${project.id}`} className="opc-nav-chip">
            查看项目
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function StarOfficeStage({ activeOfficeId, mode = "home" }: TowerProps) {
  const [selectedOfficeId, setSelectedOfficeId] = useState<OfficeId>(activeOfficeId ?? "founder");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const selectedOffice = getOfficeById(selectedOfficeId);
  const roomLinks = getRecentRoomLinks();

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#131b27,#0f1620)] shadow-[0_24px_70px_rgba(0,0,0,0.38)]">
      <div className="relative grid min-h-[980px] grid-cols-[88px_minmax(0,1fr)]">
        <aside className="z-10 flex flex-col items-center gap-3 bg-[rgba(7,11,17,0.82)] px-3 py-6 backdrop-blur-xl">
          {floors.map((floor) => {
            const active = floor.offices.includes(selectedOfficeId);

            return (
              <div
                key={floor.label}
                className={`flex h-[118px] w-full flex-col items-center justify-center rounded-[22px] border ${
                  active
                    ? "border-[rgba(245,163,93,0.38)] bg-[rgba(245,163,93,0.08)]"
                    : "border-white/8 bg-[rgba(255,255,255,0.02)]"
                }`}
              >
                <span className="opc-title text-3xl text-white">{floor.label}</span>
                <span
                  className={`mt-4 h-3 w-3 rounded-full ${
                    active ? "bg-[var(--opc-signal)] shadow-[0_0_18px_rgba(245,163,93,0.7)]" : "bg-white/18"
                  }`}
                />
              </div>
            );
          })}
        </aside>

        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />

          {floors.map((floor) => (
            <div
              key={floor.label}
              className="absolute left-[7%] right-[5%] border-t border-white/10"
              style={{ top: `${floor.top + floor.height}%` }}
            />
          ))}

          {mode !== "home" ? (
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {roomLinks.map((edge) => {
                const from = getRoomCenter(edge.fromOfficeId);
                const to = getRoomCenter(edge.toOfficeId);
                const middleX = (from.x + to.x) / 2;

                return (
                  <path
                    key={edge.id}
                    className={`opc-flight-line ${getEdgeTone(edge)}`}
                    d={`M ${from.x} ${from.y} C ${middleX} ${from.y}, ${middleX} ${to.y}, ${to.x} ${to.y}`}
                    fill="none"
                    opacity={selectedOfficeId === edge.fromOfficeId || selectedOfficeId === edge.toOfficeId ? 0.82 : 0.24}
                  />
                );
              })}
            </svg>
          ) : null}

          {Object.entries(roomFrames).map(([officeId, frame]) => {
            const office = getOfficeById(officeId);
            if (!office) {
              return null;
            }

            const agents = getOfficeAgents(office.id);
            const art = roomArt[office.id];
            const selected = office.id === selectedOfficeId;
            const anchors = getAnchors(agents.length);

            return (
              <div
                key={office.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedOfficeId(office.id);
                  setSelectedAgentId(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedOfficeId(office.id);
                    setSelectedAgentId(null);
                  }
                }}
                className={`absolute overflow-hidden rounded-[24px] border transition ${
                  selected ? "border-[rgba(245,163,93,0.28)]" : "border-white/8 hover:border-white/16"
                }`}
                style={{
                  left: `${frame.left}%`,
                  top: `${frame.top}%`,
                  width: `${frame.width}%`,
                  height: `${frame.height}%`,
                  backgroundImage: `${art.overlay}, url('${art.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: art.position ?? "center",
                  imageRendering: "pixelated",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,18,0.02),rgba(8,11,18,0.06)_35%,rgba(8,11,18,0.18)_72%,rgba(8,11,18,0.3)_100%)]" />

                <div className="pointer-events-none absolute left-3 top-3">
                  <div className="rounded-full border border-white/10 bg-[rgba(6,9,15,0.18)] px-2.5 py-1 backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/86">
                      {office.name}
                    </p>
                  </div>
                </div>

                {agents.map((agent, index) => {
                  const anchor = anchors[index] ?? anchors[anchors.length - 1];
                  const activeAgent = selectedAgentId === agent.id;

                  return (
                    <button
                      key={agent.id}
                      type="button"
                      title={agent.name}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedOfficeId(office.id);
                        setSelectedAgentId(agent.id);
                      }}
                      className={`absolute z-10 flex h-7 min-w-7 items-center justify-center rounded-full border px-2 text-[10px] font-semibold transition ${
                        activeAgent
                          ? "border-[rgba(245,163,93,0.55)] bg-[rgba(245,163,93,0.2)] text-white shadow-[0_0_18px_rgba(245,163,93,0.28)]"
                          : "border-white/10 bg-[rgba(7,11,17,0.56)] text-white/82 hover:border-white/22 hover:bg-[rgba(7,11,17,0.74)]"
                      }`}
                      style={{ left: anchor.left, top: anchor.top }}
                    >
                      <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--opc-green)]" />
                      {shortAgentLabel(agent.name)}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {selectedAgentId ? <AgentDrawer agentId={selectedAgentId} onClose={() => setSelectedAgentId(null)} /> : null}
          {!selectedAgentId && mode !== "home" && selectedOffice ? <RoomSummaryDrawer officeId={selectedOffice.id} /> : null}
        </div>
      </div>
    </section>
  );
}
