import type { OfficeId } from "@/lib/opc-types";

type OfficeDisplayCopy = {
  name: string;
  floorTitle: string;
  hint: string;
};

type AgentDisplayCopy = {
  shortLabel: string;
  displayName: string;
  title: string;
  tagline: string;
  strengths: string[];
};

export const officeDisplayCopy: Record<OfficeId, OfficeDisplayCopy> = {
  founder: {
    name: "Founder 办公室",
    floorTitle: "10F / Founder",
    hint: "点击房间里的 agent，可以查看当前决策、任务和能力。",
  },
  team: {
    name: "Team Office",
    floorTitle: "9F / Team",
    hint: "这里是团队上下文注入层，四位成员的长板和分工会回灌给整家公司。",
  },
  partner: {
    name: "外交部",
    floorTitle: "8F / Partner",
    hint: "这里负责媒体、渠道和合作线索的筛选与推进。",
  },
  intel: {
    name: "情报部",
    floorTitle: "7F / Intel",
    hint: "这里负责从 GitHub、X、小红书和论文里抓机会信号。",
  },
  investment: {
    name: "产品投资部",
    floorTitle: "6F / Investment",
    hint: "这里负责机会评分、立项判断和优先级拍板前的委员会评估。",
  },
  design: {
    name: "设计部",
    floorTitle: "5F / Design",
    hint: "这里负责把产品叙事落成界面语言、像素场景和 iOS 视觉气质。",
  },
  engineering: {
    name: "工程部",
    floorTitle: "4F / Engineering",
    hint: "这里负责把 HQ、A2A 协作层和主流程真正做出来。",
  },
  qa: {
    name: "QA 部",
    floorTitle: "3F / QA",
    hint: "这里负责集成验证、质量闸门和风险拦截。",
  },
  release: {
    name: "发行部",
    floorTitle: "2F / Release",
    hint: "这里负责截图、文案、元数据和上架准备。",
  },
  growth: {
    name: "增长部",
    floorTitle: "1F / Growth",
    hint: "这里负责首发传播、内容包装和增长实验。",
  },
};

export const agentDisplayCopy: Record<string, AgentDisplayCopy> = {
  "founder-em01": {
    shortLabel: "EM",
    displayName: "EM-01",
    title: "Founder Agent",
    tagline: "负责全局拍板、优先级调整和关键风险汇总。",
    strengths: ["战略拍板", "经营视角", "Founder 叙事"],
  },
  "team-peng": {
    shortLabel: "彭",
    displayName: "彭智炜",
    title: "Product Narrative Lead",
    tagline: "负责把项目讲成评委一眼能懂的一人公司故事。",
    strengths: ["产品叙事", "传播包装", "路演表达"],
  },
  "team-zhang": {
    shortLabel: "张",
    displayName: "张涛",
    title: "Agent Research Lead",
    tagline: "负责机会评分、研究归纳和多智能体编排设计。",
    strengths: ["机会评分", "研究归纳", "Agent 编排"],
  },
  "team-randy": {
    shortLabel: "Ra",
    displayName: "Randy Xian",
    title: "iOS Product Builder",
    tagline: "负责把概念快速推进到接近可上架的 iOS 体验。",
    strengths: ["SwiftUI", "App Store 经验", "产品审美"],
  },
  "team-shi": {
    shortLabel: "石",
    displayName: "石千山",
    title: "Platform Engineer",
    tagline: "负责状态层、协作层和可观测性真正焊到前端里。",
    strengths: ["平台工程", "协作系统", "可观测性"],
  },
  "partner-scout": {
    shortLabel: "Pa",
    displayName: "Partner Scout",
    title: "Partner Pipeline Lead",
    tagline: "负责找到最能放大项目势能的渠道、媒体和合作入口。",
    strengths: ["合作研究", "渠道匹配", "Partner Mapping"],
  },
  "bd-operator": {
    shortLabel: "BD",
    displayName: "BD Operator",
    title: "Partner Operations",
    tagline: "负责把候选合作从看板推进到真正的下一步动作。",
    strengths: ["BD 推进", "Pipeline 管理", "同步汇报"],
  },
  "intel-scout": {
    shortLabel: "Tr",
    displayName: "Trend Scout",
    title: "Signal Hunter",
    tagline: "负责从平台噪音里找到适合做成 App 的真实痛点。",
    strengths: ["信号挖掘", "社媒洞察", "来源筛选"],
  },
  "intel-synth": {
    shortLabel: "In",
    displayName: "Insight Synthesizer",
    title: "Trend Clustering Lead",
    tagline: "负责把热点压成趋势簇，再变成立项摘要。",
    strengths: ["趋势聚类", "结构化总结", "机会摘要"],
  },
  "pm-investor": {
    shortLabel: "PM",
    displayName: "PM / Investment Lead",
    title: "Opportunity Committee Lead",
    tagline: "负责评分、立项和 ROI 判断，不是每个热点都值得做。",
    strengths: ["立项评估", "ROI 判断", "委员会审查"],
  },
  "design-director": {
    shortLabel: "De",
    displayName: "Design Director",
    title: "UI / UX Lead",
    tagline: "负责把一人公司 OS 做得像真的在运转，而不是一张 PPT。",
    strengths: ["界面设计", "体验设计", "视觉系统"],
  },
  "eng-bald": {
    shortLabel: "Ba",
    displayName: "Bald Engineer",
    title: "Shell Architect",
    tagline: "负责总部骨架、布局系统和页面外壳稳定落地。",
    strengths: ["Next.js 架构", "页面骨架", "状态串联"],
  },
  "eng-builder": {
    shortLabel: "Ap",
    displayName: "App Builder",
    title: "Feature Flow Engineer",
    tagline: "负责把工时、工资和周报三条主流程真正串起来。",
    strengths: ["流程实现", "状态逻辑", "功能联调"],
  },
  "qa-inspector": {
    shortLabel: "QA",
    displayName: "Review Inspector",
    title: "Risk Gatekeeper",
    tagline: "负责在发布前发现会让 demo 掉链子的风险。",
    strengths: ["质量验证", "风险识别", "集成验收"],
  },
  "release-publisher": {
    shortLabel: "Pub",
    displayName: "App Store Publisher",
    title: "Release Pack Lead",
    tagline: "负责把产品做成今天就能上架的样子。",
    strengths: ["App Store 发布", "商店文案", "审核风险"],
  },
  "growth-operator": {
    shortLabel: "Gr",
    displayName: "Growth Operator",
    title: "Launch Narrative Lead",
    tagline: "负责首发传播、内容节奏和增长实验。",
    strengths: ["首发传播", "增长假设", "内容包装"],
  },
};

