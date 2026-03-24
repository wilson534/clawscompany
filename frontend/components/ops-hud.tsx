import type { ReactNode } from "react";
import {
  Activity,
  Bot,
  Briefcase,
  Building2,
  Cpu,
  Crown,
  Handshake,
  Megaphone,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import type { OfficeId } from "@/lib/opc-types";

type HudItem = {
  icon: ReactNode;
  label: string;
  value: string;
};

export function SignalStrip({ items }: { items: HudItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(7,11,17,0.52)] px-3 py-2 text-xs text-white/82 backdrop-blur-sm"
        >
          <span className="text-[var(--opc-signal)]">{item.icon}</span>
          <span className="text-white/55">{item.label}</span>
          <span className="font-semibold text-white">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export function makeHudItem(icon: ReactNode, label: string, value: string): HudItem {
  return { icon, label, value };
}

export function departmentIcon(officeId: OfficeId, className = "h-4 w-4") {
  const icons: Record<OfficeId, ReactNode> = {
    founder: <Crown className={className} />,
    team: <Users className={className} />,
    partner: <Handshake className={className} />,
    intel: <Search className={className} />,
    investment: <Briefcase className={className} />,
    design: <Palette className={className} />,
    engineering: <Cpu className={className} />,
    qa: <ShieldCheck className={className} />,
    release: <Rocket className={className} />,
    growth: <Megaphone className={className} />,
  };

  return icons[officeId];
}

export const sharedHudIcons = {
  offices: () => <Building2 className="h-4 w-4" />,
  agents: () => <Bot className="h-4 w-4" />,
  live: () => <Activity className="h-4 w-4" />,
  flow: () => <Workflow className="h-4 w-4" />,
};
