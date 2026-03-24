import Link from "next/link";
import {
  formatShortDate,
  getAgentById,
  getArtifactById,
  getProjectById,
  getTaskById,
  getStatusTone,
} from "@/lib/opc";
import type { CollaborationEdge } from "@/lib/opc-types";

type HandoffReplayDeckProps = {
  edges: CollaborationEdge[];
  activeEdgeId?: string;
  basePath: string;
  title?: string;
  description?: string;
};

function toEdgeStatusTone(edge: CollaborationEdge) {
  if (edge.status === "blocked") {
    return getStatusTone("escalated");
  }

  if (edge.handoffType === "review") {
    return getStatusTone("reviewing");
  }

  if (edge.status === "received") {
    return getStatusTone("completed");
  }

  return getStatusTone("working");
}

function handoffLabel(edge: CollaborationEdge) {
  const labels: Record<CollaborationEdge["handoffType"], string> = {
    handoff: "任务交接",
    review: "评审确认",
    escalation: "升级拍板",
    sync: "信息同步",
  };

  return labels[edge.handoffType];
}

function nextActionLabel(edge: CollaborationEdge) {
  if (edge.status === "blocked") {
    return "需要立即处理阻塞项并重新拍板。";
  }

  if (edge.handoffType === "review") {
    return "等待下游角色确认并给出结论。";
  }

  if (edge.handoffType === "sync") {
    return "同步结果已经发出，下一步进入优先级调整。";
  }

  return "继续把当前产物推进到下一办公室。";
}

function replayHref(basePath: string, edgeId: string) {
  return `${basePath}?edge=${edgeId}#handoff-replay`;
}

export function HandoffReplayDeck({
  edges,
  activeEdgeId,
  basePath,
  title = "A2A Replay",
  description = "按真实交接时间线回放项目如何在办公室之间流动，并支持快速钻取到人、项目和产物。",
}: HandoffReplayDeckProps) {
  if (!edges.length) {
    return <p className="text-sm text-[var(--opc-muted)]">当前没有可回放的 A2A 交接。</p>;
  }

  const timeline = [...edges].sort((left, right) => left.updatedAt.localeCompare(right.updatedAt));
  const activeEdge = timeline.find((edge) => edge.id === activeEdgeId) ?? timeline[timeline.length - 1];
  const fromAgent = getAgentById(activeEdge.fromAgentId);
  const toAgent = getAgentById(activeEdge.toAgentId);
  const project = getProjectById(activeEdge.projectId);
  const artifact = activeEdge.artifactId ? getArtifactById(activeEdge.artifactId) : undefined;
  const fromTask = getTaskById(fromAgent?.currentTaskId);
  const toTask = getTaskById(toAgent?.currentTaskId);

  return (
    <div
      id="handoff-replay"
      className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.48fr)]"
    >
      <div className="space-y-3">
        <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
          <p className="opc-kicker">{title}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--opc-muted)]">{description}</p>
        </div>
        <div className="space-y-3">
          {timeline.map((edge, index) => {
            const selected = edge.id === activeEdge.id;
            const source = getAgentById(edge.fromAgentId);
            const target = getAgentById(edge.toAgentId);

            return (
              <Link
                key={edge.id}
                href={replayHref(basePath, edge.id)}
                className={`block rounded-[22px] border p-4 transition ${
                  selected
                    ? "border-[rgba(245,163,93,0.4)] bg-[rgba(245,163,93,0.08)]"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/7"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
                      Step {index + 1}
                    </span>
                    <span className={`opc-badge border ${toEdgeStatusTone(edge)}`}>{handoffLabel(edge)}</span>
                  </div>
                  <span className="text-xs text-[var(--opc-muted)]">{formatShortDate(edge.updatedAt)}</span>
                </div>
                <h4 className="mt-3 text-lg font-semibold text-white">
                  {source?.name ?? edge.fromAgentId} → {target?.name ?? edge.toAgentId}
                </h4>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{edge.summary}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
        <p className="opc-kicker">Quick Drill-down</p>
        <h4 className="opc-title mt-2 text-2xl font-semibold text-white">{handoffLabel(activeEdge)}</h4>
        <p className="mt-3 text-sm leading-7 text-[var(--opc-muted)]">{activeEdge.summary}</p>

        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Source</p>
            <p className="mt-2 text-base font-semibold text-white">{fromAgent?.name ?? activeEdge.fromAgentId}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--opc-muted)]">{fromTask?.title ?? "当前未绑定任务"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Target</p>
            <p className="mt-2 text-base font-semibold text-white">{toAgent?.name ?? activeEdge.toAgentId}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--opc-muted)]">{toTask?.title ?? "等待接收后续任务"}</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Project</p>
            <p className="mt-2 text-base font-semibold text-white">{project?.name ?? activeEdge.projectId}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Artifact</p>
            <p className="mt-2 text-base font-semibold text-white">
              {artifact?.title ?? "本步骤没有独立产物，当前以项目状态同步为主"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Next Move</p>
            <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{nextActionLabel(activeEdge)}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {fromAgent ? (
            <Link href={`/agent/${fromAgent.id}`} className="opc-nav-chip">
              查看 Source Agent
            </Link>
          ) : null}
          {toAgent ? (
            <Link href={`/agent/${toAgent.id}`} className="opc-nav-chip">
              查看 Target Agent
            </Link>
          ) : null}
          {artifact ? (
            <Link href={`/artifact/${artifact.id}`} className="opc-nav-chip">
              打开 Artifact
            </Link>
          ) : (
            <Link href={`/project/${activeEdge.projectId}`} className="opc-nav-chip">
              打开 Project
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