export const taskTitleCopy: Record<string, string> = {
  "task-founder-approve-release": "确认当前版本是否作为 Demo 主链推进",
  "task-team-peng-narrative": "整理项目 narrative 和路演主叙事",
  "task-team-zhang-scoring": "校准机会评分里的 team fit 权重",
  "task-team-randy-ui-build": "统一核心页面视觉方向和 iOS 体验细节",
  "task-team-shi-a2a-engine": "定义 A2A 协作层与任务状态引擎",
  "task-partner-scout-pipeline": "梳理首批媒体与渠道 partner pipeline",
  "task-partner-follow-up": "推进候选合作进入下一步动作",
  "task-intel-scout-scan": "扫描打工人工具类高频痛点信号",
  "task-intel-synth-brief": "聚类信号并输出立项摘要",
  "task-investment-approve": "评估工时 / 工资 / 周报助手的立项价值",
  "task-design-core-screens": "输出首页、记录页、工资页和周报页设计稿",
  "task-eng-layout-shell": "搭建 HQ 与办公室页面骨架",
  "task-eng-feature-flow": "实现工时记录与工资预览主流程",
  "task-qa-review-gate": "检查发布前必须修复的问题",
  "task-release-pack": "生成 Release Pack 首版",
  "task-growth-launch-plan": "制定首周传播计划与话题方向",
};

export const artifactTitleCopy: Record<string, string> = {
  "artifact-signal-cluster": "趋势簇与信号摘要",
  "artifact-opportunity-brief": "立项机会 Brief",
  "artifact-design-core-screens": "核心页面设计稿",
  "artifact-code-shell": "HQ / Office 页面骨架",
  "artifact-code-feature-flow": "工时 / 工资主流程实现",
  "artifact-qa-report": "QA 风险报告",
  "artifact-release-pack": "App Store Release Pack",
  "artifact-growth-launch-plan": "首发传播计划",
  "artifact-partner-memo": "Partner Pipeline Memo",
  "artifact-a2a-state-spec": "A2A 状态层规范",
};

const tokenDisplayCopy: Record<string, string> = {
  ceo: "CEO",
  ios: "iOS",
  qa: "QA",
  bd: "BD",
  roi: "ROI",
  a2a: "A2A",
  xhs: "小红书",
  github: "GitHub",
  nextjs: "Next.js",
  swiftui: "SwiftUI",
  ux: "UX",
  ui: "UI",
  app: "App",
  store: "Store",
  sync: "Sync",
  social: "Social",
  launch: "Launch",
  review: "Review",
  score: "Score",
  scoring: "Scoring",
  risk: "Risk",
  release: "Release",
  product: "Product",
  platform: "Platform",
  partner: "Partner",
  pipeline: "Pipeline",
  design: "Design",
  system: "System",
  state: "State",
  management: "Management",
  research: "Research",
  summarization: "Summarization",
  clustering: "Clustering",
  committee: "Committee",
  marketing: "Marketing",
  storytelling: "Storytelling",
  observability: "Observability",
  copywriting: "Copywriting",
  guideline: "Guideline",
  growth: "Growth",
  channel: "Channel",
  mapping: "Mapping",
  ops: "Ops",
  report: "Report",
  search: "Search",
  signal: "Signal",
  mining: "Mining",
  orchestration: "Orchestration",
  hypothesis: "Hypothesis",
  integration: "Integration",
  check: "Check",
  flow: "Flow",
  component: "Component",
  registry: "Registry",
  codegen: "Codegen",
  log: "Log",
  stream: "Stream",
  json: "JSON",
  brief: "Brief",
  board: "Board",
  memo: "Memo",
  metrics: "Metrics",
  founder: "Founder",
  terminal: "Terminal",
  moodboard: "Moodboard",
  screen: "Screen",
  gallery: "Gallery",
  docs: "Docs",
  radar: "Radar",
  preview: "Preview",
  screenshot: "Screenshot",
  storyboard: "Storyboard",
  engine: "Engine",
  ranking: "Ranking",
  opportunity: "Opportunity",
};

function titleCase(input: string) {
  return input
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function humanizeCapabilityId(raw: string) {
  const value = raw.replace(/^(skill|plugin)-/, "");
  const parts = value.split("-");

  return parts
    .map((part) => tokenDisplayCopy[part.toLowerCase()] ?? titleCase(part))
    .join(" ");
}
