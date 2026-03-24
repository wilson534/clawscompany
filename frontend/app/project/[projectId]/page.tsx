import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ObservabilityStack,
  PageShell,
  SectionCard,
  SimpleProjectHero,
  TaskList,
} from "@/components/opc-ui";
import { getOfficeById, getProjectArtifacts, getProjectById, getProjectTasks } from "@/lib/opc";

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const tasks = getProjectTasks(project.id);
  const artifacts = getProjectArtifacts(project.id);

  return (
    <PageShell
      eyebrow="Project View"
      title={project.name}
      description={project.summary}
      actions={
        <>
          <Link href="/" className="opc-nav-chip">
            返回 HQ
          </Link>
          <Link href={`/office/${project.spotlightOfficeId}`} className="opc-nav-chip">
            进入 Spotlight Office
          </Link>
        </>
      }
      aside={<ObservabilityStack moduleId={project.spotlightOfficeId} />}
    >
      <SimpleProjectHero project={project} />

      <SectionCard
        title="Parallel Stage View"
        kicker="Stages"
        description="项目不再只显示一个 current stage，而是同时展示主阶段和并行推进中的部门。"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {project.activeStageIds.map((stage) => {
            const office = project.activeOfficeIds.find((officeId) => officeId.includes(stage));
            return (
              <div key={stage} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <p className="opc-kicker">{stage === project.primaryStage ? "Primary" : "Parallel"}</p>
                <h4 className="mt-2 text-lg font-semibold text-white">{stage}</h4>
                <p className="mt-2 text-sm text-[var(--opc-muted)]">
                  {office ? getOfficeById(office)?.name ?? office : "跨办公室协作"}
                </p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard
        title="Task Board"
        kicker="Execution"
        description="按照真实 mock 任务流展示整个项目的推进节奏和阻塞点。"
      >
        <TaskList tasks={tasks} showOffice />
      </SectionCard>

      <SectionCard
        title="Artifact Chain"
        kicker="Outputs"
        description="从 signal brief 到 release pack，项目的关键产物链在这里完整展开。"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <Link
              key={artifact.id}
              href={`/artifact/${artifact.id}`}
              className="block rounded-[22px] border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/7"
            >
              <p className="opc-kicker">{artifact.type}</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{artifact.title}</h4>
              <p className="mt-2 text-sm leading-7 text-[var(--opc-muted)]">{artifact.summary}</p>
            </Link>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}
