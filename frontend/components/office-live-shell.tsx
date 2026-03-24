import Link from "next/link";
import { DepartmentOpsPanel } from "@/components/department-ops-panels";
import { SignalStrip, departmentIcon, makeHudItem, sharedHudIcons } from "@/components/ops-hud";
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
  selectedAgentId,
}: {
  live: LiveOfficeConfig;
  selectedAgentId?: string | null;
}) {
  const officeCopy = officeDisplayCopy[live.sourceOfficeId];
  const hotspots = officeHotspots[live.officeId] ?? [];
  const activeCount = hotspots.length || live.agentIds.length;

  const selectedAgent = selectedAgentId ? getAgentById(selectedAgentId) : undefined;
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

      <div className="pointer-events-auto absolute left-4 top-4 z-30 flex flex-wrap gap-2">
        <Link href="/" className="opc-nav-chip bg-[rgba(7,11,17,0.66)]">
          返回总部
        </Link>
        <Link href={`/floor/${live.floor}`} className="opc-nav-chip bg-[rgba(7,11,17,0.66)]">
          返回楼层
        </Link>
      </div>

      <div className="pointer-events-auto absolute right-4 top-4 z-30 border-2 border-white bg-black px-4 py-2 text-xs font-bold tracking-[0.2em] text-white uppercase font-mono md:text-sm">
        {live.floorLabel} / {live.officeTitle}
      </div>

      <div className="pointer-events-auto absolute left-1/2 top-16 z-30 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2">
        <SignalStrip
          items={[
            makeHudItem(departmentIcon(live.sourceOfficeId), "部门", officeCopy.name),
            makeHudItem(sharedHudIcons.agents(), "活跃 Agent", `${activeCount} 位`),
            makeHudItem(sharedHudIcons.live(), "场景", "Star Office Live"),
            makeHudItem(sharedHudIcons.flow(), "交互", "点击悬浮标记查看 profile"),
          ]}
        />
      </div>

      <DepartmentOpsPanel officeId={live.officeId} />

      {hotspots.map((hotspot) => {
        const display = agentDisplayCopy[hotspot.agentId];
        const agent = getAgentById(hotspot.agentId);
        const task = agent?.currentTaskId ? getTaskById(agent.currentTaskId) : undefined;
        const selected = selectedAgentId === hotspot.agentId;

        return (
          <Link
            key={hotspot.agentId}
            href={`/office/${live.officeId}?agent=${hotspot.agentId}`}
            className={`pointer-events-auto absolute z-30 -translate-x-1/2 -translate-y-1/2 border-2 px-3 py-2 text-xs font-bold uppercase font-mono transition hover:scale-[1.03] ${
              selected
                ? "border-[rgba(245,163,93,0.72)] bg-black text-white"
                : "border-white bg-black text-white/88"
            }`}
            style={{ left: `${hotspot.left}%`, top: `${hotspot.top}%` }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-[#58d68d]" />
              {display?.shortLabel ?? hotspot.agentId}
              <span className="hidden text-white/50 md:inline">{progressLabel(task?.percent)}</span>
            </span>
          </Link>
        );
      })}

      {selectedAgent && selectedDisplay ? (
        <aside className="pointer-events-auto absolute bottom-4 right-4 z-30 w-[min(410px,calc(100vw-2rem))] border-2 border-white bg-black p-5 text-white">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-[var(--opc-signal)] uppercase font-mono">
                AGENT PROFILE
              </p>
              <h2 className="mt-2 text-2xl font-black text-white uppercase">
                {selectedDisplay.displayName}
              </h2>
              <p className="mt-1 text-sm text-white/70 font-mono uppercase">{selectedDisplay.title}</p>
            </div>
            <Link
              href={`/office/${live.officeId}`}
              className="border-2 border-white/50 px-3 py-1.5 text-xs text-white/70 transition hover:border-white hover:text-white uppercase font-mono"
            >
              关闭
            </Link>
          </div>

          <p className="mb-4 text-sm leading-7 text-white/80 font-mono">{selectedDisplay.tagline}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            <span className="border-2 border-[rgba(88,214,141,0.5)] bg-[rgba(88,214,141,0.1)] px-3 py-1 text-xs text-[#7ee2aa] font-mono uppercase">
              {selectedTask ? progressLabel(selectedTask.percent) : "进行中"}
            </span>
            {selectedTask?.dueAt ? (
              <span className="border-2 border-white/20 bg-white/5 px-3 py-1 text-xs text-white/70 font-mono uppercase">
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
            <Link
              href={`/agent/${selectedAgent.id}`}
              className="border-2 border-white/20 bg-white/5 px-3 py-1 text-xs text-white/78 transition hover:border-white/50 hover:text-white font-mono uppercase"
            >
              完整档案
            </Link>
          </div>

          <div className="space-y-4 text-sm">
            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                当前任务
              </p>
              <div className="border border-white/20 bg-white/5 px-4 py-3 text-white/88 font-mono">
                {selectedTask
                  ? taskTitleCopy[selectedTask.id] ?? selectedTask.title
                  : "当前没有挂起任务"}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                擅长
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDisplay.strengths.map((item) => (
                  <span
                    key={item}
                    className="border border-white/20 bg-white/5 px-3 py-1 text-white/82 font-mono"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.length ? (
                  skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="border-2 border-[rgba(245,163,93,0.5)] bg-[rgba(245,163,93,0.08)] px-3 py-1 text-white/82 font-mono uppercase"
                    >
                      {humanizeCapabilityId(skill.id)}
                    </span>
                  ))
                ) : (
                  <span className="border-2 border-white/20 bg-white/5 px-3 py-1 text-white/55 font-mono uppercase">
                    暂无挂接 skill
                  </span>
                )}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                Tools / Plugins
              </p>
              <div className="flex flex-wrap gap-2">
                {plugins.length ? (
                  plugins.map((plugin) => (
                    <span
                      key={plugin.id}
                      className="border-2 border-[rgba(88,166,255,0.5)] bg-[rgba(88,166,255,0.08)] px-3 py-1 text-white/82 font-mono uppercase"
                    >
                      {humanizeCapabilityId(plugin.id)}
                    </span>
                  ))
                ) : (
                  <span className="border-2 border-white/20 bg-white/5 px-3 py-1 text-white/55 font-mono uppercase">
                    暂无挂接工具
                  </span>
                )}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                最近产物
              </p>
              <div className="space-y-2">
                {outputs.length ? (
                  outputs.map((artifact) => (
                    <div
                      key={artifact.id}
                      className="border-2 border-white/20 bg-white/5 px-4 py-3 text-white/82 font-mono"
                    >
                      {artifactTitleCopy[artifact.id] ?? artifact.title}
                    </div>
                  ))
                ) : (
                  <div className="border-2 border-white/20 bg-white/5 px-4 py-3 text-white/55 font-mono">
                    这位 agent 当前还没有挂出公开产物。
                  </div>
                )}
              </div>
            </section>

            <section>
              <p className="mb-2 text-xs font-bold tracking-[0.18em] text-white/45 uppercase font-mono">
                Collaborators
              </p>
              <div className="flex flex-wrap gap-2">
                {collaborators.length ? (
                  collaborators.map((agent) => {
                    const collaborator = agentDisplayCopy[agent.id];
                    return (
                      <span
                        key={agent.id}
                        className="border-2 border-white/20 bg-white/5 px-3 py-1 text-white/72 font-mono uppercase"
                      >
                        {collaborator?.displayName ?? agent.name}
                      </span>
                    );
                  })
                ) : (
                  <span className="border-2 border-white/20 bg-white/5 px-3 py-1 text-white/55 font-mono uppercase">
                    当前没有显式协作者
                  </span>
                )}
              </div>
            </section>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
