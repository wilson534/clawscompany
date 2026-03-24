import Link from "next/link";
import { PixelOfficePreview } from "@/components/pixel-office-preview";
import { getLiveOfficeByOfficeId, liveFloors } from "@/lib/live-offices";

export function HqBuildingOverview() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1a2533_0%,#101720_44%,#090e14_100%)] px-3 py-3 md:px-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="rounded-full border border-white/10 bg-[rgba(7,11,17,0.56)] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white/92 backdrop-blur-sm">
          OPC HQ
        </div>
        <div className="rounded-full border border-white/10 bg-[rgba(7,11,17,0.56)] px-4 py-2 text-xs text-white/74 backdrop-blur-sm md:text-sm">
          总览 → 楼层 → 办公室
        </div>
      </div>

      <section className="space-y-4">
        {liveFloors.map((floor) => {
          const preview = getLiveOfficeByOfficeId(floor.previewOfficeId);

          if (!preview) {
            return null;
          }

          return (
            <Link key={floor.floor} href={`/floor/${floor.floor}`} className="group block">
              <PixelOfficePreview
                config={preview}
                title={`${floor.floorLabel} / ${floor.floorTitle}`}
                subtitle={`${floor.officeIds.length} 个办公室`}
                ctaLabel="进入楼层"
                className="min-h-[36svh] transition-transform duration-150 group-hover:-translate-y-1 md:min-h-[42svh]"
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
