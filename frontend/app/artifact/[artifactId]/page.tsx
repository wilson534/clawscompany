import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArtifactContentRenderer,
  ObservabilityStack,
  PageShell,
  SectionCard,
} from "@/components/opc-ui";
import { formatShortDate, getAgentById, getArtifactById, getOfficeById, getTasksByIds } from "@/lib/opc";

type PageProps = {
  params: Promise<{ artifactId: string }>;
};

export default async function ArtifactPage({ params }: PageProps) {
  const { artifactId } = await params;
  const artifact = getArtifactById(artifactId);

  if (!artifact) {
    notFound();
  }

  const owner = getAgentById(artifact.ownerAgentId);
  const office = getOfficeById(artifact.ownerOfficeId);
  const sourceTasks = getTasksByIds(artifact.sourceTaskIds ?? []);

  return (
    <PageShell
      eyebrow={`Artifact / ${artifact.type}`}
      title={artifact.title}
      description={artifact.summary}
      actions={
        <>
          <Link href={`/project/${artifact.projectId}`} className="opc-nav-chip">
            返回项目
          </Link>
          {office ? (
            <Link href={`/office/${office.id}`} className="opc-nav-chip">
              进入 {office.name}
            </Link>
          ) : null}
        </>
      }
      aside={<ObservabilityStack moduleId={artifact.ownerOfficeId} />}
    >
      <SectionCard
        title="Artifact Meta"
        kicker="Context"
        description="Artifact 不是静态卡片，而是整个公司协作链里的正式交付物。"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="opc-metric-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">Owner</p>
            <p className="mt-3 text-base font-semibold text-white">{owner?.name ?? "未知"}</p>
          </div>
          <div className="opc-metric-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">Office</p>
            <p className="mt-3 text-base font-semibold text-white">{office?.name ?? "未知"}</p>
          </div>
          <div className="opc-metric-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">Project</p>
            <p className="mt-3 text-base font-semibold text-white">{artifact.projectId}</p>
          </div>
          <div className="opc-metric-card">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--opc-muted)]">Updated</p>
            <p className="mt-3 text-base font-semibold text-white">{formatShortDate(artifact.updatedAt)}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Rendered Content"
        kicker="Payload"
        description="统一的 content blocks 模型负责渲染 markdown、列表、键值对、代码和 checklist。"
      >
        <ArtifactContentRenderer artifact={artifact} />
      </SectionCard>

      <SectionCard
        title="Source Tasks"
        kicker="Traceability"
        description="这个产物来自哪些任务，以及目前在项目链路中的位置。"
      >
        <div className="space-y-3">
          {sourceTasks.length ? (
            sourceTasks.map((task) => (
              <article key={task.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{task.nextAction ?? "待同步"}</p>
                <p className="mt-3 text-xs text-[var(--opc-muted)]">更新于 {formatShortDate(task.updatedAt)}</p>
              </article>
            ))
          ) : (
            <p className="text-sm text-[var(--opc-muted)]">当前没有绑定来源任务。</p>
          )}
        </div>
      </SectionCard>
    </PageShell>
  );
}
