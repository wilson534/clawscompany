# OPC Mock Data Spec

## 办公室、Agent、任务、项目与产物的样例数据设计

本文件用于把 OPC 前端 V1 所需的 mock 数据进一步明确下来，目标是：

- 让前端页面可以立即接入结构化数据
- 让不同办公室之间的数据可以自然联动
- 让后续真实 agent runtime 接入时不需要推翻前端数据层

本文件与以下文档配套使用：

- [opc-pipeline-review.md](C:\Users\g3098\Desktop\CLAWSCOMPANY\opc-pipeline-review.md)
- [opc-frontend-architecture.md](C:\Users\g3098\Desktop\CLAWSCOMPANY\opc-frontend-architecture.md)
- [opc-frontend-implementation.md](C:\Users\g3098\Desktop\CLAWSCOMPANY\opc-frontend-implementation.md)
- [team-members.md](C:\Users\g3098\Desktop\CLAWSCOMPANY\team-members.md)

## V1 旗舰项目

V1 默认只围绕一个旗舰项目展开：

- `flagship-payroll`
- 中文名：工时 / 工资 / 周报助手
- 类型：iOS-first 效率微应用

所有办公室的 mock 数据都应围绕这个项目展开，避免一开始分散到多个项目导致主线变弱。

## 外部来源归一化原则

- 情报、skills、workflow 语义可以来自外部项目或赛前工具链，但进入前端前必须统一映射成 OPC 自己的 schema。
- 比赛现场默认只使用结构化 mock / 预抓取数据包，不把 live crawling 作为页面运行前提。
- 如果使用外部来源补强数据，也只能增强 `Signal / Skill / ToolPlugin / CollaborationEdge` 的内容，不改变它们的字段结构。

## Mock 数据文件建议

后续项目初始化后，建议按以下方式组织：

```text
mock/
├─ offices.ts
├─ agents.ts
├─ signals.ts
├─ trend-clusters.ts
├─ opportunities.ts
├─ tasks.ts
├─ projects.ts
├─ artifacts.ts
├─ skills.ts
├─ plugins.ts
├─ collaboration.ts
├─ metrics.ts
├─ partners.ts
├─ business-json.ts
├─ system-logs.ts
├─ memos.ts
└─ team-context.ts
```

## 补充：情报与立项领域对象样例

```ts
export const signals = [
  {
    id: "signal-xhs-payroll-1",
    source: "xiaohongshu",
    title: "打工人工资怎么算更直观",
    snippet: "很多人想快速看到时薪、日薪、月薪换算和加班收益。",
    tags: ["打工人", "工资计算", "效率工具"],
    heat: 89,
    painPoint: "工资和工时关系难以快速可视化。",
    createdAt: "2026-03-24T08:58:00+08:00",
  },
  {
    id: "signal-github-timesheet-1",
    source: "github",
    title: "轻量工时工具需求持续出现",
    snippet: "独立开发者和小团队仍在寻找更轻量、更好看的 timesheet 工具。",
    tags: ["timesheet", "productivity", "indie"],
    heat: 74,
    painPoint: "现有工具偏重，缺少更适合个人的体验。",
    createdAt: "2026-03-24T09:02:00+08:00",
  },
  {
    id: "signal-x-weekly-report-1",
    source: "x",
    title: "周报自动生成仍是高频抱怨点",
    snippet: "很多人吐槽周报重复、浪费时间，希望自动整理产出。",
    tags: ["周报", "自动化", "打工人"],
    heat: 81,
    painPoint: "重复性文本整理消耗时间。",
    createdAt: "2026-03-24T09:05:00+08:00",
  },
];

export const trendClusters = [
  {
    id: "cluster-worker-efficiency",
    name: "打工人效率微工具",
    summary: "工时记录、工资可视化和周报生成形成稳定的需求簇。",
    signalIds: ["signal-xhs-payroll-1", "signal-github-timesheet-1", "signal-x-weekly-report-1"],
    confidence: 0.91,
  },
];

export const opportunityCandidates = [
  {
    id: "opp-payroll-helper",
    clusterId: "cluster-worker-efficiency",
    title: "工时 / 工资 / 周报助手",
    targetUser: "有工时记录和周报整理需求的打工人",
    reasonNow: "社媒高频需求明显，iOS 微应用形态清晰，适合快速落地。",
    buildability: "高",
    score: {
      roi: 8.4,
      virality: 8.8,
      iosFit: 9.2,
      teamFit: 9.4,
      shipability: 8.7,
      total: 8.9,
    },
  },
];

export const opportunityBriefs = [
  {
    id: "brief-payroll-helper",
    candidateId: "opp-payroll-helper",
    projectName: "工时 / 工资 / 周报助手",
    targetUser: "希望快速记录工时并生成周报的打工人",
    coreProblem: "工时、工资和周报分散在多个工具里，体验碎片化。",
    coreFeatures: ["工时记录", "工资可视化", "周报生成"],
    differentiation: "更轻量、更好看、更适合 iOS-first 的个人使用场景。",
    monetization: "会员订阅或一次性买断。",
    riskNotes: ["需要避免与通用打卡应用过度同质化", "周报生成文案要控制模板感"],
  },
];
```

## 1. Offices 样例

```ts
export const offices = [
  {
    id: "founder",
    name: "Founder Office",
    floor: 5,
    description: "总部决策层与经营驾驶舱",
    agentIds: ["founder-em01"],
    activeProjectIds: ["flagship-payroll"],
    status: "reviewing",
  },
  {
    id: "team",
    name: "Team Office",
    floor: 4,
    description: "团队上下文注入层",
    agentIds: ["team-peng", "team-zhang", "team-randy", "team-shi"],
    activeProjectIds: ["flagship-payroll"],
    status: "working",
  },
  {
    id: "intel",
    name: "情报部",
    floor: 3,
    description: "信号挖掘与趋势归纳中心",
    agentIds: ["intel-scout", "intel-synth"],
    activeProjectIds: ["flagship-payroll"],
    status: "completed",
  },
  {
    id: "investment",
    name: "产品投资部",
    floor: 3,
    description: "立项会与机会评估中心",
    agentIds: ["pm-investor"],
    activeProjectIds: ["flagship-payroll"],
    status: "completed",
  },
  {
    id: "design",
    name: "设计部",
    floor: 2,
    description: "产品定义与视觉方向产出层",
    agentIds: ["design-director"],
    activeProjectIds: ["flagship-payroll"],
    status: "working",
  },
  {
    id: "engineering",
    name: "工程部",
    floor: 2,
    description: "App Cell 主生产车间",
    agentIds: ["eng-bald", "eng-builder"],
    activeProjectIds: ["flagship-payroll"],
    status: "working",
  },
  {
    id: "qa",
    name: "QA 部",
    floor: 1,
    description: "质量闸门与风险升级中心",
    agentIds: ["qa-inspector"],
    activeProjectIds: ["flagship-payroll"],
    status: "waiting",
  },
  {
    id: "release",
    name: "发行部",
    floor: 1,
    description: "App Store 上架材料生产室",
    agentIds: ["release-publisher"],
    activeProjectIds: ["flagship-payroll"],
    status: "working",
  },
  {
    id: "growth",
    name: "增长部",
    floor: 1,
    description: "外部 narrative 与增长实验中心",
    agentIds: ["growth-operator"],
    activeProjectIds: ["flagship-payroll"],
    status: "working",
  },
  {
    id: "partner",
    name: "外交部",
    floor: 4,
    description: "candidate、partner 与渠道关系中心",
    agentIds: ["partner-scout", "bd-operator"],
    activeProjectIds: ["flagship-payroll"],
    status: "reviewing",
  },
];
```

## 2. Agents 样例

### Founder Agent

