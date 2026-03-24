/* eslint-disable @next/next/no-img-element */

import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LiveOfficeConfig } from "@/lib/live-offices";
import { ScrambleText } from "./scramble-text";

type PreviewAgent = {
  src: string;
  left: number;
  top: number;
  width: number;
  delay?: number;
};

type PreviewVariant = {
  accent: string;
  glow: string;
  tint: string;
  imagePosition: string;
  agents: PreviewAgent[];
};

type Metric = {
  icon: ReactNode;
  label: string;
};

const asset = (name: string) => `/star-office/assets/${name}`;

const variants: Record<string, PreviewVariant> = {
  "founder-command": {
    accent: "#f4a261",
    glow: "radial-gradient(circle at 74% 18%, rgba(244, 162, 97, 0.24), transparent 34%)",
    tint: "linear-gradient(180deg, rgba(45, 23, 9, 0.04), rgba(45, 23, 9, 0.18))",
    imagePosition: "38% 52%",
    agents: [{ src: asset("guest-4.png"), left: 18, top: 71, width: 8.2, delay: 0.1 }],
  },
  "team-story": {
    accent: "#7aa2ff",
    glow: "radial-gradient(circle at 24% 18%, rgba(122, 162, 255, 0.18), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(12, 22, 54, 0.05), rgba(12, 22, 54, 0.16))",
    imagePosition: "34% 56%",
    agents: [
      { src: asset("guest-4.png"), left: 14, top: 72, width: 7.4, delay: 0 },
      { src: asset("guest-2.png"), left: 38, top: 72, width: 7.4, delay: 0.35 },
    ],
  },
  "team-build": {
    accent: "#58a6ff",
    glow: "radial-gradient(circle at 72% 18%, rgba(88, 166, 255, 0.18), transparent 30%)",
    tint: "linear-gradient(180deg, rgba(7, 26, 56, 0.05), rgba(7, 26, 56, 0.18))",
    imagePosition: "58% 56%",
    agents: [
      { src: asset("guest-1.png"), left: 31, top: 72, width: 7.4, delay: 0.2 },
      { src: asset("guest-3.png"), left: 63, top: 70, width: 7.4, delay: 0.6 },
    ],
  },
  "partner-outreach": {
    accent: "#d0a56e",
    glow: "radial-gradient(circle at 82% 18%, rgba(208, 165, 110, 0.18), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(67, 42, 16, 0.04), rgba(67, 42, 16, 0.18))",
    imagePosition: "60% 54%",
    agents: [
      { src: asset("guest-5.png"), left: 30, top: 70, width: 7.6, delay: 0.1 },
      { src: asset("guest-6.png"), left: 78, top: 68, width: 7.4, delay: 0.45 },
    ],
  },
  "intel-scan": {
    accent: "#67d4a3",
    glow: "radial-gradient(circle at 18% 16%, rgba(103, 212, 163, 0.22), transparent 26%)",
    tint: "linear-gradient(180deg, rgba(7, 44, 33, 0.06), rgba(7, 44, 33, 0.2))",
    imagePosition: "34% 54%",
    agents: [{ src: asset("guest-2.png"), left: 22, top: 72, width: 7.4, delay: 0.15 }],
  },
  "intel-synth": {
    accent: "#39c8b0",
    glow: "radial-gradient(circle at 74% 16%, rgba(57, 200, 176, 0.22), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(10, 48, 43, 0.04), rgba(10, 48, 43, 0.18))",
    imagePosition: "56% 54%",
    agents: [
      { src: asset("guest-4.png"), left: 28, top: 71, width: 7.3, delay: 0.25 },
      { src: asset("guest-2.png"), left: 59, top: 70, width: 7.1, delay: 0.55 },
    ],
  },
  "investment-committee": {
    accent: "#f0be6f",
    glow: "radial-gradient(circle at 64% 16%, rgba(240, 190, 111, 0.2), transparent 30%)",
    tint: "linear-gradient(180deg, rgba(60, 43, 14, 0.04), rgba(60, 43, 14, 0.16))",
    imagePosition: "42% 52%",
    agents: [{ src: asset("guest-6.png"), left: 27, top: 71, width: 7.4, delay: 0.25 }],
  },
  "design-studio": {
    accent: "#ff8bb1",
    glow: "radial-gradient(circle at 18% 16%, rgba(255, 139, 177, 0.22), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(67, 16, 37, 0.05), rgba(67, 16, 37, 0.18))",
    imagePosition: "38% 56%",
    agents: [
      { src: asset("guest-1.png"), left: 23, top: 72, width: 7.4, delay: 0.1 },
      { src: asset("guest-4.png"), left: 52, top: 71, width: 7.4, delay: 0.5 },
    ],
  },
  "engineering-shell": {
    accent: "#72b0ff",
    glow: "radial-gradient(circle at 82% 16%, rgba(114, 176, 255, 0.2), transparent 30%)",
    tint: "linear-gradient(180deg, rgba(10, 24, 54, 0.05), rgba(10, 24, 54, 0.18))",
    imagePosition: "36% 56%",
    agents: [{ src: asset("guest-2.png"), left: 23, top: 72, width: 7.4, delay: 0.1 }],
  },
  "engineering-build": {
    accent: "#5cc5ff",
    glow: "radial-gradient(circle at 74% 16%, rgba(92, 197, 255, 0.2), transparent 30%)",
    tint: "linear-gradient(180deg, rgba(8, 30, 64, 0.05), rgba(8, 30, 64, 0.2))",
    imagePosition: "56% 56%",
    agents: [
      { src: asset("guest-5.png"), left: 33, top: 72, width: 7.4, delay: 0.2 },
      { src: asset("guest-3.png"), left: 60, top: 70, width: 7.4, delay: 0.6 },
    ],
  },
  "qa-gate": {
    accent: "#ff7575",
    glow: "radial-gradient(circle at 80% 18%, rgba(255, 117, 117, 0.22), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(61, 12, 12, 0.05), rgba(61, 12, 12, 0.2))",
    imagePosition: "58% 52%",
    agents: [{ src: asset("guest-6.png"), left: 36, top: 70, width: 7.4, delay: 0.15 }],
  },
  "release-shot": {
    accent: "#6dd692",
    glow: "radial-gradient(circle at 24% 16%, rgba(109, 214, 146, 0.2), transparent 26%)",
    tint: "linear-gradient(180deg, rgba(12, 51, 29, 0.04), rgba(12, 51, 29, 0.18))",
    imagePosition: "40% 54%",
    agents: [{ src: asset("guest-4.png"), left: 27, top: 72, width: 7.4, delay: 0.15 }],
  },
  "release-meta": {
    accent: "#7fe0c3",
    glow: "radial-gradient(circle at 72% 18%, rgba(127, 224, 195, 0.2), transparent 28%)",
    tint: "linear-gradient(180deg, rgba(10, 41, 32, 0.05), rgba(10, 41, 32, 0.18))",
    imagePosition: "56% 54%",
    agents: [{ src: asset("guest-3.png"), left: 28, top: 72, width: 7.4, delay: 0.2 }],
  },
  "growth-launch": {
    accent: "#f6bd4e",
    glow: "radial-gradient(circle at 74% 16%, rgba(246, 189, 78, 0.2), transparent 30%)",
    tint: "linear-gradient(180deg, rgba(61, 44, 10, 0.04), rgba(61, 44, 10, 0.18))",
    imagePosition: "38% 56%",
    agents: [{ src: asset("guest-1.png"), left: 24, top: 72, width: 7.4, delay: 0.2 }],
  },
};

