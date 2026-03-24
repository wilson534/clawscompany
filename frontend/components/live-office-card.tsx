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
      className="group relative block overflow-hidden border-2 border-white bg-black opc-room-card"
      style={{ height }}
    >
      <iframe
        src={`http://127.0.0.1:${config.port}`}
        title={config.officeTitle}
        className="pointer-events-none absolute left-0 top-0 border-0"
        style={
          {
            width: `${zoom * 100}%`,
            height: `${zoom * 100}%`,
            background: "#000",
            left: `${((zoom - 1) / -2) * 100}%`,
            top: `${((zoom - 1) / -2) * 100}%`,
          } as CSSProperties
        }
      />

      <div className="pointer-events-none absolute left-0 top-0 w-full border-b-2 border-white bg-black/80 px-4 py-2 flex items-center gap-3">
        <div className="text-sm font-bold tracking-[0.18em] text-white uppercase font-mono">
          {config.floorLabel}
        </div>
        <div className="text-sm font-bold text-white uppercase font-mono">
          / {config.floorTitle}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full border-t-2 border-white bg-black/80 p-3 flex items-end justify-between gap-3">
        <div className="text-sm text-white font-mono uppercase">
          &gt; {config.officeTitle}
        </div>
        <div className="text-sm font-bold text-[var(--opc-signal)] uppercase border-2 border-[var(--opc-signal)] px-2 py-1">
          {cta}
        </div>
      </div>
    </Link>
  );
}