```ts
export const founderAgent = {
  id: "founder-em01",
  name: "EM-01",
  title: "Founder / Chief Vision Officer",
  officeId: "founder",
  avatarKey: "founder-elon-like",
  tagline: "用第一性原理和极致速度驱动整家公司。",
  status: "reviewing",
  personalityTags: ["first-principles", "ship-fast", "high-standards"],
  strengths: ["战略判断", "机会拍板", "优先级切换"],
  currentTaskId: "task-founder-approve-release",
  skillIds: ["skill-prioritization", "skill-strategy", "skill-ceo-review"],
  pluginIds: ["plugin-metrics-board", "plugin-decision-memo"],
  collaboratorIds: ["pm-investor", "partner-scout", "release-publisher"],
  outputArtifactIds: [],
  decisionMemoIds: ["memo-founder-priority-shift"],
};
```

### Team Office Agents

```ts
export const teamAgents = [
  {
    id: "team-peng",
    name: "彭智炜",
    title: "Product Narrative Lead",
    officeId: "team",
    avatarKey: "team-peng",
    tagline: "把项目做成能讲、能赢、能传播的产品故事。",
    status: "working",
    personalityTags: ["builder", "operator", "storyteller"],
    strengths: ["产品化", "传播叙事", "黑客松策略"],
    currentTaskId: "task-team-peng-narrative",
    skillIds: ["skill-product", "skill-storytelling", "skill-marketing"],
    pluginIds: ["plugin-notion-docs", "plugin-social-brief"],
    collaboratorIds: ["pm-investor", "growth-operator", "founder-em01"],
    outputArtifactIds: ["artifact-growth-launch-plan"],
  },
  {
    id: "team-zhang",
    name: "张涛",
    title: "Agent Research & Scoring Lead",
    officeId: "team",
    avatarKey: "team-zhang",
    tagline: "把杂乱信号转成结构化机会判断。",
    status: "working",
    personalityTags: ["analytical", "open-source", "research-driven"],
    strengths: ["信号评分", "Agent 编排", "技术可行性判断"],
    currentTaskId: "task-team-zhang-scoring",
    skillIds: ["skill-scoring", "skill-agent-orchestration", "skill-research"],
    pluginIds: ["plugin-github-search", "plugin-arxiv-reader"],
    collaboratorIds: ["intel-scout", "intel-synth", "pm-investor"],
    outputArtifactIds: ["artifact-opportunity-brief"],
  },
  {
    id: "team-randy",
    name: "Randy Xian",
    title: "iOS Product Builder",
    officeId: "team",
    avatarKey: "team-randy",
    tagline: "把想法快速做成像样、能上架的 iOS 产品。",
    status: "working",
    personalityTags: ["ai-native", "taste-driven", "ship-fast"],
    strengths: ["SwiftUI", "审美表达", "App Store 落地"],
    currentTaskId: "task-team-randy-ui-build",
    skillIds: ["skill-swiftui", "skill-ios-design", "skill-release"],
    pluginIds: ["plugin-ios-preview", "plugin-app-store-pack"],
    collaboratorIds: ["design-director", "eng-builder", "release-publisher"],
    outputArtifactIds: ["artifact-design-core-screens", "artifact-release-pack"],
  },
  {
    id: "team-shi",
    name: "石千山",
    title: "Platform & Collaboration Engineer",
    officeId: "team",
    avatarKey: "team-shi",
    tagline: "让系统状态、协作关系和工程底层真正跑起来。",
    status: "working",
    personalityTags: ["systematic", "platform-minded", "engineering-heavy"],
    strengths: ["平台工程", "协作系统", "高性能前端"],
    currentTaskId: "task-team-shi-a2a-engine",
    skillIds: ["skill-platform", "skill-realtime-ui", "skill-observability"],
    pluginIds: ["plugin-task-engine", "plugin-log-stream"],
    collaboratorIds: ["eng-bald", "qa-inspector", "founder-em01"],
    outputArtifactIds: ["artifact-a2a-state-spec"],
  },
];
```

### 各部门 Agent 样例

```ts
export const officeAgents = [
  {
    id: "intel-scout",
    name: "Trend Scout",
    title: "Signal Discovery Agent",
    officeId: "intel",
    avatarKey: "intel-scout",
    tagline: "从多平台抓出高频痛点与微产品机会。",
    status: "completed",
    personalityTags: ["curious", "fast", "market-sensitive"],
    strengths: ["趋势捕捉", "热度扫描", "多源检索"],
    currentTaskId: "task-intel-scout-scan",
    skillIds: ["skill-signal-mining", "skill-xhs-search", "skill-github-search"],
    pluginIds: ["plugin-github-search", "plugin-xhs-search", "plugin-x-search"],
    collaboratorIds: ["intel-synth", "team-zhang"],
    outputArtifactIds: ["artifact-signal-cluster"],
  },
  {
    id: "intel-synth",
    name: "Insight Synthesizer",
    title: "Signal Structuring Agent",
    officeId: "intel",
    avatarKey: "intel-synth",
    tagline: "把噪音信息整理成可立项的判断。",
    status: "completed",
    personalityTags: ["structured", "calm", "evidence-driven"],
    strengths: ["聚类", "归因", "洞察提炼"],
    currentTaskId: "task-intel-synth-brief",
    skillIds: ["skill-clustering", "skill-summarization", "skill-scoring"],
    pluginIds: ["plugin-brief-writer", "plugin-ranking-engine"],
    collaboratorIds: ["intel-scout", "pm-investor"],
    outputArtifactIds: ["artifact-opportunity-brief"],
  },
  {
    id: "pm-investor",
    name: "Project Investor",
    title: "Opportunity Committee Lead",
    officeId: "investment",
    avatarKey: "pm-investor",
    tagline: "立项不是因为能做，而是因为值得做。",
    status: "completed",
    personalityTags: ["selective", "product-minded", "roi-focused"],
    strengths: ["立项评审", "ROI 判断", "优先级管理"],
    currentTaskId: "task-investment-approve",
    skillIds: ["skill-product", "skill-roi", "skill-committee-review"],
    pluginIds: ["plugin-opportunity-score", "plugin-founder-submit"],
    collaboratorIds: ["founder-em01", "team-peng", "team-zhang"],
    outputArtifactIds: ["artifact-opportunity-brief"],
  },
  {
    id: "design-director",
    name: "Design Director",
    title: "UI / UX Design Agent",
    officeId: "design",
    avatarKey: "design-director",
    tagline: "把粗糙想法变成有产品感的界面。",
    status: "working",
    personalityTags: ["tasteful", "visual", "detail-oriented"],
    strengths: ["信息架构", "视觉方向", "核心页面设计"],
    currentTaskId: "task-design-core-screens",
    skillIds: ["skill-ui", "skill-ux", "skill-design-system"],
    pluginIds: ["plugin-screen-gallery", "plugin-moodboard"],
    collaboratorIds: ["team-randy", "eng-builder"],
    outputArtifactIds: ["artifact-design-core-screens"],
  },
  {
    id: "eng-bald",
    name: "Bald Engineer",
    title: "System Engineer Agent",
    officeId: "engineering",
    avatarKey: "eng-bald",
    tagline: "头发没了，页面得跑起来。",
    status: "working",
    personalityTags: ["focused", "sleep-deprived", "execution-first"],
    strengths: ["架构搭建", "状态联动", "集成调试"],
    currentTaskId: "task-eng-layout-shell",
    skillIds: ["skill-react", "skill-nextjs", "skill-state-management"],
    pluginIds: ["plugin-terminal", "plugin-component-registry"],
    collaboratorIds: ["eng-builder", "team-shi", "qa-inspector"],
    outputArtifactIds: ["artifact-code-shell"],
  },
  {
    id: "eng-builder",
    name: "App Builder",
    title: "Product Engineering Agent",
    officeId: "engineering",
    avatarKey: "eng-builder",
    tagline: "今天立项，今天看到能跑的页面。",
    status: "working",
    personalityTags: ["builder", "fast", "ui-aware"],
    strengths: ["SwiftUI", "界面实现", "产品落地"],
    currentTaskId: "task-eng-feature-flow",
    skillIds: ["skill-swiftui", "skill-typescript", "skill-app-flow"],
    pluginIds: ["plugin-ios-preview", "plugin-codegen"],
    collaboratorIds: ["design-director", "team-randy", "eng-bald"],
    outputArtifactIds: ["artifact-code-feature-flow"],
  },
  {
    id: "qa-inspector",
    name: "Review Inspector",
    title: "QA & Risk Agent",
    officeId: "qa",
    avatarKey: "qa-inspector",
    tagline: "不让问题带着主角光环溜进发布阶段。",
    status: "waiting",
    personalityTags: ["strict", "methodical", "risk-aware"],
    strengths: ["风险识别", "集成验证", "升级判断"],
    currentTaskId: "task-qa-review-gate",
    skillIds: ["skill-qa", "skill-risk", "skill-integration-check"],
    pluginIds: ["plugin-risk-radar", "plugin-json-report"],
    collaboratorIds: ["eng-bald", "release-publisher", "founder-em01"],
    outputArtifactIds: ["artifact-qa-report"],
  },
  {
    id: "release-publisher",
    name: "App Store Publisher",
    title: "Release Pack Agent",
    officeId: "release",
    avatarKey: "release-publisher",
    tagline: "做完不算赢，能上架才算接近胜利。",
    status: "working",
    personalityTags: ["precise", "store-aware", "packaging-minded"],
    strengths: ["metadata", "截图叙事", "审核风险"],
    currentTaskId: "task-release-pack",
    skillIds: ["skill-release", "skill-copywriting", "skill-review-guideline"],
    pluginIds: ["plugin-app-store-pack", "plugin-screenshot-storyboard"],
    collaboratorIds: ["team-randy", "growth-operator", "founder-em01"],
    outputArtifactIds: ["artifact-release-pack"],
  },
  {
    id: "growth-operator",
    name: "Growth Operator",
    title: "Launch Narrative Agent",
    officeId: "growth",
    avatarKey: "growth-operator",
    tagline: "让产品不仅能做出来，还能被看见。",
    status: "working",
    personalityTags: ["social-native", "story-first", "growth-oriented"],
    strengths: ["内容包装", "传播实验", "发售叙事"],
    currentTaskId: "task-growth-launch-plan",
    skillIds: ["skill-storytelling", "skill-social-launch", "skill-growth-hypothesis"],
    pluginIds: ["plugin-social-brief", "plugin-launch-plan"],
    collaboratorIds: ["team-peng", "release-publisher", "partner-scout"],
    outputArtifactIds: ["artifact-growth-launch-plan"],
  },
  {
    id: "partner-scout",
    name: "Partner Scout",
    title: "Partnership Discovery Agent",
    officeId: "partner",
    avatarKey: "partner-scout",
    tagline: "找对渠道和伙伴，比多做十个功能更值钱。",
    status: "reviewing",
    personalityTags: ["commercial", "networked", "strategic"],
    strengths: ["候选伙伴发现", "渠道匹配", "商业判断"],
    currentTaskId: "task-partner-scout-pipeline",
    skillIds: ["skill-bd-research", "skill-channel-fit", "skill-partner-mapping"],
    pluginIds: ["plugin-partner-board", "plugin-channel-map"],
    collaboratorIds: ["bd-operator", "growth-operator", "founder-em01"],
    outputArtifactIds: ["artifact-partner-memo"],
  },
  {
    id: "bd-operator",
    name: "BD Operator",
    title: "Business Development Agent",
    officeId: "partner",
    avatarKey: "bd-operator",
    tagline: "把合作机会从名单推进到下一步动作。",
    status: "reviewing",
    personalityTags: ["follow-through", "clear", "business-minded"],
    strengths: ["pipeline 管理", "next action 推进", "合作状态同步"],
    currentTaskId: "task-partner-follow-up",
    skillIds: ["skill-bd-ops", "skill-pipeline", "skill-sync-report"],
    pluginIds: ["plugin-partner-board", "plugin-founder-sync"],
    collaboratorIds: ["partner-scout", "founder-em01", "team-peng"],
    outputArtifactIds: ["artifact-partner-memo"],
  },
];
```

