export type OfficeId =
  | "founder"
  | "team"
  | "intel"
  | "investment"
  | "design"
  | "engineering"
  | "qa"
  | "release"
  | "growth"
  | "partner";

export type AgentStatus =
  | "idle"
  | "working"
  | "waiting"
  | "reviewing"
  | "escalated"
  | "completed";

export type ArtifactType =
  | "signal_brief"
  | "opportunity_brief"
  | "design_spec"
  | "code_summary"
  | "qa_report"
  | "release_pack"
  | "growth_plan"
  | "partner_memo";

export type SignalSource =
  | "github"
  | "x"
  | "xiaohongshu"
  | "arxiv"
  | "bilibili"
  | "web";

export interface Office {
  id: OfficeId;
  name: string;
  floor: number;
  description: string;
  sceneTone: string;
  agentIds: string[];
  activeProjectIds: string[];
  status: AgentStatus;
}

export interface AgentProfile {
  id: string;
  name: string;
  title: string;
  officeId: OfficeId;
  avatarKey: string;
  tagline: string;
  status: AgentStatus;
  personalityTags: string[];
  strengths: string[];
  currentTaskId?: string;
  skillIds: string[];
  pluginIds: string[];
  collaboratorIds: string[];
  outputArtifactIds: string[];
  decisionMemoIds?: string[];
}

export interface AgentTask {
  id: string;
  title: string;
  projectId: string;
  officeId: OfficeId;
  ownerAgentId: string;
  percent: number;
  stage: string;
  status: AgentStatus;
  blocker?: string;
  nextAction?: string;
  dueAt?: string;
  linkedArtifactIds?: string[];
  startedAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  summary: string;
  primaryStage: string;
  activeStageIds: string[];
  spotlightOfficeId: OfficeId;
  activeOfficeIds: OfficeId[];
  ownerAgentIds: string[];
  artifactIds: string[];
}

export interface Signal {
  id: string;
  source: SignalSource;
  title: string;
  snippet: string;
  tags: string[];
  heat: number;
  painPoint: string;
  createdAt: string;
}

export interface TrendCluster {
  id: string;
  name: string;
  summary: string;
  signalIds: string[];
  confidence: number;
}

export interface OpportunityScore {
  roi: number;
  virality: number;
  iosFit: number;
  teamFit: number;
  shipability: number;
  total: number;
}

export interface OpportunityCandidate {
  id: string;
  clusterId: string;
  title: string;
  targetUser: string;
  reasonNow: string;
  buildability: string;
  score: OpportunityScore;
}

export interface OpportunityBrief {
  id: string;
  candidateId: string;
  projectName: string;
  targetUser: string;
  coreProblem: string;
  coreFeatures: string[];
  differentiation: string;
  monetization: string;
  riskNotes: string[];
}

export type ArtifactContentBlock =
  | {
      id: string;
      kind: "markdown";
      title?: string;
      markdown: string;
    }
  | {
      id: string;
      kind: "list";
      title?: string;
      items: string[];
    }
  | {
      id: string;
      kind: "kv";
      title?: string;
      entries: Array<{ label: string; value: string }>;
    }
  | {
      id: string;
      kind: "code";
      title?: string;
      language: string;
      code: string;
    }
  | {
      id: string;
      kind: "checklist";
      title?: string;
      items: Array<{ label: string; checked: boolean }>;
    };

export interface Artifact {
  id: string;
  type: ArtifactType;
  title: string;
  summary: string;
  projectId: string;
  ownerOfficeId: OfficeId;
  ownerAgentId: string;
  sourceTaskIds?: string[];
  contentBlocks: ArtifactContentBlock[];
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "core" | "strong" | "support";
  description: string;
}

export interface ToolPlugin {
  id: string;
  name: string;
  category: "model" | "data" | "tool" | "plugin";
  enabled: boolean;
  permission: "read" | "write" | "execute";
  description: string;
}

export interface VisualAdapter {
  id: string;
  source: "star-office-ui" | "mission-control" | "local";
  target: "hq" | "office" | "founder";
  summary: string;
}

export interface SkillCatalogAdapter {
  id: string;
  source: "minimax-skills" | "local";
  summary: string;
}

export interface SignalSourceAdapter {
  id: string;
  source: "agent-reach" | "media-crawler" | "local";
  mode: "prebuilt" | "live";
  summary: string;
}

export interface WorkflowSemanticsAdapter {
  id: string;
  source: "clawteam" | "gstack" | "agency-agents" | "local";
  summary: string;
}

export interface ProfileAdapter {
  id: string;
  source: "agency-agents" | "local";
  summary: string;
}

export interface CollaborationEdge {
  id: string;
  fromAgentId: string;
  toAgentId: string;
  projectId: string;
  artifactType?: ArtifactType;
  artifactId?: string;
  handoffType: "handoff" | "review" | "escalation" | "sync";
  summary: string;
  status: "sending" | "received" | "blocked";
  updatedAt: string;
}

export interface DecisionMemo {
  id: string;
  title: string;
  content: string;
  sourceOfficeId: OfficeId;
  targetOfficeIds: OfficeId[];
  createdAt: string;
}

export interface TeamMemberContext {
  id: string;
  memberName: string;
  role: string;
  strengths: string[];
  preferredTracks: string[];
  preferredTools: string[];
  targetTypes: string[];
  activeOfficeIds: OfficeId[];
  currentFocus: string[];
  capacityStatus: "available" | "focused" | "stretched";
  socialProof: string[];
}

export interface WorkspaceContext {
  id: string;
  workspaceName: string;
  northStar: string;
  targetProductShapes: string[];
  currentGoals: string[];
  strategicConstraints: string[];
  activeProjectIds: string[];
  officeOwnership: Array<{
    officeId: OfficeId;
    ownerAgentIds: string[];
    summary: string;
  }>;
}

export interface CompanyMetric {
  id: string;
  label: string;
  value: string;
  trend?: "up" | "flat" | "down";
}

export interface PartnerCandidate {
  id: string;
  name: string;
  type: "channel" | "media" | "distribution" | "customer" | "tech";
  status: "candidate" | "contacted" | "active" | "strategic";
  valueSummary: string;
  ownerAgentId: string;
  linkedTaskIds: string[];
  nextAction: string;
}

export interface BusinessJsonSnapshot {
  id: string;
  moduleId: string;
  moduleType: "office" | "agent" | "project";
  projectId?: string;
  input: Record<string, unknown>;
  intermediate?: Record<string, unknown>;
  output?: Record<string, unknown>;
  error?: { code: string; message: string } | null;
  updatedAt: string;
}

export interface SystemLogEntry {
  id: string;
  moduleId: string;
  level: "info" | "warn" | "error";
  event: string;
  message: string;
  durationMs?: number;
  retryCount?: number;
  degraded?: boolean;
  timestamp: string;
}
