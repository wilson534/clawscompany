import type { ReactNode } from "react";
import { ScrambleText } from "./scramble-text";
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

export function SignalStrip({ items, disableScramble = false }: { items: HudItem[]; disableScramble?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item, index) => (
        <div
          key={`${item.label}-${item.value}`}
          className="group relative isolate inline-flex items-center gap-2 border-2 border-white bg-black px-3 py-2 text-xs font-mono uppercase transition-all duration-150 hover:-translate-y-[2px] hover:-translate-x-[2px] hover:border-[var(--opc-signal)] hover:shadow-[4px_4px_0_var(--opc-signal)] cursor-default"
        >
          <div className="absolute inset-y-0 left-0 -z-10 w-0 bg-white transition-all duration-200 ease-out group-hover:w-full" />
          <span className="text-[var(--opc-signal)] transition-all group-hover:text-black group-hover:font-black">{item.icon}</span>
          <span className="font-bold text-white/80 transition-all group-hover:text-black group-hover:font-black">
            <ScrambleText text={item.label} revealDuration={600} delay={index * 150} disabled={disableScramble} />
          </span>
          <span className="font-black text-[var(--opc-signal)] transition-all group-hover:text-black">
            <ScrambleText text={item.value} revealDuration={800} delay={200 + index * 150} disabled={disableScramble} />
          </span>
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
