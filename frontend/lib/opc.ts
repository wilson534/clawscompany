import { artifacts } from "@/lib/mock/artifacts";
import {
  companyMetrics,
  memos,
  partners,
  plugins,
  profileAdapters,
  signalSourceAdapters,
  skillCatalogAdapters,
  skills,
  teamMemberContexts,
  visualAdapters,
  workflowSemanticsAdapters,
  workspaceContext,
} from "@/lib/mock/catalogs";
import { agents, offices, projects, tasks } from "@/lib/mock/core";
import { opportunityBriefs, opportunityCandidates, signals, trendClusters } from "@/lib/mock/intel";
import { businessJsonSnapshots, collaborationEdges, systemLogs } from "@/lib/mock/observability";
import type {
  AgentProfile,
  AgentStatus,
  AgentTask,
  BusinessJsonSnapshot,
  CollaborationEdge,
  OfficeId,
  Project,
  SystemLogEntry,
} from "@/lib/opc-types";

type OfficeVisual = {
  x: number;
  y: number;
  w: number;
  h: number;
  bg: string;
  accent: string;
  label: string;
};

export const allData = {
  offices,
  agents,
  tasks,
  projects,
  signals,
  trendClusters,
  opportunityCandidates,
  opportunityBriefs,
  artifacts,
  skills,
  plugins,
  companyMetrics,
  partners,
  memos,
  teamMemberContexts,
  workspaceContext,
  collaborationEdges,
  businessJsonSnapshots,
  systemLogs,
  visualAdapters,
  skillCatalogAdapters,
  signalSourceAdapters,
  workflowSemanticsAdapters,
  profileAdapters,
} as const;

export const officeVisuals: Record<OfficeId, OfficeVisual> = {
  founder: {
    x: 33,
    y: 5,
    w: 34,
    h: 14,
    bg: "var(--opc-room-founder)",
    accent: "var(--opc-signal)",
    label: "L5",
  },
  team: {
    x: 6,
    y: 24,
    w: 28,
    h: 15,
    bg: "var(--opc-room-team)",
    accent: "var(--opc-blue)",
    label: "L4",
  },
  partner: {
    x: 66,
    y: 24,
    w: 28,
    h: 15,
    bg: "var(--opc-room-partner)",
    accent: "var(--opc-purple)",
    label: "L4",
  },
  intel: {
    x: 6,
    y: 43,
    w: 28,
    h: 15,
    bg: "var(--opc-room-intel)",
    accent: "var(--opc-green)",
    label: "L3",
  },
  investment: {
    x: 66,
    y: 43,
    w: 28,
    h: 15,
    bg: "var(--opc-room-investment)",
    accent: "var(--opc-yellow)",
    label: "L3",
  },
  design: {
    x: 6,
    y: 62,
    w: 28,
    h: 15,
    bg: "var(--opc-room-design)",
    accent: "#ff8aa5",
    label: "L2",
  },
  engineering: {
    x: 66,
    y: 62,
    w: 28,
    h: 15,
    bg: "var(--opc-room-engineering)",
    accent: "var(--opc-blue)",
    label: "L2",
  },
  qa: {
    x: 3,
    y: 81,
    w: 22,
    h: 15,
    bg: "var(--opc-room-qa)",
    accent: "var(--opc-red)",
    label: "L1",
  },
  release: {
    x: 39,
    y: 81,
    w: 22,
    h: 15,
    bg: "var(--opc-room-release)",
    accent: "var(--opc-green)",
    label: "L1",
  },
  growth: {
    x: 75,
    y: 81,
    w: 22,
    h: 15,
    bg: "var(--opc-room-growth)",
    accent: "var(--opc-signal)",
    label: "L1",
  },
};

export function getOfficeById(officeId: string) {
  return offices.find((office) => office.id === officeId);
}

export function getAgentById(agentId: string) {
  return agents.find((agent) => agent.id === agentId);
}

export function getTaskById(taskId?: string) {
  return tasks.find((task) => task.id === taskId);
}

export function getProjectById(projectId: string) {
  return projects.find((project) => project.id === projectId);
}

export function getArtifactById(artifactId: string) {
  return artifacts.find((artifact) => artifact.id === artifactId);
}

export function getOfficeAgents(officeId: OfficeId) {
  return agents.filter((agent) => agent.officeId === officeId);
}

export function getOfficeTasks(officeId: OfficeId) {
  return tasks.filter((task) => task.officeId === officeId);
}

export function getOfficeArtifacts(officeId: OfficeId) {
  return artifacts.filter((artifact) => artifact.ownerOfficeId === officeId);
}

export function getOfficeEdges(officeId: OfficeId) {
  return collaborationEdges.filter((edge) => {
    const fromAgent = getAgentById(edge.fromAgentId);
    const toAgent = getAgentById(edge.toAgentId);
    return fromAgent?.officeId === officeId || toAgent?.officeId === officeId;
  });
}

export function getProjectTasks(projectId: string) {
  return tasks.filter((task) => task.projectId === projectId);
}

export function getProjectArtifacts(projectId: string) {
  return artifacts.filter((artifact) => artifact.projectId === projectId);
}

export function getProjectEdges(projectId: string) {
  return collaborationEdges.filter((edge) => edge.projectId === projectId);
}

export function getAgentSkills(agent: AgentProfile) {
  return skills.filter((skill) => agent.skillIds.includes(skill.id));
}

export function getAgentPlugins(agent: AgentProfile) {
  return plugins.filter((plugin) => agent.pluginIds.includes(plugin.id));
}

export function getAgentOutputs(agent: AgentProfile) {
  return artifacts.filter((artifact) => agent.outputArtifactIds.includes(artifact.id));
}

