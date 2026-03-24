import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AgentDetailGrid,
  ObservabilityStack,
  PageShell,
  SectionCard,
  StatusBadge,
  TaskList,
} from "@/components/opc-ui";
import { formatShortDate, getAgentById, getAgentRecentTasks, getOfficeById, getTaskById } from "@/lib/opc";

type PageProps = {
  params: Promise<{ agentId: string }>;
};

export default async function AgentPage({ params }: PageProps) {
  const { agentId } = await params;
  const agent = getAgentById(agentId);

  if (!agent) {
    notFound();
  }

  const office = getOfficeById(agent.officeId);
  const currentTask = getTaskById(agent.currentTaskId);
  const recentTasks = getAgentRecentTasks(agent.id);

  return (
    <PageShell
      eyebrow={`Agent / ${agent.officeId}`}
      title={agent.name}
      description={agent.tagline}
      actions={
        <>
          {office ? (
            <Link href={`/office/${office.id}`} className="opc-nav-chip">
              返回 {office.name}
            </Link>
          ) : null}
          <Link href="/" className="opc-nav-chip">
            返回 HQ
          </Link>
        </>
      }
      aside={<ObservabilityStack moduleId={agent.officeId} />}
    >
      <SectionCard
        title="Overview"
        kicker="Profile"
        description="Agent Profile 统一映射 persona、skills、tools、mission 和 outputs。"
      >
        <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(88,166,255,0.16),transparent_42%),rgba(255,255,255,0.04)] p-5">
            <div className="flex h-36 items-center justify-center rounded-[22px] border border-white/10 bg-black/20">
              <span className="opc-title text-5xl text-white">{agent.name.slice(0, 1)}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={agent.status} />
              <span className="opc-badge border border-white/10 bg-white/5 text-[var(--opc-muted)]">
                {agent.title}
              </span>
              {office ? (
                <span className="opc-badge border border-white/10 bg-white/5 text-[var(--opc-muted)]">
                  {office.name}
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-sm font-medium text-white">人格标签</p>
              <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">
                {agent.personalityTags.join(" / ")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-white">核心长板</p>
              <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{agent.strengths.join(" / ")}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Current Mission"
        kicker="Execution"
        description="当前任务、阶段、进度和阻塞项会在这里聚合。"
      >
        {currentTask ? (
          <div className="rounded-[22px] border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={currentTask.status} />
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--opc-muted)]">
                {currentTask.stage}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{currentTask.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--opc-muted)]">
              更新于 {formatShortDate(currentTask.updatedAt)}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-sm font-medium text-white">下一步</p>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">
                  {currentTask.nextAction ?? "待同步"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                <p className="text-sm font-medium text-white">阻塞项</p>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">
                  {currentTask.blocker ?? "暂无"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-[var(--opc-muted)]">当前没有绑定任务。</p>
        )}
      </SectionCard>

      <AgentDetailGrid agent={agent} />

      <SectionCard title="Recent Tasks" kicker="Execution" description="这个 Agent 最近真正参与过的任务进度。">
        <TaskList tasks={recentTasks} showProject />
      </SectionCard>
    </PageShell>
  );
}
