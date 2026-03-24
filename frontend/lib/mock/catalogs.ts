import type {
  CompanyMetric,
  DecisionMemo,
  PartnerCandidate,
  ProfileAdapter,
  SignalSourceAdapter,
  Skill,
  SkillCatalogAdapter,
  TeamMemberContext,
  ToolPlugin,
  VisualAdapter,
  WorkflowSemanticsAdapter,
  WorkspaceContext,
} from "@/lib/opc-types";

export const skills: Skill[] = [
  { id: "skill-strategy", name: "战略判断", level: "core", description: "围绕胜率与势能做方向拍板。" },
  { id: "skill-ceo-review", name: "CEO Review", level: "strong", description: "以 Founder 视角重构问题与结论。" },
  { id: "skill-product", name: "产品判断", level: "core", description: "识别什么功能值得做、为什么值得做。" },
  { id: "skill-storytelling", name: "产品叙事", level: "core", description: "把项目讲成外部一眼能懂的故事。" },
  { id: "skill-marketing", name: "传播包装", level: "strong", description: "把产品亮点与传播渠道绑在一起。" },
  { id: "skill-scoring", name: "机会评分", level: "core", description: "基于 ROI、传播性和 iOS fit 做判断。" },
  { id: "skill-agent-orchestration", name: "Agent 编排", level: "strong", description: "协调多个 agent 的流程与交付。" },
  { id: "skill-research", name: "研究归纳", level: "strong", description: "把研究输入整理成可执行结论。" },
  { id: "skill-signal-mining", name: "信号挖掘", level: "core", description: "从多平台读取高价值需求信号。" },
  { id: "skill-xhs-search", name: "小红书洞察", level: "support", description: "从中文社媒中提取需求与传播信号。" },
  { id: "skill-github-search", name: "GitHub 趋势洞察", level: "support", description: "从 GitHub 趋势与 issue 中发现机会。" },
  { id: "skill-clustering", name: "趋势聚类", level: "strong", description: "把分散信号归成可执行主题簇。" },
  { id: "skill-summarization", name: "结构化总结", level: "strong", description: "把输入压缩为可立项的机会摘要。" },
  { id: "skill-roi", name: "ROI 判断", level: "core", description: "综合收益、传播性和可落地性做判断。" },
  { id: "skill-committee-review", name: "委员会评审", level: "strong", description: "模拟立项会对候选机会做取舍。" },
  { id: "skill-ui", name: "界面设计", level: "core", description: "输出具备产品感的页面方向。" },
  { id: "skill-ux", name: "体验设计", level: "strong", description: "设计可解释、可流转的用户流程。" },
  { id: "skill-design-system", name: "视觉系统", level: "strong", description: "统一视觉语言、层级和组件规范。" },
  { id: "skill-swiftui", name: "SwiftUI 开发", level: "core", description: "实现 iOS-first 界面和核心流程。" },
  { id: "skill-react", name: "React 开发", level: "strong", description: "构建前端页面与交互层。" },
  { id: "skill-nextjs", name: "Next.js 架构", level: "strong", description: "组织路由、布局和页面结构。" },
  { id: "skill-state-management", name: "状态管理", level: "strong", description: "让跨页面和跨模块数据流稳定工作。" },
  { id: "skill-typescript", name: "TypeScript 建模", level: "strong", description: "通过类型约束保持前端数据一致。" },
  { id: "skill-app-flow", name: "产品流程实现", level: "strong", description: "把页面和业务流程真正串起来。" },
  { id: "skill-ios-design", name: "iOS 产品设计", level: "strong", description: "遵循 Apple HIG 的界面审美与交互。" },
  { id: "skill-qa", name: "质量验证", level: "strong", description: "检查关键流程是否真实联动。" },
  { id: "skill-risk", name: "风险识别", level: "strong", description: "提前发现发布与叙事风险。" },
  { id: "skill-integration-check", name: "集成验收", level: "strong", description: "以真实模块联动结果作为验收标准。" },
  { id: "skill-release", name: "App Store 发布", level: "core", description: "生成上架所需的素材和审核准备。" },
  { id: "skill-copywriting", name: "商店文案", level: "strong", description: "编写标题、副标题、描述和截图卖点。" },
  { id: "skill-review-guideline", name: "审核规则理解", level: "strong", description: "识别 Apple 审核相关风险。" },
  { id: "skill-social-launch", name: "社媒发布", level: "strong", description: "围绕渠道定制启动内容。" },
  { id: "skill-growth-hypothesis", name: "增长假设设计", level: "strong", description: "设计首周验证路径和指标。" },
  { id: "skill-platform", name: "平台工程", level: "core", description: "搭建底层状态、结构与协作层。" },
  { id: "skill-bd-research", name: "合作研究", level: "support", description: "寻找适合的合作方与外部资源。" },
  { id: "skill-channel-fit", name: "渠道匹配", level: "support", description: "判断产品与渠道的适配度。" },
  { id: "skill-partner-mapping", name: "合作图谱整理", level: "support", description: "把 candidate 和 partner 转成结构化 pipeline。" },
  { id: "skill-bd-ops", name: "BD 推进", level: "support", description: "推进 next action 与状态同步。" },
  { id: "skill-pipeline", name: "Pipeline 管理", level: "support", description: "维护合作链路的阶段状态。" },
  { id: "skill-sync-report", name: "同步汇报", level: "support", description: "把合作动态同步给 Founder 和相关办公室。" },
  { id: "skill-observability", name: "可观测性设计", level: "strong", description: "让模块状态与异常可追踪。" },
];