## 3. Projects 样例

```ts
export const projects = [
  {
    id: "flagship-payroll",
    name: "工时 / 工资 / 周报助手",
    category: "iOS-first 微应用",
    summary: "面向打工人的工时记录、工资可视化与周报生成工具。",
    primaryStage: "release_pack",
    activeStageIds: ["design", "build", "release_pack", "growth", "decision"],
    spotlightOfficeId: "release",
    activeOfficeIds: ["design", "engineering", "release", "growth", "founder"],
    ownerAgentIds: ["release-publisher", "team-randy"],
    artifactIds: [
      "artifact-signal-cluster",
      "artifact-opportunity-brief",
      "artifact-design-core-screens",
      "artifact-code-shell",
      "artifact-code-feature-flow",
      "artifact-qa-report",
      "artifact-release-pack",
      "artifact-growth-launch-plan",
      "artifact-partner-memo",
      "artifact-a2a-state-spec",
    ],
  },
];
```

## 4. Tasks 样例

```ts
export const tasks = [
  {
    id: "task-intel-scout-scan",
    title: "扫描打工人工具类高频痛点信号",
    projectId: "flagship-payroll",
    officeId: "intel",
    ownerAgentId: "intel-scout",
    percent: 100,
    stage: "signal_mining",
    status: "completed",
    nextAction: "交给 Insight Synthesizer 归纳趋势簇",
    startedAt: "2026-03-24T09:00:00+08:00",
    updatedAt: "2026-03-24T09:18:00+08:00",
  },
  {
    id: "task-intel-synth-brief",
    title: "归纳打工人工具趋势簇并输出立项摘要",
    projectId: "flagship-payroll",
    officeId: "intel",
    ownerAgentId: "intel-synth",
    percent: 100,
    stage: "signal_mining",
    status: "completed",
    linkedArtifactIds: ["artifact-signal-cluster"],
    nextAction: "提交产品投资部进行机会评审",
    startedAt: "2026-03-24T09:12:00+08:00",
    updatedAt: "2026-03-24T09:22:00+08:00",
  },
  {
    id: "task-investment-approve",
    title: "评估工时 / 工资 / 周报助手的立项价值",
    projectId: "flagship-payroll",
    officeId: "investment",
    ownerAgentId: "pm-investor",
    percent: 100,
    stage: "opportunity_committee",
    status: "completed",
    linkedArtifactIds: ["artifact-opportunity-brief"],
    nextAction: "提交 Founder 批准并生成 App Cell",
    startedAt: "2026-03-24T09:20:00+08:00",
    updatedAt: "2026-03-24T09:40:00+08:00",
  },
  {
    id: "task-team-peng-narrative",
    title: "整理项目 narrative 与路演主叙事",
    projectId: "flagship-payroll",
    officeId: "team",
    ownerAgentId: "team-peng",
    percent: 61,
    stage: "team_context",
    status: "working",
    nextAction: "同步给增长部和 Founder Office",
    startedAt: "2026-03-24T09:48:00+08:00",
    updatedAt: "2026-03-24T10:24:00+08:00",
  },
  {
    id: "task-team-zhang-scoring",
    title: "校准机会评分与 team fit 权重",
    projectId: "flagship-payroll",
    officeId: "team",
    ownerAgentId: "team-zhang",
    percent: 66,
    stage: "team_context",
    status: "working",
    nextAction: "同步到产品投资部评分卡",
    startedAt: "2026-03-24T09:35:00+08:00",
    updatedAt: "2026-03-24T10:21:00+08:00",
  },
  {
    id: "task-team-randy-ui-build",
    title: "校准核心页面视觉方向与 iOS 体验细节",
    projectId: "flagship-payroll",
    officeId: "team",
    ownerAgentId: "team-randy",
    percent: 58,
    stage: "team_context",
    status: "working",
    nextAction: "推动设计稿与 Release Pack 统一审美",
    startedAt: "2026-03-24T09:50:00+08:00",
    updatedAt: "2026-03-24T10:25:00+08:00",
  },
  {
    id: "task-team-shi-a2a-engine",
    title: "定义 A2A 协作层与任务状态引擎",
    projectId: "flagship-payroll",
    officeId: "team",
    ownerAgentId: "team-shi",
    percent: 62,
    stage: "platform",
    status: "working",
    nextAction: "同步给工程部接入飞线和 observability",
    startedAt: "2026-03-24T09:42:00+08:00",
    updatedAt: "2026-03-24T10:22:00+08:00",
  },
  {
    id: "task-design-core-screens",
    title: "输出首页、记录页、周报页设计稿",
    projectId: "flagship-payroll",
    officeId: "design",
    ownerAgentId: "design-director",
    percent: 72,
    stage: "design",
    status: "working",
    linkedArtifactIds: ["artifact-design-core-screens"],
    nextAction: "同步给工程部落地页面结构",
    startedAt: "2026-03-24T09:45:00+08:00",
    updatedAt: "2026-03-24T10:15:00+08:00",
  },
  {
    id: "task-eng-layout-shell",
    title: "搭建 HQ 与办公室页面骨架",
    projectId: "flagship-payroll",
    officeId: "engineering",
    ownerAgentId: "eng-bald",
    percent: 68,
    stage: "build",
    status: "working",
    linkedArtifactIds: ["artifact-code-shell"],
    blocker: "A2A 飞线层和右侧抽屉布局仍需统一",
    nextAction: "完成 RootLayout 和全局抽屉联动",
    startedAt: "2026-03-24T10:00:00+08:00",
    updatedAt: "2026-03-24T10:26:00+08:00",
  },
  {
    id: "task-eng-feature-flow",
    title: "实现工时记录与工资预览核心流程",
    projectId: "flagship-payroll",
    officeId: "engineering",
    ownerAgentId: "eng-builder",
    percent: 55,
    stage: "build",
    status: "working",
    linkedArtifactIds: ["artifact-code-feature-flow"],
    nextAction: "补设备预览和核心状态展示",
    startedAt: "2026-03-24T10:05:00+08:00",
    updatedAt: "2026-03-24T10:28:00+08:00",
  },
  {
    id: "task-qa-review-gate",
    title: "检查发布前必须修复的问题",
    projectId: "flagship-payroll",
    officeId: "qa",
    ownerAgentId: "qa-inspector",
    percent: 32,
    stage: "qa",
    status: "waiting",
    linkedArtifactIds: ["artifact-qa-report"],
    blocker: "需要工程部先提交最新设备预览与代码摘要",
    nextAction: "等待工程部新版本产物",
    startedAt: "2026-03-24T10:20:00+08:00",
    updatedAt: "2026-03-24T10:29:00+08:00",
  },
  {
    id: "task-release-pack",
    title: "生成 Release Pack 首版",
    projectId: "flagship-payroll",
    officeId: "release",
    ownerAgentId: "release-publisher",
    percent: 64,
    stage: "release_pack",
    status: "working",
    dueAt: "2026-03-24T12:00:00+08:00",
    linkedArtifactIds: ["artifact-release-pack"],
    nextAction: "完成 subtitle、keywords、五张截图卖点说明",
    startedAt: "2026-03-24T10:10:00+08:00",
    updatedAt: "2026-03-24T10:31:00+08:00",
  },
  {
    id: "task-growth-launch-plan",
    title: "制定首周传播计划与叙事方向",
    projectId: "flagship-payroll",
    officeId: "growth",
    ownerAgentId: "growth-operator",
    percent: 48,
    stage: "growth",
    status: "working",
    linkedArtifactIds: ["artifact-growth-launch-plan"],
    nextAction: "同步到 Founder Office 做优先级决策",
    startedAt: "2026-03-24T10:12:00+08:00",
    updatedAt: "2026-03-24T10:30:00+08:00",
  },
  {
    id: "task-partner-scout-pipeline",
    title: "梳理首批媒体与渠道 partner pipeline",
    projectId: "flagship-payroll",
    officeId: "partner",
    ownerAgentId: "partner-scout",
    percent: 51,
    stage: "partner",
    status: "reviewing",
    dueAt: "2026-03-24T11:40:00+08:00",
    linkedArtifactIds: ["artifact-partner-memo"],
    nextAction: "整理高优先级候选方并同步 Founder",
    startedAt: "2026-03-24T10:08:00+08:00",
    updatedAt: "2026-03-24T10:27:00+08:00",
  },
  {
    id: "task-partner-follow-up",
    title: "推进 candidate 到下一步行动",
    projectId: "flagship-payroll",
    officeId: "partner",
    ownerAgentId: "bd-operator",
    percent: 37,
    stage: "partner",
    status: "reviewing",
    dueAt: "2026-03-24T12:10:00+08:00",
    nextAction: "准备 Founder 可决策版的 next actions",
    startedAt: "2026-03-24T10:14:00+08:00",
    updatedAt: "2026-03-24T10:29:00+08:00",
  },
  {
    id: "task-founder-approve-release",
    title: "决定是否将当前版本推进为 Demo 主线",
    projectId: "flagship-payroll",
    officeId: "founder",
    ownerAgentId: "founder-em01",
    percent: 83,
    stage: "decision",
    status: "reviewing",
    nextAction: "查看 Release Pack 缺口和外交部线索后拍板",
    startedAt: "2026-03-24T10:25:00+08:00",
    updatedAt: "2026-03-24T10:32:00+08:00",
  },
];
```

