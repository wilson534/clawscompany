import Link from "next/link";
import type { CSSProperties } from "react";
import type { LiveOfficeConfig } from "@/lib/live-offices";

export function LiveOfficeCard({
  config,
  href,
  cta,
  height = "48svh",
  zoom = 1,
}: {
  config: LiveOfficeConfig;
  href: string;
  cta: string;
  height?: string;
  zoom?: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[34px] border border-white/10 bg-[rgba(8,11,16,0.72)] shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
      style={{ height }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)]" />
      <iframe
        src={`http://127.0.0.1:${config.port}`}
        title={config.officeTitle}
        className="pointer-events-none absolute left-0 top-0 border-0"
        style={
          {
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            background: "#0f1621",
            left: `${((zoom - 1) / -2) * 100}%`,
            top: `${((zoom - 1) / -2) * 100}%`,
          } as CSSProperties
        }
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,11,0.04),rgba(4,7,11,0.22)_100%)]" />

      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3">
        <div className="rounded-full border border-white/10 bg-[rgba(6,10,16,0.56)] px-3 py-1.5 text-sm font-semibold tracking-[0.18em] text-white/92 backdrop-blur-sm">
          {config.floorLabel}
        </div>
        <div className="rounded-full border border-white/10 bg-[rgba(6,10,16,0.56)] px-3 py-1.5 text-sm font-semibold text-white/88 backdrop-blur-sm">
          {config.floorTitle}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="rounded-full border border-white/10 bg-[rgba(6,10,16,0.56)] px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm">
          {config.officeTitle}
        </div>
        <div className="rounded-full border border-[rgba(245,163,93,0.28)] bg-[rgba(6,10,16,0.56)] px-3 py-1.5 text-sm font-semibold text-[var(--opc-signal)] backdrop-blur-sm">
          {cta}
        </div>
      </div>
    </Link>
  );
}