function agentStyle(sprite: PreviewAgent): CSSProperties {
  return {
    left: `${sprite.left}%`,
    top: `${sprite.top}%`,
    width: `${sprite.width}%`,
    zIndex: 5,
  };
}

export function PixelOfficePreview({
  config,
  title,
  subtitle,
  ctaLabel,
  metrics = [],
  className = "",
  disableScramble = false,
}: {
  config: LiveOfficeConfig;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  metrics?: Metric[];
  className?: string;
  disableScramble?: boolean;
}) {
  const variant = variants[config.previewVariant];
  const previewSrc = `/star-office/previews/${config.officeId}.webp`;

  return (
    <div
      className={`relative overflow-hidden border-2 border-white bg-black opc-room-card ${className}`}
    >
      <div
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ background: `linear-gradient(180deg, ${variant.accent}, transparent 78%)` }}
      />

      <img
        src={previewSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{ imageRendering: "pixelated", objectPosition: variant.imagePosition }}
      />
      <div className="absolute inset-0" style={{ backgroundImage: variant.glow }} />
      <div className="absolute inset-0" style={{ backgroundImage: variant.tint }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,16,0.02),rgba(6,10,16,0.1)_52%,rgba(6,10,16,0.34))]" />

      {variant.agents.map((agent, index) => (
        <div
          key={`${config.officeId}-agent-${index}`}
          className="opc-preview-agent absolute"
          style={{
            ...agentStyle(agent),
            animationDelay: `${agent.delay ?? 0}s`,
          }}
        >
          <img
            src={agent.src}
            alt=""
            aria-hidden="true"
            className="opc-preview-sprite block h-auto w-full select-none"
          />
        </div>
      ))}

      <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="border-2 px-2 py-1 text-xs font-bold tracking-[0.12em] text-white font-mono uppercase bg-black"
            style={{
              borderColor: variant.accent,
            }}
          >
            <ScrambleText text={title} revealDuration={800} delay={100} disabled={disableScramble} />
          </div>
          {subtitle ? (
            <div className="border-2 border-white bg-black px-2 py-1 text-xs text-white font-mono uppercase">
              <ScrambleText text={subtitle} revealDuration={600} delay={300} disabled={disableScramble} />
            </div>
          ) : null}
        </div>

        {ctaLabel ? (
          <div className="inline-flex items-center gap-1 border-2 border-white bg-black px-2 py-1 text-xs font-bold text-white font-mono uppercase">
            <ScrambleText text={ctaLabel} revealDuration={500} delay={500} disabled={disableScramble} />
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        ) : null}
      </div>

      {metrics.length ? (
        <div className="absolute inset-x-4 bottom-16 flex flex-wrap gap-2">
          {metrics.map((item, i) => (
            <div
              key={`${config.officeId}-${item.label}`}
              className="inline-flex items-center gap-2 border-2 border-white bg-black px-2 py-1 text-xs text-white font-mono uppercase"
            >
              <span className="text-[var(--opc-signal)]">{item.icon}</span>
              <ScrambleText text={item.label} revealDuration={600} delay={600 + i * 150} disabled={disableScramble} />
            </div>
          ))}
        </div>
      ) : null}

      <div className="absolute bottom-4 left-4">
        <div className="border-2 border-white bg-black px-2 py-1 text-xs text-white font-mono uppercase text-[var(--opc-signal)]">
          <ScrambleText text={`SYS.NO.${config.officeId.toUpperCase()} / ${config.officeTitle}`} revealDuration={1200} delay={0} disabled={disableScramble} />
        </div>
      </div>
    </div>
  );
}
