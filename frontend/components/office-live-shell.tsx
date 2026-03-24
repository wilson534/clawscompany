"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  getAgentById,
  getAgentCollaborators,
  getAgentOutputs,
  getAgentPlugins,
  getAgentSkills,
  getTaskById,
} from "@/lib/opc";
import type { LiveOfficeConfig } from "@/lib/live-offices";
import {
  agentDisplayCopy,
  artifactTitleCopy,
  humanizeCapabilityId,
  officeDisplayCopy,
  taskTitleCopy,
} from "@/lib/display-copy";
import { officeHotspots } from "@/lib/office-hotspots";

function progressLabel(percent?: number) {
  if (typeof percent !== "number") {
    return "进行中";
  }

  if (percent >= 100) {
    return "已完成";
  }

  if (percent <= 0) {
    return "待开始";
  }

  return `${percent}%`;
}

export function OfficeLiveShell({
  live,
}: {
  live: LiveOfficeConfig;
}) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const officeCopy = officeDisplayCopy[live.sourceOfficeId];
  const hotspots = officeHotspots[live.officeId] ?? [];

  const selectedAgent = useMemo(
    () => (selectedAgentId ? getAgentById(selectedAgentId) : undefined),
    [selectedAgentId],
  );

  const selectedDisplay = selectedAgent ? agentDisplayCopy[selectedAgent.id] : undefined;
  const selectedTask = selectedAgent?.currentTaskId
    ? getTaskById(selectedAgent.currentTaskId)
    : undefined;
  const collaborators = selectedAgent ? getAgentCollaborators(selectedAgent) : [];
  const outputs = selectedAgent ? getAgentOutputs(selectedAgent).slice(0, 3) : [];
  const skills = selectedAgent ? getAgentSkills(selectedAgent).slice(0, 4) : [];
  const plugins = selectedAgent ? getAgentPlugins(selectedAgent).slice(0, 4) : [];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d1117]">
      <iframe
        src={`http://127.0.0.1:${live.port}`}
        title={`${officeCopy.name} live`}
        className="h-screen w-full border-0"
      />

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="pointer-events-auto absolute left-4 top-4 flex flex-wrap gap-2">
          <Link href="/" className="opc-nav-chip bg-[rgba(7,11,17,0.62)]">
            总部
          </Link>
          <Link href={`/floor/${live.floor}`} className="opc-nav-chip bg-[rgba(7,11,17,0.62)]">
            返回楼层
          </Link>
        </div>

        <div className="pointer-events-auto absolute right-4 top-4 rounded-full border border-white/10 bg-[rgba(7,11,17,0.62)] px-4 py-2 text-xs font-semibold tracking-[0.2em] text-white/92 backdrop-blur-sm md:text-sm">
          {live.floorLabel} / {live.officeTitle}
        </div>

        <div className="pointer-events-auto absolute bottom-4 left-4 rounded-full border border-white/10 bg-[rgba(7,11,17,0.56)] px-4 py-2 text-xs text-white/74 backdrop-blur-sm md:text-sm">
          {officeCopy.hint}
        </div>

        {hotspots.map((hotspot) => {
          const display = agentDisplayCopy[hotspot.agentId];
          const agent = getAgentById(hotspot.agentId);
          const task = getTaskById(agent?.currentTaskId);
          const selected = selectedAgentId === hotspot.agentId;

          return (
            <button
              key={hotspot.agentId}
              type="button"
              className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs font-semibold shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:scale-[1.03] ${
                selected
                  ? "border-[rgba(245,163,93,0.65)] bg-[rgba(12,15,22,0.9)] text-white"
                  : "border-white/10 bg-[rgba(10,14,20,0.78)] text-white/88"
              }`}
              style={{ left: `${hotspot.left}%`, top: `${hotspot.top}%` }}
              onClick={() =>
                setSelectedAgentId((current) =>
                  current === hotspot.agentId ? null : hotspot.agentId,
                )
              }
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#58d68d]" />
                {display?.shortLabel ?? hotspot.agentId}
                <span className="hidden text-white/50 md:inline">
                  {progressLabel(task?.percent)}
                </span>
              </span>
            </button>
          );
        })}

        {selectedAgent && selectedDisplay ? (
          <aside className="pointer-events-auto absolute bottom-4 right-4 w-[min(390px,calc(100vw-2rem))] rounded-[28px] border border-white/10 bg-[rgba(7,11,17,0.82)] p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.48)] backdrop-blur-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[var(--opc-signal)]">
                  AGENT DETAIL
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  {selectedDisplay.displayName}
                </h2>
                <p className="mt-1 text-sm text-white/70">{selectedDisplay.title}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
                onClick={() => setSelectedAgentId(null)}
              >
                关闭
              </button>
            </div>

            <p className="mb-4 text-sm leading-7 text-white/80">
              {selectedDisplay.tagline}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[rgba(88,214,141,0.3)] bg-[rgba(88,214,141,0.1)] px-3 py-1 text-xs text-[#7ee2aa]">
                {selectedTask ? progressLabel(selectedTask.percent) : "进行中"}
              </span>
              {selectedTask?.dueAt ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  截止{" "}
                  {new Date(selectedTask.dueAt).toLocaleString("zh-CN", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              ) : null}
            </div>

            <div className="space-y-4 text-sm">
              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  当前任务
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/88">
                  {selectedTask
                    ? taskTitleCopy[selectedTask.id] ?? selectedTask.title
                    : "当前没有挂起任务"}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  擅长
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDisplay.strengths.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/82"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-full border border-[rgba(245,163,93,0.18)] bg-[rgba(245,163,93,0.08)] px-3 py-1 text-white/82"
                    >
                      {humanizeCapabilityId(skill.id)}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  Tools / Plugins
                </p>
                <div className="flex flex-wrap gap-2">
                  {plugins.map((plugin) => (
                    <span
                      key={plugin.id}
                      className="rounded-full border border-[rgba(88,166,255,0.2)] bg-[rgba(88,166,255,0.08)] px-3 py-1 text-white/82"
                    >
                      {humanizeCapabilityId(plugin.id)}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  最近产物
                </p>
                <div className="space-y-2">
                  {outputs.length ? (
                    outputs.map((artifact) => (
                      <div
                        key={artifact.id}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/82"
                      >
                        {artifactTitleCopy[artifact.id] ?? artifact.title}
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/55">
                      这位 agent 当前还没有挂出公开产物。
                    </div>
                  )}
                </div>
              </section>

              <section>
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-white/45">
                  Collaborators
                </p>
                <div className="flex flex-wrap gap-2">
                  {collaborators.map((agent) => {
                    const collaborator = agentDisplayCopy[agent.id];
                    return (
                      <span
                        key={agent.id}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/72"
                      >
                        {collaborator?.displayName ?? agent.name}
                      </span>
                    );
                  })}
                </div>
              </section>
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