export const plugins: ToolPlugin[] = [
  { id: "plugin-metrics-board", name: "Metrics Board", category: "tool", enabled: true, permission: "read", description: "展示全公司的关键经营指标。" },
  { id: "plugin-decision-memo", name: "Decision Memo", category: "tool", enabled: true, permission: "execute", description: "生成并下发 Founder 决策 memo。" },
  { id: "plugin-founder-submit", name: "Founder Submit", category: "tool", enabled: true, permission: "execute", description: "把关键结果提交给 Founder Office。" },
  { id: "plugin-founder-sync", name: "Founder Sync", category: "tool", enabled: true, permission: "execute", description: "把关键信息同步给 Founder Office。" },
  { id: "plugin-notion-docs", name: "Notion Docs", category: "tool", enabled: true, permission: "read", description: "读取项目说明与内部文档。" },
  { id: "plugin-github-search", name: "GitHub Search", category: "data", enabled: true, permission: "read", description: "读取 GitHub 趋势和 issue 信号。" },
  { id: "plugin-xhs-search", name: "小红书 Search", category: "data", enabled: true, permission: "read", description: "读取小红书高频需求与讨论。" },
  { id: "plugin-x-search", name: "X Search", category: "data", enabled: true, permission: "read", description: "读取 X 上的趋势与讨论。" },
  { id: "plugin-brief-writer", name: "Brief Writer", category: "tool", enabled: true, permission: "execute", description: "把信号整理成结构化 brief。" },
  { id: "plugin-ranking-engine", name: "Ranking Engine", category: "tool", enabled: true, permission: "execute", description: "计算候选机会的排序结果。" },
  { id: "plugin-opportunity-score", name: "Opportunity Score", category: "tool", enabled: true, permission: "execute", description: "生成机会评分卡。" },
  { id: "plugin-screen-gallery", name: "Screen Gallery", category: "tool", enabled: true, permission: "execute", description: "展示设计稿和页面预览。" },
  { id: "plugin-moodboard", name: "Moodboard", category: "tool", enabled: true, permission: "execute", description: "组织视觉方向和设计关键词。" },
  { id: "plugin-terminal", name: "Terminal", category: "tool", enabled: true, permission: "execute", description: "执行工程命令与验证。" },
  { id: "plugin-component-registry", name: "Component Registry", category: "tool", enabled: true, permission: "read", description: "读取组件目录和骨架结构。" },
  { id: "plugin-ios-preview", name: "iOS Preview", category: "tool", enabled: true, permission: "execute", description: "展示设备预览和页面流。" },
  { id: "plugin-codegen", name: "Codegen", category: "model", enabled: true, permission: "execute", description: "生成前端或 SwiftUI 页面代码。" },
  { id: "plugin-risk-radar", name: "Risk Radar", category: "tool", enabled: true, permission: "execute", description: "聚合当前质量与审核风险。" },
  { id: "plugin-json-report", name: "JSON Report", category: "tool", enabled: true, permission: "read", description: "展示业务层 JSON 输出。" },
  { id: "plugin-app-store-pack", name: "App Store Pack", category: "tool", enabled: true, permission: "execute", description: "生成 metadata 和上架素材包。" },
  { id: "plugin-screenshot-storyboard", name: "Screenshot Storyboard", category: "tool", enabled: true, permission: "execute", description: "生成截图故事线和卖点说明。" },
  { id: "plugin-social-brief", name: "Social Brief", category: "tool", enabled: true, permission: "execute", description: "生成对外传播摘要和 narrative。" },
  { id: "plugin-launch-plan", name: "Launch Plan", category: "tool", enabled: true, permission: "execute", description: "生成首周发布节奏和动作计划。" },
  { id: "plugin-partner-board", name: "Partner Board", category: "tool", enabled: true, permission: "execute", description: "管理 partner pipeline。" },
  { id: "plugin-channel-map", name: "Channel Map", category: "tool", enabled: true, permission: "execute", description: "展示渠道与合作入口图谱。" },
  { id: "plugin-task-engine", name: "Task Engine", category: "tool", enabled: true, permission: "execute", description: "驱动任务状态机与进度流转。" },
  { id: "plugin-log-stream", name: "Log Stream", category: "tool", enabled: true, permission: "read", description: "展示系统级 log 和状态流。" },
];

