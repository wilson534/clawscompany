import type { ReactNode } from "react";
import {
  Activity,
  BellRing,
  Bot,
  BrainCircuit,
  Briefcase,
  ClipboardList,
  Crown,
  Gauge,
  GitBranch,
  Handshake,
  LayoutGrid,
  ListTodo,
  Megaphone,
  Palette,
  Radar,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";
import { SignalStrip, makeHudItem } from "@/components/ops-hud";

type OpsMetric = {
  icon: ReactNode;
  label: string;
  value: string;
};

type OfficeOpsConfig = {
  accent: string;
  eyebrow: string;
  title: string;
  description: string;
  metrics: OpsMetric[];
  currentMove: string;
};

const iconClass = "h-4 w-4";

const officeOpsConfig: Record<string, OfficeOpsConfig> = {
  founder: {
    accent: "#f4a261",
    eyebrow: "COMMAND DECK",
    title: "Founder 拍板台",
    description: "跨办公室摘要、关键风险和最终优先级都在这里汇总。",
    metrics: [
      { icon: <Crown className={iconClass} />, label: "优先级", value: "Release 主链" },
      { icon: <Gauge className={iconClass} />, label: "压力", value: "高" },
      { icon: <BellRing className={iconClass} />, label: "风险", value: "QA / Partner" },
    ],
    currentMove: "当前动作：确认 Release Pack 是否作为路演主链，并向 Team 回发收口意见。",
  },
  team: {
    accent: "#7aa2ff",
    eyebrow: "CONTEXT INJECT",
    title: "Narrative Room",
    description: "这里负责把团队能力、分工和比赛叙事注入整套系统。",
    metrics: [
      { icon: <Users className={iconClass} />, label: "成员", value: "2 人在场" },
      { icon: <Sparkles className={iconClass} />, label: "叙事", value: "路演主线" },
      { icon: <Workflow className={iconClass} />, label: "上下文", value: "已回灌" },
    ],
    currentMove: "当前动作：收口创始团队故事、比赛话术和 Team Office 的展示层内容。",
  },
  "team-builder": {
    accent: "#58a6ff",
    eyebrow: "BUILDER SYNC",
    title: "Builder Room",
    description: "这里负责把设计、工程和 A2A 协作真正焊到一起。",
    metrics: [
      { icon: <LayoutGrid className={iconClass} />, label: "壳层", value: "HQ / Floor / Office" },
      { icon: <Bot className={iconClass} />, label: "A2A", value: "已接线" },
      { icon: <Activity className={iconClass} />, label: "联调", value: "进行中" },
    ],
    currentMove: "当前动作：收口办公室页的交互层，让 live、drawer 和 HUD 真正串起来。",
  },
  partner: {
    accent: "#d0a56e",
    eyebrow: "PARTNER PIPELINE",
    title: "Outreach Room",
    description: "这里负责媒体、渠道和合作入口的映射与推进。",
    metrics: [
      { icon: <Handshake className={iconClass} />, label: "候选", value: "3 条渠道" },
      { icon: <BellRing className={iconClass} />, label: "跟进", value: "2 条待推" },
      { icon: <Workflow className={iconClass} />, label: "同步", value: "Founder 已收" },
    ],
    currentMove: "当前动作：把高价值媒体、渠道与合作伙伴的下一步动作同步给 Founder。",
  },
  intel: {
    accent: "#67d4a3",
    eyebrow: "SIGNAL SCAN",
    title: "Signal Scan",
    description: "这里负责持续扫描 GitHub、小红书、X 和论文里的高价值痛点。",
    metrics: [
      { icon: <Search className={iconClass} />, label: "来源", value: "GitHub / XHS" },
      { icon: <Radar className={iconClass} />, label: "热度", value: "工时场景" },
      { icon: <Sparkles className={iconClass} />, label: "机会", value: "可 App 化" },
    ],
    currentMove: "当前动作：继续扫描打工人工具高频信号，并把新热点压进趋势簇。",
  },
  "intel-synth": {
    accent: "#39c8b0",
    eyebrow: "SYNTH ROOM",
    title: "Trend Cluster",
    description: "这里负责把热点压成趋势簇，再变成立项摘要。",
    metrics: [
      { icon: <BrainCircuit className={iconClass} />, label: "聚类", value: "2 个趋势簇" },
      { icon: <Workflow className={iconClass} />, label: "Brief", value: "待立项" },
      { icon: <Gauge className={iconClass} />, label: "Team Fit", value: "高" },
    ],
    currentMove: "当前动作：把工时 / 工资 / 周报方向整理成可评审的 Opportunity Brief。",
  },
  investment: {
    accent: "#f0be6f",
    eyebrow: "COMMITTEE BOARD",
    title: "Committee Room",
    description: "这里负责 ROI、可做性和传播性的委员会评估。",
    metrics: [
      { icon: <Briefcase className={iconClass} />, label: "ROI", value: "8.6 / 10" },
      { icon: <Gauge className={iconClass} />, label: "Shipability", value: "高" },
      { icon: <Users className={iconClass} />, label: "评审", value: "Founder 待拍板" },
    ],
    currentMove: "当前动作：确认旗舰项目作为黑客松 demo 主链的投资价值和实现边界。",
  },
  design: {
    accent: "#ff8bb1",
    eyebrow: "VISUAL SYSTEM",
    title: "Atelier",
    description: "这里负责把一人公司 OS 做得有戏剧感、有场景感、也有产品质感。",
    metrics: [
      { icon: <Palette className={iconClass} />, label: "视觉", value: "iOS 微工具" },
      { icon: <Sparkles className={iconClass} />, label: "气质", value: "Pixel Startup" },
      { icon: <LayoutGrid className={iconClass} />, label: "屏幕", value: "4 张核心页" },
    ],
    currentMove: "当前动作：统一 Founder、Intel、Release 的房间气质和办公室标签语言。",
  },
  engineering: {
    accent: "#72b0ff",
    eyebrow: "SHELL QUEUE",
    title: "Shell Bay",
    description: "这里负责总部壳层、路由骨架和状态串联。",
    metrics: [
      { icon: <GitBranch className={iconClass} />, label: "壳层", value: "HQ / Office" },
      { icon: <Workflow className={iconClass} />, label: "状态", value: "A2A 串联" },
      { icon: <Gauge className={iconClass} />, label: "集成", value: "进行中" },
    ],
    currentMove: "当前动作：继续收口总部、楼层和办公室三级结构的真实联动。",
  },
  "engineering-build": {
    accent: "#5cc5ff",
    eyebrow: "BUILD BAY",
    title: "Feature Flow",
    description: "这里负责把工时、工资和周报三条主流程真正跑起来。",
    metrics: [
      { icon: <Bot className={iconClass} />, label: "流程", value: "工时 / 工资" },
      { icon: <Activity className={iconClass} />, label: "Live", value: "联调中" },
      { icon: <GitBranch className={iconClass} />, label: "构建", value: "Build Bay" },
    ],
    currentMove: "当前动作：收口旗舰项目主流程和 A2A 交接状态，让演示链路更稳。",
  },
  qa: {
    accent: "#ff7575",
    eyebrow: "GATE ALERT",
    title: "Gate Room",
    description: "这里负责集成验收、风险识别和发布前的质量门。",
    metrics: [
      { icon: <ShieldCheck className={iconClass} />, label: "门禁", value: "集成验收" },
      { icon: <BellRing className={iconClass} />, label: "风险", value: "2 条待修" },
      { icon: <ClipboardList className={iconClass} />, label: "结论", value: "可路演" },
    ],
    currentMove: "当前动作：确认 live、drawer、楼层跳转和主流程不再掉链子。",
  },
  release: {
    accent: "#6dd692",
    eyebrow: "SHIP STUDIO",
    title: "Screenshot Studio",
    description: "这里负责截图、卖点和上架素材的第一版出品。",
    metrics: [
      { icon: <Rocket className={iconClass} />, label: "截图", value: "4 张完成" },
      { icon: <Sparkles className={iconClass} />, label: "卖点", value: "3 条主文案" },
      { icon: <ListTodo className={iconClass} />, label: "审核", value: "待复核" },
    ],
    currentMove: "当前动作：把旗舰项目的截图、图标和卖点文案收口成可提审的样子。",
  },
  "release-meta": {
    accent: "#7fe0c3",
    eyebrow: "METADATA DESK",
    title: "Metadata Desk",
    description: "这里负责标题、副标题、关键词和审核风险收口。",
    metrics: [
      { icon: <ClipboardList className={iconClass} />, label: "关键词", value: "已收口" },
      { icon: <Rocket className={iconClass} />, label: "副标题", value: "待 A/B" },
      { icon: <BellRing className={iconClass} />, label: "审核", value: "1 条风险" },
    ],
    currentMove: "当前动作：把发布元数据整理成一套评委一看就懂的上架包。",
  },
  growth: {
    accent: "#f6bd4e",
    eyebrow: "LAUNCH CADENCE",
    title: "Launch Room",
    description: "这里负责首发传播、内容节奏和增长实验。",
    metrics: [
      { icon: <Megaphone className={iconClass} />, label: "首发", value: "内容排期" },
      { icon: <Users className={iconClass} />, label: "渠道", value: "小红书 / B 站" },
      { icon: <Activity className={iconClass} />, label: "反馈", value: "收集中" },
    ],
    currentMove: "当前动作：为比赛 demo 准备首发话题、传播节奏和增长回路。",
  },
};

export function getOfficePreviewMetrics(officeId: string) {
  const config = officeOpsConfig[officeId];

  if (!config) {
    return [];
  }

  return config.metrics.map((metric) => ({
    icon: metric.icon,
    label: `${metric.label} · ${metric.value}`,
  }));
}

export function DepartmentOpsPanel({ officeId }: { officeId: string }) {
  const config = officeOpsConfig[officeId];

  if (!config) {
    return null;
  }

  return (
    <aside
      className="pointer-events-auto absolute bottom-16 left-4 z-30 w-[min(390px,calc(100vw-2rem))] rounded-[28px] border bg-[rgba(7,11,17,0.78)] p-5 text-white shadow-[0_28px_90px_rgba(0,0,0,0.46)] backdrop-blur-xl"
      style={{
        borderColor: `${config.accent}55`,
        boxShadow: `0 0 0 1px ${config.accent}22 inset, 0 28px 90px rgba(0,0,0,0.46)`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em]" style={{ color: config.accent }}>
            {config.eyebrow}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">{config.title}</h2>
          <p className="mt-2 text-sm leading-7 text-white/74">{config.description}</p>
        </div>
        <div
          className="rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em]"
          style={{
            borderColor: `${config.accent}44`,
            background: `${config.accent}12`,
            color: config.accent,
          }}
        >
          LIVE
        </div>
      </div>

      <div className="mt-4">
        <SignalStrip
          items={config.metrics.map((metric) =>
            makeHudItem(metric.icon, metric.label, metric.value),
          )}
        />
      </div>

      <div
        className="mt-4 rounded-2xl border px-4 py-3"
        style={{
          borderColor: `${config.accent}33`,
          background: `linear-gradient(180deg, ${config.accent}0D, rgba(255,255,255,0.02))`,
        }}
      >
        <p className="text-[11px] font-semibold tracking-[0.18em] text-white/48">当前动作</p>
        <p className="mt-2 text-sm leading-7 text-white/86">{config.currentMove}</p>
      </div>
    </aside>
  );
}
