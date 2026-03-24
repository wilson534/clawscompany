# OPC Frontend Implementation Guide

## 路由、组件树、数据 Schema 与低保真线框

本文件是在 [opc-frontend-architecture.md](C:\Users\g3098\Desktop\CLAWSCOMPANY\opc-frontend-architecture.md) 基础上的实现说明，目标是让前端开发可以直接开始拆页面和 mock 数据。

## 技术假设

- 前端框架：Next.js App Router
- 语言：TypeScript
- 样式：Tailwind CSS
- 状态管理：React state + server component props 起步，V1 不强上重状态库
- 动画：CSS animation + Framer Motion 或等价轻量方案
- 数据来源：本地 mock JSON 起步，后续再接后端 agent runtime

## 外部复用接入策略

比赛速胜版允许高强度借力，但前端仍以 OPC 自己的 schema 为真源：

- `Star-Office-UI`
  - 只负责 HQ / Office Scene Shell
- `mission-control`
  - 只负责 Founder Office 的 dashboard 组织方式
- `ClawTeam`
  - 只负责 A2A / 任务语义层
- `agency-agents + gstack + MiniMax skills`
  - 负责 Agent persona、workflow、skills、tools、plugins 的结构来源
- `Agent-Reach`
  - 负责多源信号读取入口思路
- `MediaCrawler`
  - 只做赛前离线信号补强，不进入现场主链路

所有外部能力进入前端时都必须经过适配层，不能直接成为页面或 mock 的真源。

## 路由设计

### 一级路由

| 路由 | 页面 | 作用 |
| --- | --- | --- |
| `/` | HQ Overview | 总部大楼总览与 Demo 主舞台 |
| `/office/founder` | Founder Office | 经营驾驶舱与决策中心 |
| `/office/team` | Team Office | 团队上下文与成员主页 |
| `/office/intel` | 情报部 | 信号源、趋势和候选机会 |
| `/office/investment` | 产品投资部 | Opportunity Committee 与立项决策 |
| `/office/design` | 设计部 | 设计系统、页面预览、设计评审 |
| `/office/engineering` | 工程部 | App Cell、代码摘要、设备预览 |
| `/office/qa` | QA 部 | 风险、问题、升级事项 |
| `/office/release` | 发行部 | Release Pack 与 App Store 准备 |
| `/office/growth` | 增长部 | 外部 narrative 与增长动作 |
| `/office/partner` | 外交部 | candidate、partner、渠道与商业线索 |

### 二级路由

| 路由 | 页面 | 作用 |
| --- | --- | --- |
| `/agent/[agentId]` | Agent Profile | 单个 Agent 的完整员工主页 |
| `/project/[projectId]` | Project View | 单个旗舰项目的上下文聚合页 |
| `/artifact/[artifactId]` | Artifact View | PRD、brief、设计稿、代码摘要、QA 报告等产物详情 |

### URL 设计原则

- 办公室是主导航单位
- Agent / Project / Artifact 是深层详情单位
- Drawer / Modal 的打开状态可以通过 search params 表达
- 推荐模式：
  - `/office/engineering?agent=eng-bald`
  - `/office/founder?project=flagship-payroll`

## 全局布局结构

```text
RootLayout
├─ TopStatusBar
├─ MainViewport
│  ├─ LeftMiniMap
│  ├─ PageContent
│  └─ RightContextRail
│     └─ ObservabilityDock
├─ GlobalOverlayLayer
│  ├─ A2ACollaborationOverlay
│  ├─ LiveNotificationFeed
│  └─ CommandPalette
└─ GlobalDrawers
   ├─ AgentProfileDrawer
   ├─ ArtifactDrawer
   ├─ ProjectDrawer
   └─ ObservabilityDrawer
```

## 页面组件树

### 1. HQ Overview

```text
HQOverviewPage
├─ HQHeroHeader
├─ GlobalCompanyPulse
├─ BuildingScene
│  ├─ FloorLayer(L5 Founder)
│  ├─ FloorLayer(L4 Team / Partner)
│  ├─ FloorLayer(L3 Intel / Investment)
│  ├─ FloorLayer(L2 Design / Engineering)
│  └─ FloorLayer(L1 QA / Release / Growth)
├─ ProjectSpotlight
├─ LiveEventTicker
└─ A2AOverlayToggle
```