export const companyMetrics: CompanyMetric[] = [
  { id: "metric-opportunities", label: "今日机会数", value: "12", trend: "up" },
  { id: "metric-approved", label: "本周立项数", value: "3", trend: "up" },
  { id: "metric-active-cells", label: "在制 App Cells", value: "1", trend: "flat" },
  { id: "metric-release", label: "Release Pack 完成率", value: "64%", trend: "up" },
  { id: "metric-streak", label: "Ship Streak", value: "5 天", trend: "up" },
  { id: "metric-roi", label: "预估 ROI", value: "8.6/10", trend: "up" },
  { id: "metric-partners", label: "Partner Pipeline", value: "4", trend: "up" },
];

export const partners: PartnerCandidate[] = [
  {
    id: "partner-xhs-kol",
    name: "打工人效率类小红书博主",
    type: "media",
    status: "candidate",
    valueSummary: "适合作为首发种草入口，也利于收集首批真实反馈。",
    ownerAgentId: "partner-scout",
    linkedTaskIds: ["task-partner-scout-pipeline"],
    nextAction: "整理触达话术并提交 Founder 决策。",
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

export const memos: DecisionMemo[] = [
  {
    id: "memo-founder-priority-shift",
    title: "Founder 决策：旗舰项目转入 Release 主链",
    content: "优先保证 HQ、Founder、工程部、发行部和 Agent Profile 的主链可演示，其余办公室按摘要版推进。",
    sourceOfficeId: "founder",
    targetOfficeIds: ["engineering", "release", "design", "qa", "growth"],
    createdAt: "2026-03-24T10:33:00+08:00",
  },
];

export const teamMemberContexts: TeamMemberContext[] = [
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
    socialProof: ["WAIC 展商", "AdventureX 第一名", "多家科技媒体报道"],
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
    currentFocus: ["A2A 状态层", "Observability", "前端结构与性能"],
    capacityStatus: "focused",
    socialProof: ["VTable 开发经历", "网易诺亚", "腾讯犀牛鸟"],
  },
];

export const workspaceContext: WorkspaceContext = {
  id: "workspace-opc-core",
  workspaceName: "OPC Hackathon HQ",
  northStar: "从真实信号中选出最值得做的 iOS-first 微应用，并形成可演示的上架闭环。",
  targetProductShapes: ["iOS-first 微应用", "可传播效率工具", "可视化 agent 公司系统"],
  currentGoals: ["打磨 HQ 主讲路径", "跑通情报到 Release 主链", "突出 Team Office 差异化"],
  strategicConstraints: ["黑客松周期短", "前端先用结构化 mock 数据", "优先保证主链路可演示"],
  activeProjectIds: ["flagship-payroll"],
  officeOwnership: [
    { officeId: "founder", ownerAgentIds: ["founder-em01"], summary: "全局拍板与优先级管理" },
    { officeId: "intel", ownerAgentIds: ["team-zhang", "intel-scout"], summary: "信号挖掘与机会归纳" },
    { officeId: "design", ownerAgentIds: ["team-randy", "design-director"], summary: "iOS 体验与视觉把控" },
    { officeId: "engineering", ownerAgentIds: ["team-shi", "eng-bald"], summary: "前端结构与协作 runtime" },
    { officeId: "growth", ownerAgentIds: ["team-peng", "growth-operator"], summary: "叙事包装与传播路径" },
  ],
};

export const visualAdapters: VisualAdapter[] = [
  {
    id: "adapter-star-office-shell",
    source: "star-office-ui",
    target: "hq",
    summary: "借用楼层、办公室舞台感和角色状态表达作为 HQ Scene Shell。",
  },
  {
    id: "adapter-mission-control-founder",
    source: "mission-control",
    target: "founder",
    summary: "借用 Founder cockpit 的指标卡和经营摘要组织方式。",
  },
];

export const skillCatalogAdapters: SkillCatalogAdapter[] = [
  {
    id: "adapter-minimax-skill-pack",
    source: "minimax-skills",
    summary: "把 skills 包映射进 Agent Profile 的 skills / tools / plugins。",
  },
];

export const signalSourceAdapters: SignalSourceAdapter[] = [
  {
    id: "adapter-agent-reach-intel",
    source: "agent-reach",
    mode: "prebuilt",
    summary: "多平台统一读取入口，用于赛前准备情报部信号包。",
  },
  {
    id: "adapter-media-crawler-offline",
    source: "media-crawler",
    mode: "prebuilt",
    summary: "仅用于赛前离线补强小红书等平台信号，不进入现场主链路。",
  },
];

export const workflowSemanticsAdapters: WorkflowSemanticsAdapter[] = [
  {
    id: "adapter-clawteam-handoff",
    source: "clawteam",
    summary: "把 leader + swarm + real-time coordination 翻译成 A2A handoff / review / escalation / sync。",
  },
  {
    id: "adapter-gstack-ship-loop",
    source: "gstack",
    summary: "把 think-plan-build-review-ship 节奏转成 Founder 和 Release 的工作流。",
  },
];

export const profileAdapters: ProfileAdapter[] = [
  {
    id: "adapter-agency-profile",
    source: "agency-agents",
    summary: "把 persona、deliverables、workflow 模板映射成 Agent Profile 结构。",
  },
];