export function getAgentCollaborators(agent: AgentProfile) {
  return agents.filter((candidate) => agent.collaboratorIds.includes(candidate.id));
}

export function getAgentEdges(agentId: string) {
  return collaborationEdges.filter(
    (edge) => edge.fromAgentId === agentId || edge.toAgentId === agentId,
  );
}

export function getSnapshotsForModule(moduleId: string) {
  return businessJsonSnapshots.filter((snapshot) => snapshot.moduleId === moduleId);
}

export function getLogsForModule(moduleId: string) {
  return systemLogs.filter((log) => log.moduleId === moduleId);
}

export function getOwnerNames(ownerAgentIds: string[]) {
  return ownerAgentIds
    .map((ownerId) => getAgentById(ownerId)?.name)
    .filter((value): value is string => Boolean(value))
    .join(" / ");
}

export function formatShortDate(input?: string) {
  if (!input) {
    return "待定";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(input));
}

export function formatStatusLabel(status: AgentStatus) {
  const labels: Record<AgentStatus, string> = {
    idle: "空闲",
    working: "工作中",
    waiting: "等待中",
    reviewing: "评审中",
    escalated: "已升级",
    completed: "已完成",
  };

  return labels[status];
}

export function getStatusTone(status: AgentStatus) {
  const tones: Record<AgentStatus, string> = {
    idle: "text-[var(--opc-muted)] border-white/10 bg-white/5",
    working: "text-[var(--opc-blue)] border-[rgba(88,166,255,0.3)] bg-[rgba(88,166,255,0.1)]",
    waiting: "text-[var(--opc-yellow)] border-[rgba(244,207,102,0.3)] bg-[rgba(244,207,102,0.12)]",
    reviewing: "text-[var(--opc-signal)] border-[rgba(245,163,93,0.3)] bg-[rgba(245,163,93,0.12)]",
    escalated: "text-[var(--opc-red)] border-[rgba(255,107,107,0.3)] bg-[rgba(255,107,107,0.12)]",
    completed: "text-[var(--opc-green)] border-[rgba(82,212,138,0.3)] bg-[rgba(82,212,138,0.12)]",
  };

  return tones[status];
}

export function getEdgeTone(edge: CollaborationEdge) {
  const tones: Record<CollaborationEdge["handoffType"], string> = {
    handoff: "opc-flight-line--handoff",
    review: "opc-flight-line--review",
    escalation: "opc-flight-line--escalation",
    sync: "opc-flight-line--sync",
  };

  return tones[edge.handoffType];
}

export function getHeroAgents() {
  return ["founder-em01", "team-randy", "eng-bald", "release-publisher"]
    .map((agentId) => getAgentById(agentId))
    .filter((agent): agent is AgentProfile => Boolean(agent));
}

export function getProjectSpotlight() {
  return projects[0];
}

export function getReleaseArtifact(projectId: string) {
  return artifacts.find(
    (artifact) => artifact.projectId === projectId && artifact.type === "release_pack",
  );
}

export function getDecisionMemos(officeId?: OfficeId) {
  if (!officeId) {
    return memos;
  }

  return memos.filter(
    (memo) => memo.sourceOfficeId === officeId || memo.targetOfficeIds.includes(officeId),
  );
}

export function getOfficeSummary(officeId: OfficeId) {
  const officeAgents = getOfficeAgents(officeId);
  const officeTasks = getOfficeTasks(officeId);
  const officeArtifacts = getOfficeArtifacts(officeId);
  const officeEdges = getOfficeEdges(officeId);

  return {
    totalAgents: officeAgents.length,
    activeTasks: officeTasks.length,
    artifacts: officeArtifacts.length,
    completedTasks: officeTasks.filter((task) => task.status === "completed").length,
    liveStatusCount: officeAgents.filter((agent) => agent.status === "working").length,
    handoffs: officeEdges.length,
  };
}

export function getProjectStageSummary(project: Project) {
  return {
    primaryStage: project.primaryStage,
    parallelStages: project.activeStageIds.filter((stage) => stage !== project.primaryStage),
    spotlightOffice: getOfficeById(project.spotlightOfficeId),
    ownerNames: getOwnerNames(project.ownerAgentIds),
  };
}

export function getAgentRecentTasks(agentId: string) {
  return tasks
    .filter((task) => task.ownerAgentId === agentId)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
}

export function getOfficeProject(officeId: OfficeId) {
  const office = getOfficeById(officeId);

  if (!office?.activeProjectIds.length) {
    return undefined;
  }

  return getProjectById(office.activeProjectIds[0]);
}

export function getTasksByIds(taskIds: string[]) {
  return taskIds
    .map((taskId) => getTaskById(taskId))
    .filter((task): task is AgentTask => Boolean(task));
}

export function getOfficeMetrics(officeId: OfficeId) {
  switch (officeId) {
    case "founder":
      return companyMetrics;
    case "release":
      return companyMetrics.filter((metric) =>
        ["metric-release", "metric-streak", "metric-roi"].includes(metric.id),
      );
    case "partner":
      return companyMetrics.filter((metric) =>
        ["metric-partners", "metric-roi"].includes(metric.id),
      );
    default:
      return companyMetrics.slice(0, 3);
  }
}

export function summarizeEdge(edge: CollaborationEdge) {
  const from = getAgentById(edge.fromAgentId)?.name ?? edge.fromAgentId;
  const to = getAgentById(edge.toAgentId)?.name ?? edge.toAgentId;
  return `${from} -> ${to}`;
}

export type OpcObservability = {
  snapshots: BusinessJsonSnapshot[];
  logs: SystemLogEntry[];
};