## 5. Artifacts 样例

```ts
export const artifacts = [
  {
    id: "artifact-signal-cluster",
    type: "signal_brief",
    title: "打工人工具信号簇",
    summary: "来自 GitHub/X/小红书 的高频痛点聚类，聚焦工时、工资、周报与效率焦虑。",
    projectId: "flagship-payroll",
    ownerOfficeId: "intel",
    ownerAgentId: "intel-scout",
    sourceTaskIds: ["task-intel-synth-brief"],
    contentBlocks: [
      {
        id: "block-signal-cluster-top-pains",
        kind: "list",
        title: "高频痛点",
        items: ["工时记录分散", "工资估算麻烦", "周报整理重复劳动"],
      },
      {
        id: "block-signal-cluster-sources",
        kind: "kv",
        title: "来源摘要",
        entries: [
          { label: "GitHub", value: "开源工时工具和周报模板需求明显" },
          { label: "小红书", value: "打工人效率类内容互动高" },
          { label: "X", value: "围绕 work log 和 personal analytics 的讨论在增长" },
        ],
      },
    ],
    updatedAt: "2026-03-24T09:18:00+08:00",
  },
  {
    id: "artifact-opportunity-brief",
    type: "opportunity_brief",
    title: "工时 / 工资 / 周报助手 Opportunity Brief",
    summary: "高传播性、高 buildability、适合 iOS 微应用立项的机会说明。",
    projectId: "flagship-payroll",
    ownerOfficeId: "investment",
    ownerAgentId: "pm-investor",
    sourceTaskIds: ["task-investment-approve"],
    contentBlocks: [
      {
        id: "block-opportunity-brief-score",
        kind: "kv",
        title: "评分卡",
        entries: [
          { label: "ROI", value: "8.4" },
          { label: "Virality", value: "8.8" },
          { label: "iOS Fit", value: "9.2" },
          { label: "Team Fit", value: "9.4" },
        ],
      },
      {
        id: "block-opportunity-brief-core",
        kind: "list",
        title: "立项理由",
        items: ["社媒痛点强", "适合 2-7 天做完", "适合 App Store 展示与传播"],
      },
    ],
    updatedAt: "2026-03-24T09:40:00+08:00",
  },
  {
    id: "artifact-design-core-screens",
    type: "design_spec",
    title: "核心页面设计稿",
    summary: "首页、记录页、工资预览页、周报页的设计方向与页面结构。",
    projectId: "flagship-payroll",
    ownerOfficeId: "design",
    ownerAgentId: "design-director",
    sourceTaskIds: ["task-design-core-screens"],
    contentBlocks: [
      {
        id: "block-design-core-screens-pages",
        kind: "list",
        title: "核心页面",
        items: ["首页 Dashboard", "工时记录页", "工资预估页", "周报生成页"],
      },
      {
        id: "block-design-core-screens-direction",
        kind: "markdown",
        title: "视觉方向",
        markdown: "iOS-first、轻量效率工具、强调打工人情绪价值与可视化反馈。",
      },
    ],
    updatedAt: "2026-03-24T10:15:00+08:00",
  },
  {
    id: "artifact-code-shell",
    type: "code_summary",
    title: "前端页面骨架摘要",
    summary: "HQ、办公室页面、全局抽屉、A2A overlay 的骨架结构。",
    projectId: "flagship-payroll",
    ownerOfficeId: "engineering",
    ownerAgentId: "eng-bald",
    sourceTaskIds: ["task-eng-layout-shell"],
    contentBlocks: [
      {
        id: "block-code-shell-structure",
        kind: "list",
        title: "已完成结构",
        items: ["RootLayout", "HQ Overview", "Office routes", "Global drawers"],
      },
      {
        id: "block-code-shell-snippet",
        kind: "code",
        title: "结构片段",
        language: "tsx",
        code: "return <RootLayout><MainViewport /><GlobalDrawers /></RootLayout>;",
      },
    ],
    updatedAt: "2026-03-24T10:26:00+08:00",
  },
  {
    id: "artifact-code-feature-flow",
    type: "code_summary",
    title: "核心功能流代码摘要",
    summary: "工时记录、工资预估、周报生成流程的页面联动与状态逻辑。",
    projectId: "flagship-payroll",
    ownerOfficeId: "engineering",
    ownerAgentId: "eng-builder",
    sourceTaskIds: ["task-eng-feature-flow"],
    contentBlocks: [
      {
        id: "block-code-feature-flow-modules",
        kind: "list",
        title: "主流程模块",
        items: ["工时输入", "工资预览", "周报生成", "状态同步"],
      },
      {
        id: "block-code-feature-flow-state",
        kind: "kv",
        title: "状态逻辑",
        entries: [
          { label: "source of truth", value: "本地 mock state + project context" },
          { label: "blocking point", value: "设备预览与抽屉路由同步" },
        ],
      },
    ],
    updatedAt: "2026-03-24T10:28:00+08:00",
  },
  {
    id: "artifact-qa-report",
    type: "qa_report",
    title: "发布前风险报告",
    summary: "当前存在的布局、数据联动和发布叙事风险说明。",
    projectId: "flagship-payroll",
    ownerOfficeId: "qa",
    ownerAgentId: "qa-inspector",
    sourceTaskIds: ["task-qa-review-gate"],
    contentBlocks: [
      {
        id: "block-qa-report-checklist",
        kind: "checklist",
        title: "关键检查项",
        items: [
          { label: "HQ 主链路可演示", checked: true },
          { label: "工程部设备预览更新", checked: false },
          { label: "发行部 metadata 齐套", checked: false },
        ],
      },
      {
        id: "block-qa-report-risks",
        kind: "list",
        title: "主要风险",
        items: ["项目并行状态表达还需统一", "A2A overlay 与抽屉层级待验证"],
      },
    ],
    updatedAt: "2026-03-24T10:29:00+08:00",
  },
  {
    id: "artifact-release-pack",
    type: "release_pack",
    title: "Release Pack 首版",
    summary: "包含 metadata、截图故事线、图标方向、审核 checklist。",
    projectId: "flagship-payroll",
    ownerOfficeId: "release",
    ownerAgentId: "release-publisher",
    sourceTaskIds: ["task-release-pack"],
    contentBlocks: [
      {
        id: "block-release-pack-metadata",
        kind: "kv",
        title: "Metadata",
        entries: [
          { label: "App Name", value: "工时 / 工资 / 周报助手" },
          { label: "Subtitle", value: "记录工时，秒算工资，自动成周报" },
          { label: "Keywords", value: "工时,工资,周报,效率,打工人" },
        ],
      },
      {
        id: "block-release-pack-checklist",
        kind: "checklist",
        title: "上架检查",
        items: [
          { label: "截图故事线完成", checked: false },
          { label: "权限说明完成", checked: true },
          { label: "重复应用风险已评估", checked: true },
        ],
      },
    ],
    updatedAt: "2026-03-24T10:31:00+08:00",
  },
  {
    id: "artifact-growth-launch-plan",
    type: "growth_plan",
    title: "首周 Launch Plan",
    summary: "围绕小红书、B 站、X 的首周传播与内容节奏安排。",
    projectId: "flagship-payroll",
    ownerOfficeId: "growth",
    ownerAgentId: "growth-operator",
    sourceTaskIds: ["task-growth-launch-plan"],
    contentBlocks: [
      {
        id: "block-growth-launch-plan-channels",
        kind: "list",
        title: "首周渠道",
        items: ["小红书种草", "B 站幕后构建故事", "X 发布 build-in-public 碎片"],
      },
      {
        id: "block-growth-launch-plan-goals",
        kind: "kv",
        title: "目标",
        entries: [
          { label: "核心目标", value: "拿到第一批真实用户反馈" },
          { label: "叙事重点", value: "一人公司 OS 如何在一天内做出 App" },
        ],
      },
    ],
    updatedAt: "2026-03-24T10:30:00+08:00",
  },
  {
    id: "artifact-partner-memo",
    type: "partner_memo",
    title: "Partner Pipeline 摘要",
    summary: "候选渠道、媒体合作方和推荐 next action。",
    projectId: "flagship-payroll",
    ownerOfficeId: "partner",
    ownerAgentId: "partner-scout",
    sourceTaskIds: ["task-partner-scout-pipeline", "task-partner-follow-up"],
    contentBlocks: [
      {
        id: "block-partner-memo-top-leads",
        kind: "list",
        title: "高优先级候选方",
        items: ["打工人效率类小红书博主", "独立开发者社区", "应用测评媒体"],
      },
      {
        id: "block-partner-memo-actions",
        kind: "kv",
        title: "下一步动作",
        entries: [
          { label: "媒体触达", value: "整理首发资料包" },
          { label: "渠道触达", value: "确认投稿栏目与发布时间" },
        ],
      },
    ],
    updatedAt: "2026-03-24T10:27:00+08:00",
  },
  {
    id: "artifact-a2a-state-spec",
    type: "code_summary",
    title: "A2A 状态流设计说明",
    summary: "飞线、任务包状态和实时协作层的结构设计。",
    projectId: "flagship-payroll",
    ownerOfficeId: "team",
    ownerAgentId: "team-shi",
    sourceTaskIds: ["task-team-shi-a2a-engine"],
    contentBlocks: [
      {
        id: "block-a2a-state-spec-types",
        kind: "list",
        title: "协作类型",
        items: ["handoff", "review", "escalation", "sync"],
      },
      {
        id: "block-a2a-state-spec-summary",
        kind: "markdown",
        title: "设计说明",
        markdown: "协作边不只是飞线动画，还要携带项目、产物、摘要和时间戳，便于回放与过滤。",
      },
    ],
    updatedAt: "2026-03-24T10:22:00+08:00",
  },
];
```

