import type {
  OpportunityBrief,
  OpportunityCandidate,
  Signal,
  TrendCluster,
} from "@/lib/opc-types";

export const signals: Signal[] = [
  {
    id: "signal-xhs-payroll-1",
    source: "xiaohongshu",
    title: "打工人工资怎么算才能更直观？",
    snippet: "很多人想快速看到时薪、日薪、月薪换算，以及加班收益到底值不值。",
    tags: ["打工人", "工资计算", "效率工具"],
    heat: 89,
    painPoint: "工资和工时关系难以快速可视化。",
    createdAt: "2026-03-24T08:58:00+08:00",
  },
  {
    id: "signal-github-timesheet-1",
    source: "github",
    title: "轻量工时工具需求持续出现",
    snippet: "独立开发者和小团队仍在寻找更轻、更好看、更个人化的 timesheet 工具。",
    tags: ["timesheet", "productivity", "indie"],
    heat: 74,
    painPoint: "现有工具偏重，缺少更适合个人的体验。",
    createdAt: "2026-03-24T09:02:00+08:00",
  },
  {
    id: "signal-x-weekly-report-1",
    source: "x",
    title: "周报自动生成仍然是高频抱怨点",
    snippet: "写周报、补周报、整理工作记录仍然让很多人崩溃。",
    tags: ["weekly report", "workflow", "pain point"],
    heat: 82,
    painPoint: "工作记录和周报生成是高度重复劳动。",
    createdAt: "2026-03-24T09:06:00+08:00",
  },
];

export const trendClusters: TrendCluster[] = [
  {
    id: "cluster-worker-efficiency",
    name: "打工人效率工具",
    summary: "围绕工时、工资、周报和情绪反馈的轻量效率工具需求簇。",
    signalIds: ["signal-xhs-payroll-1", "signal-github-timesheet-1", "signal-x-weekly-report-1"],
    confidence: 0.93,
  },
];

export const opportunityCandidates: OpportunityCandidate[] = [
  {
    id: "opp-payroll-helper",
    clusterId: "cluster-worker-efficiency",
    title: "工时 / 工资 / 周报助手",
    targetUser: "有工时记录和周报整理需求的打工人",
    reasonNow: "社媒痛点明显，iOS-first 微应用形态清晰，适合快速落地和传播。",
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

export const opportunityBriefs: OpportunityBrief[] = [
  {
    id: "brief-payroll-helper",
    candidateId: "opp-payroll-helper",
    projectName: "工时 / 工资 / 周报助手",
    targetUser: "希望快速记录工时并自动生成周报的打工人",
    coreProblem: "工时、工资和周报分散在多个工具里，体验碎片化。",
    coreFeatures: ["工时记录", "工资可视化", "周报生成"],
    differentiation: "更轻、更好看、更适合 iOS-first 的个人使用场景。",
    monetization: "会员订阅或一次性买断。",
    riskNotes: ["需要避免与通用打卡应用过度同质化", "周报文案生成要控制模板感"],
  },
];