### 2. Office Detail 通用页面

```text
OfficeDetailPage
├─ OfficeHero
├─ OfficeMetaBar
│  ├─ OfficeStatusChip
│  ├─ ActiveProjectChip
│  └─ AgentCountChip
├─ OfficeScene
│  ├─ AgentAvatarGrid
│  ├─ TaskBubbleLayer
│  └─ CollaborationEdgeLayer
├─ OfficeModuleTabs
│  ├─ OverviewTab
│  ├─ TasksTab
│  ├─ OutputsTab
│  ├─ InsightsTab
│  └─ ObservabilityTab
└─ OfficeBottomPanel
```

### 3. Founder Office

```text
FounderOfficePage
├─ FounderHeroPanel
├─ CompanyMetricsBoard
├─ DecisionQueue
├─ PriorityShiftPanel
├─ FounderMemoFeed
├─ RuntimeDigestPanel
├─ TeamSummaryPanel
├─ OpportunitySummaryPanel
├─ ReleaseSummaryPanel
└─ PartnerSummaryPanel
```

### 4. Team Office

```text
TeamOfficePage
├─ TeamGrid
├─ TeamStrengthRadar
├─ ContextConfigPanel
├─ InternalOwnershipBoard
└─ TeamActivityFeed
```

### 5. 情报部

```text
IntelOfficePage
├─ SignalSourceBar
├─ TrendClusterView
├─ SignalBoard
├─ OpportunityCandidateList
└─ IntelligenceAgentStatus
```

### 6. 产品投资部

```text
InvestmentOfficePage
├─ CommitteeTable
├─ OpportunityScoreCard
├─ OpportunityBriefPanel
├─ ApprovalTimeline
└─ DecisionLog
```

### 7. 工程部

```text
EngineeringOfficePage
├─ BuildFloorOverview
├─ BuildTaskBoard
├─ CodeArtifactPanel
├─ PreviewDeviceFrame
├─ EngineerAgentStatus
├─ BusinessJsonPanel
└─ SystemLogStream
```

### 8. 发行部

```text
ReleaseOfficePage
├─ ReleasePackOverview
├─ MetadataEditor
├─ ScreenshotStoryboard
├─ IconDirectionPanel
├─ AppReviewChecklist
├─ BusinessJsonPanel
└─ SystemLogStream
```

### 9. Agent Profile

```text
AgentProfilePage
├─ ProfileHeader
├─ MissionPanel
├─ SkillTree
├─ ToolPluginPanel
├─ CollaboratorMap
├─ RecentOutputs
└─ BackstoryPanel
```

## 共享组件清单

### 视觉与场景类

- `PixelOfficeRoom`
- `PixelAgentAvatar`
- `TaskBubble`
- `ProgressRing`
- `A2AFlightLine`
- `StatusBadge`
- `MetricCard`

### 交互类

- `AgentCard`
- `ArtifactCard`
- `ProjectChip`
- `FilterPill`
- `SourceChip`
- `DecisionTag`

### 数据展示类

- `Timeline`
- `KanbanBoard`
- `RadarChart`
- `ScoreBar`
- `SignalClusterCard`
- `PartnerCard`
- `ArtifactContentRenderer`
- `BusinessJsonPanel`
- `SystemLogStream`
- `JsonTreeViewer`
- `LogEntryRow`

## 数据 Schema

以下为 V1 建议的前端类型结构。

```ts
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
  url?: string;
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
  source?: string;
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
```

## Mock 数据组织建议

mock 目录结构与样例数据以 `opc-mock-data-spec.md` 为唯一真源。
本文件只定义前端需要消费的类型和页面结构，不重复维护 mock 文件清单。

比赛版如果接入外部表达或数据源，也必须先映射成这里定义的统一类型，再进入页面。

## 低保真线框说明

### 1. HQ Overview