## 6. Skills 样例

```ts
export const skills = [
  { id: "skill-prioritization", name: "优先级管理", level: "core", description: "基于资源和目标动态调整优先级。" },
  { id: "skill-strategy", name: "战略判断", level: "core", description: "围绕胜率和势能做方向拍板。" },
  { id: "skill-ceo-review", name: "CEO Review", level: "strong", description: "以 Founder 视角重构问题和结论。" },
  { id: "skill-product", name: "产品判断", level: "core", description: "识别值得做的功能与用户价值。" },
  { id: "skill-storytelling", name: "产品叙事", level: "core", description: "把项目讲成外部一眼能懂的故事。" },
  { id: "skill-marketing", name: "传播包装", level: "strong", description: "将产品与渠道传播绑定。" },
  { id: "skill-scoring", name: "机会评分", level: "core", description: "基于 ROI、传播性、iOS fit 做机会判断。" },
  { id: "skill-agent-orchestration", name: "Agent 编排", level: "strong", description: "协调多个 agent 的流程与交付。" },
  { id: "skill-research", name: "研究归纳", level: "strong", description: "把研究输入整理成可执行结论。" },
  { id: "skill-signal-mining", name: "信号挖掘", level: "core", description: "从多平台读取高价值需求信号。" },
  { id: "skill-xhs-search", name: "小红书洞察", level: "support", description: "从中文社媒中提取需求与传播信号。" },
  { id: "skill-github-search", name: "GitHub 趋势洞察", level: "support", description: "从 GitHub 趋势与 issue 中发现机会。" },
  { id: "skill-clustering", name: "趋势聚类", level: "strong", description: "把分散信号归成可执行主题簇。" },
  { id: "skill-summarization", name: "结构化总结", level: "strong", description: "将输入压缩为可立项的摘要。" },
  { id: "skill-roi", name: "ROI 判断", level: "core", description: "综合收益、传播性和可落地性做判断。" },
  { id: "skill-committee-review", name: "委员会评审", level: "strong", description: "模拟立项会对候选机会做取舍。" },
  { id: "skill-ui", name: "界面设计", level: "core", description: "输出具备产品感的界面方向。" },
  { id: "skill-ux", name: "体验设计", level: "strong", description: "设计可解释、可流转的用户流程。" },
  { id: "skill-design-system", name: "设计系统", level: "strong", description: "统一视觉语言、层级和组件规范。" },
  { id: "skill-swiftui", name: "SwiftUI 开发", level: "core", description: "实现 iOS-first 界面和核心流程。" },
  { id: "skill-react", name: "React 开发", level: "strong", description: "构建前端页面与交互层。" },
  { id: "skill-nextjs", name: "Next.js 架构", level: "strong", description: "组织路由、布局和页面结构。" },
  { id: "skill-state-management", name: "状态管理", level: "strong", description: "让跨页面与跨模块数据流稳定工作。" },
  { id: "skill-typescript", name: "TypeScript 建模", level: "strong", description: "通过类型约束前端数据一致性。" },
  { id: "skill-app-flow", name: "产品流程实现", level: "strong", description: "把页面和业务流程真正串起来。" },
  { id: "skill-ios-design", name: "iOS 产品设计", level: "strong", description: "遵循 Apple HIG 的界面审美与交互。" },
  { id: "skill-qa", name: "质量验证", level: "strong", description: "检查关键流程是否真实联动。" },
  { id: "skill-risk", name: "风险识别", level: "strong", description: "提前发现发布与叙事风险。" },
  { id: "skill-integration-check", name: "集成验收", level: "strong", description: "以真实模块联动结果作为验收标准。" },
  { id: "skill-release", name: "App Store 发布", level: "core", description: "生成上架所需的材料和审核检查项。" },
  { id: "skill-copywriting", name: "商店文案", level: "strong", description: "编写标题、副标题、描述和截图卖点。" },
  { id: "skill-review-guideline", name: "审核规则理解", level: "strong", description: "识别 Apple 审核相关风险。" },
  { id: "skill-social-launch", name: "社媒发布", level: "strong", description: "围绕渠道定制启动内容。" },
  { id: "skill-growth-hypothesis", name: "增长假设设计", level: "strong", description: "设计首周验证路径和指标。" },
  { id: "skill-platform", name: "平台工程", level: "core", description: "搭建底层状态、结构与协作层。" },
  { id: "skill-bd-research", name: "合作研究", level: "support", description: "寻找适合的合作方与外部资源。" },
  { id: "skill-channel-fit", name: "渠道匹配", level: "support", description: "判断产品与渠道的适配度。" },
  { id: "skill-partner-mapping", name: "合作图谱整理", level: "support", description: "将 candidate 和 partner 转成结构化 pipeline。" },
  { id: "skill-bd-ops", name: "BD 推进", level: "support", description: "推进 next action 与状态同步。" },
  { id: "skill-pipeline", name: "Pipeline 管理", level: "support", description: "维护合作链路的阶段状态。" },
  { id: "skill-sync-report", name: "同步汇报", level: "support", description: "将合作动态同步给 Founder 和相关办公室。" },
  { id: "skill-realtime-ui", name: "实时交互前端", level: "strong", description: "构建任务流与飞线可视化。" },
  { id: "skill-observability", name: "可观测性设计", level: "strong", description: "让模块状态与异常可追踪。" },
];
```

