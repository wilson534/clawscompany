import Link from "next/link";
import { getOfficePreviewMetrics } from "@/components/department-ops-panels";
import { PixelOfficePreview } from "@/components/pixel-office-preview";
import { SignalStrip, departmentIcon, makeHudItem, sharedHudIcons } from "@/components/ops-hud";
import { getLiveOfficeByOfficeId, liveFloors, liveOffices } from "@/lib/live-offices";

export function HqBuildingOverview() {
  const totalOffices = liveOffices.length;
  const totalAgents = liveOffices.reduce((sum, office) => sum + office.agentIds.length, 0);
  const splitFloors = liveFloors.filter((floor) => floor.officeIds.length > 1).length;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1a2533_0%,#000000_44%,#000000_100%)] px-3 py-3 md:px-4">
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="border-2 border-white bg-black px-4 py-2 text-sm font-bold tracking-[0.18em] text-white font-mono uppercase">
            OPC HQ
          </div>
          <div className="border-2 border-white bg-black px-4 py-2 text-xs text-white uppercase font-mono md:text-sm">
            总览 -&gt; 楼层 -&gt; 办公室
          </div>
        </div>

        <SignalStrip
          items={[
            makeHudItem(sharedHudIcons.offices(), "楼层", `${liveFloors.length} 层`),
            makeHudItem(sharedHudIcons.offices(), "办公室", `${totalOffices} 间`),
            makeHudItem(sharedHudIcons.agents(), "Agent", `${totalAgents} 位`),
            makeHudItem(sharedHudIcons.flow(), "拆分楼层", `${splitFloors} 层`),
          ]}
        />
      </div>

      <section className="space-y-4">
        {liveFloors
          .slice()
          .sort((a, b) => b.floor - a.floor)
          .map((floor) => {
            const preview = getLiveOfficeByOfficeId(floor.previewOfficeId);
            const floorOffices = liveOffices.filter((office) => office.floor === floor.floor);
            const floorAgents = floorOffices.reduce((sum, office) => sum + office.agentIds.length, 0);

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
                  metrics={[
                    {
                      icon: departmentIcon(floor.departmentId),
                      label: floor.floorTitle,
                    },
                    ...getOfficePreviewMetrics(preview.officeId).slice(0, 2),
                    {
                      icon: sharedHudIcons.agents(),
                      label: `${floorAgents} 位 Agent`,
                    },
                  ]}
                  className="min-h-[36svh] transition-transform duration-150 md:min-h-[42svh]"
                />
              </Link>
            );
          })}
      </section>
    </div>
  );
}