```text
+-------------------------------------------------------------+
| OPC HQ                           [A2A 开关] [当前项目]       |
+----------------------+--------------------------------------+
| 左侧公司指标         |            总部大楼像素场景          |
| - 今日机会数         |   L5 Founder Office                  |
| - 立项数             |   L4 Team / Partner                  |
| - 在制项目           |   L3 Intel / Investment              |
| - ship streak        |   L2 Design / Engineering            |
| - partner pipeline   |   L1 QA / Release / Growth           |
+----------------------+--------------------------------------+
| 事件流 ticker                                                |
+-------------------------------------------------------------+
```

### 2. Founder Office

```text
+-------------------------------------------------------------+
| Founder Agent Hero         | 公司指标                        |
| 当前判断 / 今日重点         | 机会数 / ROI / ship streak     |
+-------------------------------------------------------------+
| Decision Queue             | Priority Shift                  |
| - 待拍板项目               | - 提升优先级                    |
| - 风险升级                 | - 暂停项目                      |
+-------------------------------------------------------------+
| Team 摘要 | Opportunity 摘要 | Release 摘要 | Partner 摘要   |
+-------------------------------------------------------------+
| Founder Memo Feed                                            |
+-------------------------------------------------------------+
```

### 3. Team Office

```text
+-------------------------------------------------------------+
| Team Grid: 4 位成员卡片                                      |
+----------------------------+--------------------------------+
| Team Strength Radar        | Context Config Panel           |
| 产品/算法/iOS/传播/...      | 偏好赛道 / 工具 / 目标         |
+----------------------------+--------------------------------+
| Internal Ownership Board                                       |
+-------------------------------------------------------------+
```

### 4. 情报部

```text
+-------------------------------------------------------------+
| 来源筛选条 GitHub X 小红书 arXiv Bilibili                   |
+----------------------------+--------------------------------+
| Trend Cluster              | Opportunity Candidates         |
| - 打工人工具               | - 工时/工资/周报助手          |
| - 效率微工具               | - AI 简历包装器               |
+----------------------------+--------------------------------+
| Signal Board                                                 |
+-------------------------------------------------------------+
```

### 5. 工程部

```text
+-------------------------------------------------------------+
| Build Floor Overview                                         |
+----------------------------+--------------------------------+
| Build Task Board          | Device Preview                 |
| - 首页开发 80%            | [iPhone 预览]                  |
| - 本地存储接入 60%         |                                |
+----------------------------+--------------------------------+
| Code Artifact Panel                                            |
+-------------------------------------------------------------+
| Engineer Agent Status                                          |
+-------------------------------------------------------------+
```

### 6. 发行部

```text
+-------------------------------------------------------------+
| Release Pack Overview                                        |
+----------------------------+--------------------------------+
| Metadata Editor          | Screenshot Storyboard           |
| title/subtitle/keywords  | 截图 1-5 卖点                   |
+----------------------------+--------------------------------+
| Icon Direction Panel     | App Review Checklist           |
+-------------------------------------------------------------+
```

## Ralph Loop 落地到前端的实现节奏

前端开发必须按小步闭环推进：

1. 先做一个页面骨架可运行
2. 立刻接入真实 mock 数据跑一遍
3. 验证页面是否真的能支撑 Demo 叙事
4. 修布局、补字段、调模块关系
5. 再进入下一页面

推荐顺序：

1. HQ Overview
2. Founder Office
3. Team Office
4. 情报部
5. 产品投资部
6. 工程部
7. 发行部
8. Agent Profile
9. A2A Overlay
10. 其余办公室

## 验收标准

- 路由结构能完整覆盖总部、办公室、Agent、项目、产物四类视图
- HQ Overview 能单独作为黑客松主讲页面
- Founder Office 能支撑决策叙事，不只是 metrics 展示
- Team Office 能支撑团队上下文注入，而不是简单展示成员信息
- Agent Profile 能展示 skills、tools、plugin 和协作关系
- P0 页面至少能挂接一份业务层 JSON 或系统级日志视图
- Schema 足够支撑 mock 数据和后续真实 runtime 接入
- 低保真布局能够直接指导 UI 设计或前端切页面