## 7. Tool Plugins 样例

```ts
export const plugins = [
  { id: "plugin-metrics-board", name: "Metrics Board", category: "tool", enabled: true, permission: "read", description: "展示全公司关键经营指标。" },
  { id: "plugin-decision-memo", name: "Decision Memo", category: "tool", enabled: true, permission: "execute", description: "生成并下发 Founder 决策 memo。" },
  { id: "plugin-notion-docs", name: "Notion Docs", category: "tool", enabled: true, permission: "read", description: "读取项目文档与整理说明。" },
  { id: "plugin-github-search", name: "GitHub Search", category: "data", enabled: true, permission: "read", description: "读取 GitHub 趋势与 issue 信号。" },
  { id: "plugin-xhs-search", name: "小红书 Search", category: "data", enabled: true, permission: "read", description: "读取小红书高频需求与讨论。" },
  { id: "plugin-x-search", name: "X Search", category: "data", enabled: true, permission: "read", description: "读取 X 上的趋势与讨论。" },
  { id: "plugin-arxiv-reader", name: "arXiv Reader", category: "data", enabled: true, permission: "read", description: "读取论文摘要与前沿方向。" },
  { id: "plugin-brief-writer", name: "Brief Writer", category: "tool", enabled: true, permission: "execute", description: "把信号整理成 brief。" },
  { id: "plugin-ranking-engine", name: "Ranking Engine", category: "tool", enabled: true, permission: "execute", description: "计算候选机会的排序结果。" },
  { id: "plugin-opportunity-score", name: "Opportunity Score", category: "tool", enabled: true, permission: "execute", description: "计算候选机会评分。" },
  { id: "plugin-founder-submit", name: "Founder Submit", category: "tool", enabled: true, permission: "execute", description: "把机会提交给 Founder Office 拍板。" },
  { id: "plugin-screen-gallery", name: "Screen Gallery", category: "tool", enabled: true, permission: "execute", description: "展示设计稿与页面预览。" },
  { id: "plugin-moodboard", name: "Moodboard", category: "tool", enabled: true, permission: "execute", description: "组织视觉方向与设计关键词。" },
  { id: "plugin-terminal", name: "Terminal", category: "tool", enabled: true, permission: "execute", description: "执行工程相关命令与验证。" },
  { id: "plugin-component-registry", name: "Component Registry", category: "tool", enabled: true, permission: "read", description: "读取组件库和页面骨架。" },
  { id: "plugin-ios-preview", name: "iOS Preview", category: "tool", enabled: true, permission: "execute", description: "展示设备预览和页面流。" },
  { id: "plugin-codegen", name: "Codegen", category: "model", enabled: true, permission: "execute", description: "生成前端或 SwiftUI 页面代码。" },
  { id: "plugin-risk-radar", name: "Risk Radar", category: "tool", enabled: true, permission: "execute", description: "聚合当前质量与审核风险。" },
  { id: "plugin-json-report", name: "JSON Report", category: "tool", enabled: true, permission: "read", description: "展示业务层 JSON 输出。" },
  { id: "plugin-app-store-pack", name: "App Store Pack", category: "tool", enabled: true, permission: "execute", description: "生成 metadata 和上架素材包。" },
  { id: "plugin-screenshot-storyboard", name: "Screenshot Storyboard", category: "tool", enabled: true, permission: "execute", description: "生成截图故事线与卖点说明。" },
  { id: "plugin-social-brief", name: "Social Brief", category: "tool", enabled: true, permission: "execute", description: "生成内容传播摘要和 narrative。" },
  { id: "plugin-launch-plan", name: "Launch Plan", category: "tool", enabled: true, permission: "execute", description: "生成首周发布节奏和动作计划。" },
  { id: "plugin-partner-board", name: "Partner Board", category: "tool", enabled: true, permission: "execute", description: "管理 partner pipeline。" },
  { id: "plugin-channel-map", name: "Channel Map", category: "tool", enabled: true, permission: "execute", description: "展示渠道与合作入口图谱。" },
  { id: "plugin-founder-sync", name: "Founder Sync", category: "tool", enabled: true, permission: "execute", description: "把关键商业线索同步给 Founder Office。" },
  { id: "plugin-task-engine", name: "Task Engine", category: "tool", enabled: true, permission: "execute", description: "驱动任务状态机和进度流转。" },
  { id: "plugin-log-stream", name: "Log Stream", category: "tool", enabled: true, permission: "read", description: "展示系统级 log 和状态流。" },
];
```

