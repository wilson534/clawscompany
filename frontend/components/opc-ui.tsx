import type { ReactNode } from "react";
import Link from "next/link";
import {
  formatShortDate,
  formatStatusLabel,
  getAgentById,
  getAgentCollaborators,
  getAgentEdges,
  getAgentOutputs,
  getAgentPlugins,
  getAgentSkills,
  getEdgeTone,
  getLogsForModule,
  getOfficeAgents,
  getOfficeById,
  getOfficeEdges,
  getOfficeSummary,
  getProjectArtifacts,
  getProjectStageSummary,
  getReleaseArtifact,
  getSnapshotsForModule,
  getStatusTone,
  getTaskById,
  officeVisuals,
  summarizeEdge,
} from "@/lib/opc";
import type {
  AgentProfile,
  AgentTask,
  Artifact,
  ArtifactContentBlock,
  BusinessJsonSnapshot,
  CollaborationEdge,
  CompanyMetric,
  Office,
  OfficeId,
  PartnerCandidate,
  Project,
  SystemLogEntry,
  TeamMemberContext,
} from "@/lib/opc-types";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
};

type SectionCardProps = {
  title: string;
  kicker?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

type TaskListProps = {
  tasks: AgentTask[];
  showOffice?: boolean;
  showProject?: boolean;
  compact?: boolean;
  emptyText?: string;
};

type HandoffFeedProps = {
  edges: CollaborationEdge[];
  emptyText?: string;
};

type StageBlueprint = {
  eyebrow: string;
  blurb: string;
  props: string[];
  light: string;
};

const stageBlueprints: Record<OfficeId, StageBlueprint> = {
  founder: {
    eyebrow: "Founder Stage",
    blurb: "超大经营屏、火箭模型和决策警报灯一起构成 Founder 的压迫感。",
    props: ["经营大屏", "决策印章", "风险警报灯", "火箭模型"],
    light: "radial-gradient(circle at top, rgba(245,163,93,0.28), transparent 42%)",
  },
  team: {
    eyebrow: "Team Stage",
    blurb: "真实成员的长板、成就墙和当前负责模块都在这里并排展开。",
    props: ["成就墙", "社媒徽章", "代码工位", "团队白板"],
    light: "radial-gradient(circle at top, rgba(88,166,255,0.22), transparent 42%)",
  },
  intel: {
    eyebrow: "Intel Stage",
    blurb: "热点墙、趋势屏和痛点便利贴让这里像一间信息战房。",
    props: ["热点墙", "趋势屏", "信号便签", "排名板"],
    light: "radial-gradient(circle at top, rgba(82,212,138,0.22), transparent 42%)",
  },
  investment: {
    eyebrow: "Committee Stage",
    blurb: "立项会桌、评分牌和通过印章把热度压成真正的立项判断。",
    props: ["立项会桌", "评分牌", "通过印章", "ROI 仪表"],
    light: "radial-gradient(circle at top, rgba(244,207,102,0.2), transparent 42%)",
  },
  design: {
    eyebrow: "Design Stage",
    blurb: "色卡墙、字体板和画面情绪板决定产品是否一眼能打动评委。",
    props: ["色卡墙", "字体板", "Moodboard", "原型屏"],
    light: "radial-gradient(circle at top, rgba(255,138,165,0.22), transparent 42%)",
  },
  engineering: {
    eyebrow: "Build Stage",
    blurb: "多屏终端、咖啡杯和熬夜工位一起把工程部的秃头气质拉满。",
    props: ["终端墙", "构建灯", "设备预览", "咖啡堆"],
    light: "radial-gradient(circle at top, rgba(88,166,255,0.24), transparent 42%)",
  },
  qa: {
    eyebrow: "QA Stage",
    blurb: "放大镜、问题贴纸和红色回归板让每个风险都有落点。",
    props: ["问题贴纸", "回归板", "风险雷达", "放大镜"],
    light: "radial-gradient(circle at top, rgba(255,107,107,0.22), transparent 42%)",
  },
  release: {
    eyebrow: "Release Stage",
    blurb: "截图墙、metadata 控制台和审核清单把这里做成真正的上架房间。",
    props: ["截图墙", "Metadata 台", "审核清单", "图标实验区"],
    light: "radial-gradient(circle at top, rgba(82,212,138,0.22), transparent 42%)",
  },
  growth: {
    eyebrow: "Growth Stage",
    blurb: "社媒通知泡泡、话题板和漏斗图把首发节奏讲得更可信。",
    props: ["社媒通知", "话题板", "传播漏斗", "内容排期"],
    light: "radial-gradient(circle at top, rgba(245,163,93,0.22), transparent 42%)",
  },
  partner: {
    eyebrow: "Partner Stage",
    blurb: "渠道地图、合作名单墙和握手台把外部势能可视化。",
    props: ["渠道地图", "合作名单", "握手台", "候选雷达"],
    light: "radial-gradient(circle at top, rgba(143,141,252,0.22), transparent 42%)",
  },
};

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  aside,
  children,
}: PageShellProps) {
  return (
    <div className="grid min-h-full w-full gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <section className="opc-surface relative overflow-hidden rounded-[30px] p-6 md:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(245,163,93,0.22),transparent_45%),radial-gradient(circle_at_top_right,rgba(88,166,255,0.18),transparent_45%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="opc-kicker">{eyebrow}</p>
              <div className="space-y-3">
                <h2 className="opc-title text-3xl font-semibold text-white md:text-5xl">{title}</h2>
                <p className="max-w-4xl text-sm leading-7 text-[var(--opc-muted)] md:text-base">
                  {description}
                </p>
              </div>
            </div>
            {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>
        </section>
        {children}
      </div>
      <div className="space-y-6">{aside}</div>
    </div>
  );
}

export function SectionCard({
  title,
  kicker,
  description,
  actions,
  children,
  className,
}: SectionCardProps) {
  return (
    <section className={`opc-surface rounded-[24px] p-5 md:p-6 ${className ?? ""}`.trim()}>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          {kicker ? <p className="opc-kicker">{kicker}</p> : null}
          <h3 className="opc-title text-xl font-semibold text-white">{title}</h3>
          {description ? (
            <p className="max-w-3xl text-sm leading-7 text-[var(--opc-muted)]">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
      {children}
    </section>
  );
}

export function StatusBadge({ status }: { status: AgentProfile["status"] | AgentTask["status"] }) {
  return <span className={`opc-badge border ${getStatusTone(status)}`}>{formatStatusLabel(status)}</span>;
}

export function MetricGrid({ metrics }: { metrics: CompanyMetric[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.id} className="opc-metric-card">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--opc-muted)]">{metric.label}</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <strong className="opc-title text-3xl text-white">{metric.value}</strong>
            <span
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                metric.trend === "up"
                  ? "text-[var(--opc-green)]"
                  : metric.trend === "down"
                    ? "text-[var(--opc-red)]"
                    : "text-[var(--opc-muted)]"
              }`}
            >
              {metric.trend ?? "flat"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="opc-progress-track">
      <div className="opc-progress-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function SceneLegend() {
  const items = [
    { label: "handoff", tone: "opc-flight-line--handoff", copy: "任务包正在正常流转" },
    { label: "review", tone: "opc-flight-line--review", copy: "等待评审与确认" },
    { label: "escalation", tone: "opc-flight-line--escalation", copy: "需要关键负责人拍板" },
    { label: "sync", tone: "opc-flight-line--sync", copy: "跨办公室信息同步" },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <svg className="h-4 w-10" viewBox="0 0 40 8" preserveAspectRatio="none">
              <line className={`opc-flight-line ${item.tone}`} x1={0} y1={4} x2={40} y2={4} />
            </svg>
            <p className="text-sm font-semibold text-white">{item.label}</p>
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--opc-muted)]">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}

export function TaskList({
  tasks,
  showOffice = false,
  showProject = false,
  compact = false,
  emptyText = "当前没有任务。",
}: TaskListProps) {
  if (!tasks.length) {
    return <p className="text-sm text-[var(--opc-muted)]">{emptyText}</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const owner = getAgentById(task.ownerAgentId);
        const office = getOfficeById(task.officeId);

        return (
          <article key={task.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <div
              className={`flex gap-4 ${
                compact ? "flex-col" : "flex-col xl:flex-row xl:items-start xl:justify-between"
              }`}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={task.status} />
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
                    {task.stage}
                  </span>
                  {showOffice && office ? (
                    <Link href={`/office/${office.id}`} className="text-xs text-[var(--opc-blue)] hover:text-white">
                      {office.name}
                    </Link>
                  ) : null}
                  {showProject ? (
                    <Link
                      href={`/project/${task.projectId}`}
                      className="text-xs text-[var(--opc-signal)] hover:text-white"
                    >
                      查看项目
                    </Link>
                  ) : null}
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                  <p className="text-sm text-[var(--opc-muted)]">
                    负责人：{owner?.name ?? "未知"} · 更新于 {formatShortDate(task.updatedAt)}
                  </p>
                </div>
                <ProgressBar value={task.percent} />
                <div className="grid gap-3 text-sm text-[var(--opc-muted)] md:grid-cols-2">
                  <p>下一步：{task.nextAction ?? "待同步"}</p>
                  <p>阻塞项：{task.blocker ?? "暂无"}</p>
                </div>
              </div>
              <div className="min-w-[120px] text-right">
                <p className="opc-title text-3xl text-white">{task.percent}%</p>
                {task.dueAt ? (
                  <p className="mt-2 text-xs text-[var(--opc-muted)]">截止 {formatShortDate(task.dueAt)}</p>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function BuildingScene({
  offices,
  edges,
}: {
  offices: Office[];
  edges: CollaborationEdge[];
}) {
  const officeIndex = Object.fromEntries(offices.map((office) => [office.id, office]));

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(8,13,19,0.92)] p-4 md:p-6">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-2">
          <p className="opc-kicker">Office Stage</p>
          <h3 className="opc-title text-2xl font-semibold text-white">总部大楼正在运转</h3>
          <p className="max-w-2xl text-sm leading-7 text-[var(--opc-muted)]">
            每个房间都对应真实部门、真实任务和真实产物，飞线层则映射真实的 A2A handoff。
          </p>
        </div>
        <div className="grid min-w-[280px] grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Offices</p>
            <p className="mt-2 text-2xl font-semibold text-white">{offices.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">A2A</p>
            <p className="mt-2 text-2xl font-semibold text-white">{edges.length}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">Live</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {offices.filter((office) => office.status === "working" || office.status === "reviewing").length}
            </p>
          </div>
        </div>
      </div>

      <SceneLegend />

      <div className="relative mt-6 h-[720px] rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_60%)]">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {edges.map((edge) => {
            const fromAgent = getAgentById(edge.fromAgentId);
            const toAgent = getAgentById(edge.toAgentId);
            const fromOffice = fromAgent ? officeIndex[fromAgent.officeId] : undefined;
            const toOffice = toAgent ? officeIndex[toAgent.officeId] : undefined;

            if (!fromOffice || !toOffice) {
              return null;
            }

            const fromVisual = officeVisuals[fromOffice.id];
            const toVisual = officeVisuals[toOffice.id];
            const x1 = fromVisual.x + fromVisual.w / 2;
            const y1 = fromVisual.y + fromVisual.h / 2;
            const x2 = toVisual.x + toVisual.w / 2;
            const y2 = toVisual.y + toVisual.h / 2;

            return (
              <line
                key={edge.id}
                className={`opc-flight-line ${getEdgeTone(edge)}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                opacity={0.8}
              />
            );
          })}
        </svg>

        {offices.map((office) => {
          const visual = officeVisuals[office.id];
          const summary = getOfficeSummary(office.id);
          const officeAgents = getOfficeAgents(office.id);

          return (
            <Link
              key={office.id}
              href={`/office/${office.id}`}
              className="opc-room opc-room-card absolute rounded-[22px] p-4"
              style={{
                left: `${visual.x}%`,
                top: `${visual.y}%`,
                width: `${visual.w}%`,
                height: `${visual.h}%`,
                background: `linear-gradient(180deg, ${visual.bg}, rgba(8,12,18,0.96))`,
                boxShadow: `0 18px 40px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 1px ${visual.accent}20`,
              }}
            >
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em]"
                      style={{ color: visual.accent }}
                    >
                      {visual.label}
                    </span>
                    <StatusBadge status={office.status} />
                  </div>
                  <div>
                    <h4 className="opc-title text-lg font-semibold text-white">{office.name}</h4>
                    <p className="text-sm leading-6 text-[var(--opc-muted)]">{office.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-4 gap-2 text-xs text-[var(--opc-muted)]">
                    <div>
                      <p>Agents</p>
                      <strong className="text-base text-white">{summary.totalAgents}</strong>
                    </div>
                    <div>
                      <p>Tasks</p>
                      <strong className="text-base text-white">{summary.activeTasks}</strong>
                    </div>
                    <div>
                      <p>Outputs</p>
                      <strong className="text-base text-white">{summary.artifacts}</strong>
                    </div>
                    <div>
                      <p>A2A</p>
                      <strong className="text-base text-white">{summary.handoffs}</strong>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {officeAgents.slice(0, 3).map((agent) => (
                      <span
                        key={agent.id}
                        className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] text-white"
                      >
                        {agent.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function EventFeed({ edges, emptyText = "当前没有交接事件。" }: HandoffFeedProps) {
  if (!edges.length) {
    return <p className="text-sm text-[var(--opc-muted)]">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {edges.map((edge) => (
        <Link
          key={edge.id}
          href={edge.artifactId ? `/artifact/${edge.artifactId}` : `/project/${edge.projectId}`}
          className="block rounded-[20px] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/7"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className={`opc-badge border ${getStatusTone(edge.status === "blocked" ? "escalated" : "working")}`}>
              {edge.handoffType}
            </span>
            <span className="text-xs text-[var(--opc-muted)]">{formatShortDate(edge.updatedAt)}</span>
          </div>
          <h4 className="mt-3 text-lg font-semibold text-white">{summarizeEdge(edge)}</h4>
          <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{edge.summary}</p>
        </Link>
      ))}
    </div>
  );
}

export function AgentCloud({ agents }: { agents: AgentProfile[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {agents.map((agent) => (
        <Link
          key={agent.id}
          href={`/agent/${agent.id}`}
          className="rounded-[22px] border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/7"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <p className="opc-kicker">{agent.officeId}</p>
              <h4 className="text-lg font-semibold text-white">{agent.name}</h4>
              <p className="text-sm text-[var(--opc-muted)]">{agent.title}</p>
            </div>
            <StatusBadge status={agent.status} />
          </div>
          <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(245,163,93,0.18),transparent_55%),rgba(255,255,255,0.05)] text-xl font-semibold text-white">
            {agent.name.slice(0, 1)}
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--opc-muted)]">{agent.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {agent.personalityTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-[var(--opc-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CompactLogList({ logs }: { logs: SystemLogEntry[] }) {
  if (!logs.length) {
    return <p className="text-sm text-[var(--opc-muted)]">当前没有系统日志。</p>;
  }

  return (
    <div>
      {logs.map((log) => (
        <div key={log.id} className="opc-log-row">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`opc-badge border ${
                log.level === "error"
                  ? "text-[var(--opc-red)] border-[rgba(255,107,107,0.3)] bg-[rgba(255,107,107,0.12)]"
                  : log.level === "warn"
                    ? "text-[var(--opc-yellow)] border-[rgba(244,207,102,0.3)] bg-[rgba(244,207,102,0.12)]"
                    : "text-[var(--opc-green)] border-[rgba(82,212,138,0.3)] bg-[rgba(82,212,138,0.12)]"
              }`}
            >
              {log.level}
            </span>
            <span className="text-xs text-[var(--opc-muted)]">{formatShortDate(log.timestamp)}</span>
          </div>
          <p className="mt-3 font-semibold text-white">{log.event}</p>
          <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{log.message}</p>
        </div>
      ))}
    </div>
  );
}

export function BusinessJsonPanel({ snapshot }: { snapshot: BusinessJsonSnapshot }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{snapshot.moduleId}</p>
          <p className="text-xs text-[var(--opc-muted)]">{formatShortDate(snapshot.updatedAt)}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
          {snapshot.moduleType}
        </span>
      </div>
      <pre className="opc-json">{JSON.stringify(snapshot, null, 2)}</pre>
    </div>
  );
}

export function ObservabilityStack({ moduleId }: { moduleId: string }) {
  const snapshots = getSnapshotsForModule(moduleId);
  const logs = getLogsForModule(moduleId);

  return (
    <div className="space-y-6">
      <SectionCard
        title="业务 JSON"
        kicker="Observability"
        description="模块输入、关键中间结果和输出都在这里可见。"
      >
        <div className="space-y-4">
          {snapshots.length ? (
            snapshots.map((snapshot) => <BusinessJsonPanel key={snapshot.id} snapshot={snapshot} />)
          ) : (
            <p className="text-sm text-[var(--opc-muted)]">当前模块暂无业务快照。</p>
          )}
        </div>
      </SectionCard>
      <SectionCard
        title="系统日志"
        kicker="Runtime"
        description="记录关键调用、耗时、异常和最终状态。"
      >
        <CompactLogList logs={logs} />
      </SectionCard>
    </div>
  );
}

function ArtifactBlock({ block }: { block: ArtifactContentBlock }) {
  switch (block.kind) {
    case "markdown":
      return (
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          {block.title ? <h4 className="mb-3 text-base font-semibold text-white">{block.title}</h4> : null}
          <p className="whitespace-pre-wrap text-sm leading-7 text-[var(--opc-muted)]">{block.markdown}</p>
        </div>
      );
    case "list":
      return (
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          {block.title ? <h4 className="mb-3 text-base font-semibold text-white">{block.title}</h4> : null}
          <ul className="space-y-2">
            {block.items.map((item) => (
              <li key={item} className="text-sm leading-7 text-[var(--opc-muted)]">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "kv":
      return (
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          {block.title ? <h4 className="mb-3 text-base font-semibold text-white">{block.title}</h4> : null}
          <div className="grid gap-3">
            {block.entries.map((entry) => (
              <div key={entry.label} className="grid gap-1 md:grid-cols-[160px_minmax(0,1fr)]">
                <p className="text-sm font-medium text-white">{entry.label}</p>
                <p className="text-sm leading-7 text-[var(--opc-muted)]">{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "code":
      return (
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          {block.title ? <h4 className="mb-3 text-base font-semibold text-white">{block.title}</h4> : null}
          <pre className="opc-json">{block.code}</pre>
        </div>
      );
    case "checklist":
      return (
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          {block.title ? <h4 className="mb-3 text-base font-semibold text-white">{block.title}</h4> : null}
          <div className="space-y-2">
            {block.items.map((item) => (
              <div key={item.label} className="flex items-start gap-3 text-sm text-[var(--opc-muted)]">
                <span className={item.checked ? "text-[var(--opc-green)]" : "text-[var(--opc-red)]"}>
                  {item.checked ? "✓" : "○"}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function ArtifactContentRenderer({ artifact }: { artifact: Artifact }) {
  return (
    <div className="space-y-4">
      {artifact.contentBlocks.map((block) => (
        <ArtifactBlock key={block.id} block={block} />
      ))}
    </div>
  );
}

export function TeamGrid({ members }: { members: TeamMemberContext[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {members.map((member) => (
        <article key={member.id} className="rounded-[22px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="opc-kicker">{member.memberName}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{member.role}</h4>
            </div>
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
              {member.capacityStatus}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            <p className="text-sm leading-7 text-[var(--opc-muted)]">{member.targetTypes.join(" / ")}</p>
            <div className="flex flex-wrap gap-2">
              {member.strengths.map((strength) => (
                <span key={strength} className="opc-stage-chip">
                  {strength}
                </span>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <p className="text-sm font-semibold text-white">当前聚焦</p>
              <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{member.currentFocus.join(" / ")}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function TeamCapabilityBoard({ members }: { members: TeamMemberContext[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {members.map((member) => (
        <div key={member.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
          <p className="opc-kicker">{member.memberName}</p>
          <h4 className="mt-2 text-lg font-semibold text-white">{member.role}</h4>
          <p className="mt-3 text-sm leading-7 text-[var(--opc-muted)]">{member.targetTypes.join(" / ")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {member.activeOfficeIds.map((officeId) => (
              <span
                key={officeId}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-[var(--opc-muted)]"
              >
                {officeId}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PartnerTable({ partners }: { partners: PartnerCandidate[] }) {
  const statusLabel: Record<PartnerCandidate["status"], string> = {
    candidate: "候选中",
    contacted: "已接触",
    active: "推进中",
    strategic: "战略级",
  };

  return (
    <div className="space-y-3">
      {partners.map((partner) => {
        const owner = getAgentById(partner.ownerAgentId);
        const linkedTask = getTaskById(partner.linkedTaskIds[0]);

        return (
          <article key={partner.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="opc-kicker">{partner.type}</p>
                <h4 className="mt-2 text-lg font-semibold text-white">{partner.name}</h4>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{partner.valueSummary}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
                {statusLabel[partner.status]}
              </span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-[var(--opc-muted)] md:grid-cols-2">
              <p>负责人：{owner?.name ?? "待分配"}</p>
              <p>下一步：{partner.nextAction}</p>
              <p>当前任务：{linkedTask?.title ?? "待创建跟进任务"}</p>
              <p>截止时间：{linkedTask?.dueAt ? formatShortDate(linkedTask.dueAt) : "待定"}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function OfficeStage({ office }: { office: Office }) {
  const agents = getOfficeAgents(office.id);
  const edges = getOfficeEdges(office.id).slice(0, 6);
  const blueprint = stageBlueprints[office.id];
  const summary = getOfficeSummary(office.id);
  const packetEdges = edges.slice(0, 4);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_320px]">
      <div className="opc-stage">
        <div className="opc-stage-glow" style={{ backgroundImage: blueprint.light }} />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="opc-kicker">{blueprint.eyebrow}</p>
            <h4 className="opc-title text-2xl text-white">{office.name}</h4>
            <p className="max-w-2xl text-sm leading-7 text-[var(--opc-muted)]">{blueprint.blurb}</p>
          </div>
          <StatusBadge status={office.status} />
        </div>

        <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <div className="space-y-3">
            {blueprint.props.map((item) => (
              <div key={item} className="opc-stage-prop">
                {item}
              </div>
            ))}
          </div>
          <div className="relative min-h-[360px] rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
            <div className="pointer-events-none absolute inset-x-6 bottom-6 h-16 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] blur-xl" />
            <div className="opc-packet-strip relative z-10 mb-4">
              {packetEdges.map((edge) => (
                <Link
                  key={edge.id}
                  href={edge.artifactId ? `/artifact/${edge.artifactId}` : `/project/${edge.projectId}`}
                  className={`opc-packet opc-packet--${edge.handoffType}`}
                >
                  <span className="font-semibold text-white">{edge.handoffType}</span>
                  <span className="line-clamp-2 text-[var(--opc-muted)]">{edge.summary}</span>
                </Link>
              ))}
            </div>
            <div className="grid h-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {agents.map((agent, index) => {
                const task = getTaskById(agent.currentTaskId);

                return (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.id}`}
                    className={`opc-stage-agent opc-stage-agent--${agent.status}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-xl font-semibold text-white">
                        {agent.name.slice(0, 1)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`opc-status-orb opc-status-orb--${agent.status}`} />
                        <StatusBadge status={agent.status} />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-base font-semibold text-white">{agent.name}</p>
                      <p className="text-sm text-[var(--opc-muted)]">{agent.title}</p>
                      <p className="text-sm leading-6 text-[var(--opc-muted)]">{agent.tagline}</p>
                    </div>
                    {task ? (
                      <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-black/15 p-3">
                        <div className="flex items-center justify-between gap-3 text-xs text-[var(--opc-muted)]">
                          <span>{task.stage}</span>
                          <span>{task.percent}%</span>
                        </div>
                        <p className="text-sm font-medium text-white">{task.title}</p>
                        <ProgressBar value={task.percent} />
                      </div>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {agent.personalityTags.slice(0, 2).map((tag) => (
                        <span key={`${agent.id}-${tag}-${index}`} className="opc-stage-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <p className="opc-kicker">Room Pulse</p>
          <div className="mt-3 grid gap-3 text-sm text-[var(--opc-muted)]">
            <p>活跃任务：{summary.activeTasks}</p>
            <p>已完成任务：{summary.completedTasks}</p>
            <p>A2A 交接：{summary.handoffs}</p>
            <p>公开产物：{summary.artifacts}</p>
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <p className="opc-kicker">Recent Handoffs</p>
          <div className="mt-3">
            <EventFeed edges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FounderCommandDeck({
  metrics,
  memos,
}: {
  metrics: CompanyMetric[];
  memos: Array<{ id: string; title: string; content: string; createdAt: string }>;
}) {
  const alerts = [
    "Release Pack 还缺截图故事线",
    "Partner pipeline 需要 Founder 最终取舍",
    "QA 风险仍卡在主链路可讲性",
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="rounded-[26px] border border-[rgba(245,163,93,0.18)] bg-[linear-gradient(180deg,rgba(19,32,43,0.95),rgba(9,14,21,0.98))] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="opc-kicker">Cockpit</p>
            <h4 className="opc-title mt-2 text-2xl font-semibold text-white">Mission Control</h4>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--opc-muted)]">
              Founder 在这里同时盯经营、盯风险、盯节奏，这里不是普通 dashboard，而是整家公司真正的决策中枢。
            </p>
          </div>
          <div className="rounded-2xl border border-[rgba(255,107,107,0.18)] bg-[rgba(255,107,107,0.08)] px-4 py-3 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="opc-pressure-orb" />
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-red)]">Pressure</p>
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">High</p>
          </div>
        </div>
        <div className="opc-alert-rail mt-5">
          {alerts.map((alert) => (
            <div key={alert} className="opc-alert-pill">
              {alert}
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {metrics.slice(0, 4).map((metric) => (
            <div key={metric.id} className="rounded-[20px] border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">{metric.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
        <p className="opc-kicker">Decision Queue</p>
        <h4 className="opc-title mt-2 text-2xl font-semibold text-white">优先级调整</h4>
        <div className="mt-5 space-y-3">
          {memos.map((memo) => (
            <article key={memo.id} className="rounded-[20px] border border-white/10 bg-black/15 p-4">
              <p className="text-sm font-semibold text-white">{memo.title}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{memo.content}</p>
              <p className="mt-3 text-xs text-[var(--opc-muted)]">生成于 {formatShortDate(memo.createdAt)}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReleaseReadinessPanel({ artifact }: { artifact: Artifact }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <ArtifactContentRenderer artifact={artifact} />
      <div className="space-y-4">
        <div className="rounded-[24px] border border-[rgba(82,212,138,0.18)] bg-[linear-gradient(180deg,rgba(39,49,39,0.95),rgba(8,14,10,0.98))] p-5">
          <p className="opc-kicker">Readiness</p>
          <h4 className="opc-title mt-2 text-xl font-semibold text-white">上架准备度</h4>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--opc-muted)]">
                <span>素材完整度</span>
                <span>64%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={64} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--opc-muted)]">
                <span>审核风险控制</span>
                <span>71%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={71} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 text-sm text-[var(--opc-muted)]">
                <span>截图故事线</span>
                <span>58%</span>
              </div>
              <div className="mt-2">
                <ProgressBar value={58} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
          <p className="opc-kicker">Why It Matters</p>
          <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">
            发行部不是最后顺手补几张图，而是把“这个项目已经接近可上架”讲成评委会相信的事实。
          </p>
        </div>
      </div>
    </div>
  );
}

export function SimpleProjectHero({ project }: { project: Project }) {
  const summary = getProjectStageSummary(project);
  const releaseArtifact = getReleaseArtifact(project.id);

  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(245,163,93,0.16),rgba(255,255,255,0.03))] p-5 md:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <p className="opc-kicker">Project Spotlight</p>
          <h3 className="opc-title text-2xl font-semibold text-white">{project.name}</h3>
          <p className="max-w-3xl text-sm leading-7 text-[var(--opc-muted)]">{project.summary}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/project/${project.id}`} className="opc-nav-chip">
            项目详情
          </Link>
          {releaseArtifact ? (
            <Link href={`/artifact/${releaseArtifact.id}`} className="opc-nav-chip">
              Release Pack
            </Link>
          ) : null}
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="opc-metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">主阶段</p>
          <p className="mt-3 text-lg font-semibold text-white">{summary.primaryStage}</p>
        </div>
        <div className="opc-metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">并行阶段</p>
          <p className="mt-3 text-sm leading-7 text-white">{summary.parallelStages.join(" / ") || "暂无"}</p>
        </div>
        <div className="opc-metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">Spotlight Office</p>
          <p className="mt-3 text-lg font-semibold text-white">{summary.spotlightOffice?.name ?? "未设置"}</p>
        </div>
        <div className="opc-metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">协作 Owner</p>
          <p className="mt-3 text-sm leading-7 text-white">{summary.ownerNames}</p>
        </div>
      </div>
    </div>
  );
}

export function AgentDetailGrid({ agent }: { agent: AgentProfile }) {
  const skills = getAgentSkills(agent);
  const tools = getAgentPlugins(agent);
  const collaborators = getAgentCollaborators(agent);
  const outputs = getAgentOutputs(agent);
  const handoffs = getAgentEdges(agent.id);

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <SectionCard title="Skills" kicker="Profile" description="角色能力来自团队长板和外部 skill pack。">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="opc-badge border border-white/10 bg-white/5 text-[var(--opc-muted)]">
              {skill.name}
            </span>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Tools / Plugins" kicker="Profile" description="当前可调用的模型、插件和数据入口。">
        <div className="space-y-3">
          {tools.map((tool) => (
            <div key={tool.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{tool.name}</p>
                  <p className="text-sm text-[var(--opc-muted)]">{tool.description}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
                  {tool.permission}
                </span>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Collaborators" kicker="Profile" description="最近与该 agent 紧密协作的角色。">
        <div className="space-y-3">
          {collaborators.length ? (
            collaborators.map((item) => (
              <Link key={item.id} href={`/agent/${item.id}`} className="block rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-sm text-[var(--opc-muted)]">{item.title}</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[var(--opc-muted)]">当前没有协作对象。</p>
          )}
        </div>
      </SectionCard>
      <SectionCard title="Recent Handoffs" kicker="Profile" description="最近交接的任务包与协作摘要。">
        <div className="space-y-3">
          {handoffs.length ? (
            handoffs.map((edge) => (
              <Link
                key={edge.id}
                href={edge.artifactId ? `/artifact/${edge.artifactId}` : `/project/${edge.projectId}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-sm font-semibold text-white">{summarizeEdge(edge)}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{edge.summary}</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[var(--opc-muted)]">当前没有交接记录。</p>
          )}
        </div>
      </SectionCard>
      <SectionCard title="Outputs" kicker="Profile" description="当前 agent 已经交付或正在驱动的产物。">
        <div className="space-y-3">
          {outputs.length ? (
            outputs.map((artifact) => (
              <Link key={artifact.id} href={`/artifact/${artifact.id}`} className="block rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">{artifact.title}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{artifact.summary}</p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-[var(--opc-muted)]">当前还没有对外产物。</p>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

export function OfficeOutputGrid({ officeId }: { officeId: Office["id"] }) {
  const artifacts = getProjectArtifacts("flagship-payroll").filter((artifact) => artifact.ownerOfficeId === officeId);

  if (!artifacts.length) {
    return <p className="text-sm text-[var(--opc-muted)]">这个办公室还没有公开产物。</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {artifacts.map((artifact) => (
        <Link key={artifact.id} href={`/artifact/${artifact.id}`} className="block rounded-[22px] border border-white/10 bg-white/5 p-4">
          <p className="opc-kicker">{artifact.type}</p>
          <h4 className="mt-2 text-lg font-semibold text-white">{artifact.title}</h4>
          <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{artifact.summary}</p>
        </Link>
      ))}
    </div>
  );
}