## 8. Collaboration Edges 样例

```ts
export const collaborationEdges = [
  {
    id: "edge-intel-to-investment",
    fromAgentId: "intel-synth",
    toAgentId: "pm-investor",
    projectId: "flagship-payroll",
    artifactType: "signal_brief",
    artifactId: "artifact-signal-cluster",
    handoffType: "handoff",
    summary: "情报部提交打工人工具信号簇，等待产品投资部评分。",
    status: "received",
    updatedAt: "2026-03-24T09:22:00+08:00",
  },
  {
    id: "edge-investment-to-founder",
    fromAgentId: "pm-investor",
    toAgentId: "founder-em01",
    projectId: "flagship-payroll",
    artifactType: "opportunity_brief",
    artifactId: "artifact-opportunity-brief",
    handoffType: "review",
    summary: "产品投资部提交 Opportunity Brief，请 Founder 决定是否进入 App Cell。",
    status: "received",
    updatedAt: "2026-03-24T09:40:00+08:00",
  },
  {
    id: "edge-founder-to-design",
    fromAgentId: "founder-em01",
    toAgentId: "design-director",
    projectId: "flagship-payroll",
    artifactType: "design_spec",
    handoffType: "escalation",
    summary: "Founder 批准项目进入设计阶段，并强调 iOS-first 质感。",
    status: "sending",
    updatedAt: "2026-03-24T09:44:00+08:00",
  },
  {
    id: "edge-design-to-engineering",
    fromAgentId: "design-director",
    toAgentId: "eng-builder",
    projectId: "flagship-payroll",
    artifactType: "design_spec",
    artifactId: "artifact-design-core-screens",
    handoffType: "handoff",
    summary: "设计部同步核心页面结构与视觉方向给工程部。",
    status: "received",
    updatedAt: "2026-03-24T10:15:00+08:00",
  },
  {
    id: "edge-engineering-to-qa",
    fromAgentId: "eng-bald",
    toAgentId: "qa-inspector",
    projectId: "flagship-payroll",
    artifactType: "code_summary",
    artifactId: "artifact-code-shell",
    handoffType: "review",
    summary: "工程部提交页面骨架摘要，等待 QA 检查主链路和抽屉联动。",
    status: "blocked",
    updatedAt: "2026-03-24T10:26:00+08:00",
  },
  {
    id: "edge-release-to-founder",
    fromAgentId: "release-publisher",
    toAgentId: "founder-em01",
    projectId: "flagship-payroll",
    artifactType: "release_pack",
    artifactId: "artifact-release-pack",
    handoffType: "review",
    summary: "发行部提交首版 Release Pack，请 Founder 判断是否作为 Demo 主线。",
    status: "received",
    updatedAt: "2026-03-24T10:31:00+08:00",
  },
  {
    id: "edge-partner-to-founder",
    fromAgentId: "partner-scout",
    toAgentId: "founder-em01",
    projectId: "flagship-payroll",
    artifactType: "partner_memo",
    artifactId: "artifact-partner-memo",
    handoffType: "sync",
    summary: "外交部同步高价值渠道和媒体候选方，供 Founder 调整优先级。",
    status: "received",
    updatedAt: "2026-03-24T10:27:00+08:00",
  },
];
```

## 9. Company Metrics 样例

```ts
export const companyMetrics = [
  { id: "metric-opportunities", label: "今日机会数", value: "12", trend: "up" },
  { id: "metric-approved", label: "本周立项数", value: "3", trend: "up" },
  { id: "metric-active-cells", label: "在制 App Cells", value: "1", trend: "flat" },
  { id: "metric-release", label: "Release Pack 完成率", value: "64%", trend: "up" },
  { id: "metric-streak", label: "Ship Streak", value: "5 天", trend: "up" },
  { id: "metric-roi", label: "预估 ROI", value: "8.6/10", trend: "up" },
  { id: "metric-partners", label: "Partner Pipeline", value: "4", trend: "up" },
];
```

## 10. Partner Candidates 样例

```ts
export const partners = [
  {
    id: "partner-xhs-kol",
    name: "打工人效率类小红书博主",
    type: "media",
    status: "candidate",
    valueSummary: "适合做首发种草和用户反馈收集。",
    ownerAgentId: "partner-scout",
    linkedTaskIds: ["task-partner-scout-pipeline"],
    nextAction: "整理合作触达话术并提交 Founder 决策。",
  },
  {
    id: "partner-indie-community",
    name: "独立开发者社区",
    type: "channel",
    status: "contacted",
    valueSummary: "适合做 Demo 曝光和早期用户转化。",
    ownerAgentId: "bd-operator",
    linkedTaskIds: ["task-partner-follow-up"],
    nextAction: "确认可投稿栏目与发布时间。",
  },
  {
    id: "partner-app-media",
    name: "应用测评媒体",
    type: "distribution",
    status: "active",
    valueSummary: "可辅助形成产品外部背书。",
    ownerAgentId: "bd-operator",
    linkedTaskIds: ["task-partner-follow-up"],
    nextAction: "输出产品亮点与首发资料包。",
  },
];
```

## 11. Decision Memos 样例

```ts
export const memos = [
  {
    id: "memo-founder-priority-shift",
    title: "Founder 决策：旗舰项目转入 Release 主线",
    content: "优先保证 HQ、Founder、工程部、发行部和 Agent Profile 的主链路可演示，其他办公室按摘要版推进。",
    sourceOfficeId: "founder",
    targetOfficeIds: ["engineering", "release", "design", "qa", "growth"],
    createdAt: "2026-03-24T10:33:00+08:00",
  },
];
```

## 12. Team Member Context / Workspace Context 样例

```ts
export const teamMemberContexts = [
  {
    id: "ctx-peng",
    memberName: "彭智炜",
    role: "Product Narrative Lead",
    strengths: ["产品化", "创业叙事", "媒体传播"],
    preferredTracks: ["Agent Applications", "Ecosystem × Agent Economy"],
    preferredTools: ["GPT-5.4", "MiniMax", "社媒渠道"],
    targetTypes: ["iOS-first 微应用", "高传播效率工具"],
    activeOfficeIds: ["team", "growth", "founder"],
    currentFocus: ["项目 narrative", "路演主叙事", "Founder 对外表达"],
    capacityStatus: "focused",
    socialProof: ["WAIC 展商", "AdventureX 第一名", "媒体多次报道"],
  },
  {
    id: "ctx-zhang",
    memberName: "张涛",
    role: "Agent Research Lead",
    strengths: ["评分体系", "研究归纳", "Agent 编排"],
    preferredTracks: ["Framework × Multi-Agent"],
    preferredTools: ["GitHub", "arXiv", "Agent workflows"],
    targetTypes: ["多智能体系统", "评分与编排框架"],
    activeOfficeIds: ["team", "intel", "investment"],
    currentFocus: ["机会评分", "team fit 权重", "Agent runtime 结构"],
    capacityStatus: "focused",
    socialProof: ["飞桨最具影响力开发者", "GitHub 1.4k star", "B 站 8026 粉丝"],
  },
  {
    id: "ctx-randy",
    memberName: "Randy Xian",
    role: "iOS Product Builder",
    strengths: ["SwiftUI", "App Store 落地", "产品审美"],
    preferredTracks: ["Agent Applications"],
    preferredTools: ["SwiftUI", "Claude Code", "Cursor"],
    targetTypes: ["iOS-first 微应用", "高审美产品"],
    activeOfficeIds: ["team", "design", "release"],
    currentFocus: ["核心页面体验", "Release Pack 审美", "App Store 落地细节"],
    capacityStatus: "focused",
    socialProof: ["WWDC25", "App Store 付费榜前五", "主流媒体报道"],
  },
  {
    id: "ctx-shi",
    memberName: "石千山",
    role: "Platform Engineer",
    strengths: ["平台工程", "协作系统", "前端性能"],
    preferredTracks: ["Framework × Multi-Agent"],
    preferredTools: ["协作平台", "状态系统", "前端工程"],
    targetTypes: ["协作系统", "前端 runtime", "状态引擎"],
    activeOfficeIds: ["team", "engineering", "partner"],
    currentFocus: ["A2A 状态层", "Observability", "前端性能与结构"],
    capacityStatus: "focused",
    socialProof: ["VTable 开发", "网易诺亚", "腾讯犀牛鸟"],
  },
];

export const workspaceContext = {
  id: "workspace-opc-core",
  workspaceName: "OPC Hackathon HQ",
  northStar: "从真实信号中选出最值得做的 iOS-first 微应用，并形成可演示的上架闭环。",
  targetProductShapes: ["iOS-first 微应用", "可传播效率工具", "可视化 agent 公司系统"],
  currentGoals: ["打磨 HQ 主讲路径", "跑通情报到 Release 主线", "突出 Team Office 差异化"],
  strategicConstraints: ["黑客松周期短", "前端先用结构化 mock 数据", "优先保证主链路可演示"],
  activeProjectIds: ["flagship-payroll"],
  officeOwnership: [
    { officeId: "founder", ownerAgentIds: ["founder-em01"], summary: "全局拍板与优先级管理" },
    { officeId: "intel", ownerAgentIds: ["team-zhang", "intel-scout"], summary: "信号挖掘与机会归纳" },
    { officeId: "design", ownerAgentIds: ["team-randy", "design-director"], summary: "iOS 体验与视觉把控" },
    { officeId: "engineering", ownerAgentIds: ["team-shi", "eng-bald"], summary: "前端结构和协作 runtime" },
    { officeId: "growth", ownerAgentIds: ["team-peng", "growth-operator"], summary: "叙事包装与传播路径" },
  ],
};
```

## 补充：业务层 JSON 与系统日志样例

```ts
export const businessJsonSnapshots = [
  {
    id: "biz-intel-cluster",
    moduleId: "intel",
    moduleType: "office",
    projectId: "flagship-payroll",
    input: {
      signalIds: ["signal-xhs-payroll-1", "signal-github-timesheet-1", "signal-x-weekly-report-1"],
    },
    intermediate: {
      clusterIds: ["cluster-worker-efficiency"],
    },
    output: {
      topOpportunityId: "opp-payroll-helper",
      topScore: 8.9,
    },
    error: null,
    updatedAt: "2026-03-24T09:23:00+08:00",
  },
  {
    id: "biz-engineering-shell",
    moduleId: "engineering",
    moduleType: "office",
    projectId: "flagship-payroll",
    input: {
      layout: "hq + offices + drawers",
      activeAgents: ["eng-bald", "eng-builder"],
    },
    intermediate: {
      unresolved: ["A2A overlay z-index", "drawer route sync"],
    },
    output: {
      shellReady: true,
      pagesReady: ["/", "/office/founder", "/office/engineering"],
    },
    error: null,
    updatedAt: "2026-03-24T10:27:00+08:00",
  },
  {
    id: "biz-release-pack",
    moduleId: "release",
    moduleType: "office",
    projectId: "flagship-payroll",
    input: {
      appName: "工时 / 工资 / 周报助手",
      screenCount: 5,
    },
    intermediate: {
      missing: ["keywords 优化", "第 4 张截图文案"],
    },
    output: {
      completion: 0.64,
      reviewRisk: "medium",
    },
    error: null,
    updatedAt: "2026-03-24T10:31:00+08:00",
  },
];

export const systemLogs = [
  {
    id: "log-eng-1",
    moduleId: "engineering",
    level: "info",
    event: "module_started",
    message: "工程部页面骨架开始渲染",
    durationMs: 122,
    timestamp: "2026-03-24T10:00:03+08:00",
  },
  {
    id: "log-eng-2",
    moduleId: "engineering",
    level: "warn",
    event: "overlay_conflict",
    message: "A2A 飞线层与右侧抽屉存在遮挡冲突，已进入降级模式",
    durationMs: 18,
    degraded: true,
    timestamp: "2026-03-24T10:12:10+08:00",
  },
  {
    id: "log-release-1",
    moduleId: "release",
    level: "info",
    event: "release_pack_generated",
    message: "Release Pack 首版已生成",
    durationMs: 356,
    timestamp: "2026-03-24T10:31:06+08:00",
  },
  {
    id: "log-founder-1",
    moduleId: "founder",
    level: "info",
    event: "decision_queue_updated",
    message: "Founder 决策队列已收到 release 与 partner 最新摘要",
    durationMs: 45,
    timestamp: "2026-03-24T10:32:18+08:00",
  },
];
```

## Mock 数据联动规则

为了让页面看起来像一个真正运转中的系统，建议遵循这些联动规则：

- `Project.primaryStage` 负责表达当前主叙事阶段，`activeStageIds` 负责表达并行推进状态
- `Project.spotlightOfficeId` 应该能映射到 HQ 当前强调的办公室，不等于全部活跃办公室
- `Office.status` 取该办公室主任务状态的聚合结果
- `AgentProfile.currentTaskId` 必须能在 `tasks.ts` 中查到
- `AgentProfile.outputArtifactIds` 只能引用真实 artifact id
- `AgentProfile.decisionMemoIds` 只能引用真实 memo id
- `Artifact.projectId` 必须能映射回旗舰项目
- 如果 `CollaborationEdge.artifactId` 存在，则 `artifactType` 必须和对应产物类型一致
- Founder Office 展示的 metrics、memos、decision queue 必须能从现有 mock 数据推导出来
- Team Office 的 `teamMemberContexts` 和 `workspaceContext` 都要参与 Opportunity Score 中的 `team fit`
- `BusinessJsonSnapshot` 与 `SystemLogEntry` 必须能映射到真实模块

## V1 最小样例集

如果前端先做最小可运行闭环，建议先只准备以下数据：

- 10 个办公室
- 15 个 agents
- 1 个项目
- 16 个任务
- 10 个产物
- 7 条协作飞线
- 7 个 company metrics
- 3 个 partner candidates
- 1 个 founder memo
- 4 个 team member contexts
- 1 个 workspace context
- 3 个 business json snapshots
- 4 条 system logs

这组数据已经足够支撑：

- HQ Overview
- Founder Office
- Team Office
- 情报部
- 产品投资部
- 工程部
- 发行部
- Agent Profile
- A2A Overlay

## 验收标准

- 用这份 mock 数据能完整填满 P0 页面
- 用户能从 HQ 一路点进办公室、Agent、项目和产物详情
- Founder Office 能从真实 mock 数据里读出 metrics、decision queue 和 memo
- Team Office 不只是展示人物，还能支撑 `team fit` 叙事
- A2A 飞线能映射到真实的 `CollaborationEdge`
- 关键办公室能从 mock 数据里读出业务层 JSON 和系统日志
- mock 数据字段命名稳定，后续接 runtime 时不需要大改页面层
