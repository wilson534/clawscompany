import Link from "next/link";
import { notFound } from "next/navigation";
import { getOfficePreviewMetrics } from "@/components/department-ops-panels";
import { PixelOfficePreview } from "@/components/pixel-office-preview";
import { SignalStrip, departmentIcon, makeHudItem, sharedHudIcons } from "@/components/ops-hud";
import { getLiveFloorByFloor, getLiveOfficeByOfficeId } from "@/lib/live-offices";

type PageProps = {
  params: Promise<{ floorId: string }>;
};

export default async function FloorPage({ params }: PageProps) {
  const { floorId } = await params;
  const floor = getLiveFloorByFloor(floorId);

  if (!floor) {
    notFound();
  }

  const offices = floor.officeIds
    .map((officeId) => getLiveOfficeByOfficeId(officeId))
    .filter((office): office is NonNullable<typeof office> => Boolean(office));

  const splitLayout = offices.length > 1;
  const agentCount = offices.reduce((sum, office) => sum + office.agentIds.length, 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#182231_0%,#000000_42%,#000000_100%)] px-3 py-3 md:px-4">
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="border-2 border-white bg-black px-4 py-2 text-sm font-bold tracking-[0.18em] text-white font-mono uppercase">
            {floor.floorLabel} / {floor.floorTitle}
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/" className="opc-nav-chip">
              返回总部
            </Link>
          </div>
        </div>

        <SignalStrip
          disableScramble={true}
          items={[
            makeHudItem(departmentIcon(floor.departmentId), "部门", floor.floorTitle),
            makeHudItem(sharedHudIcons.offices(), "办公室", `${offices.length} 间`),
            makeHudItem(sharedHudIcons.agents(), "Agent", `${agentCount} 位`),
            makeHudItem(sharedHudIcons.live(), "状态", "Live 运行中"),
          ]}
        />
      </div>

      <section className={`grid gap-4 ${splitLayout ? "xl:grid-cols-2" : ""}`}>
        {offices.map((office) => (
          <Link key={office.officeId} href={`/office/${office.officeId}`} className="group block">
            <PixelOfficePreview
              disableScramble={true}
              config={office}
              title={office.officeTitle}
              subtitle={splitLayout ? floor.floorTitle : "点击进入对应办公室 live"}
              ctaLabel="进入办公室"
              metrics={[
                {
                  icon: sharedHudIcons.agents(),
                  label: `${office.agentIds.length} 位 Agent`,
                },
                ...getOfficePreviewMetrics(office.officeId).slice(0, 2),
                {
                  icon: departmentIcon(floor.departmentId),
                  label: splitLayout ? "部门子办公室" : "部门主办公室",
                },
              ]}
              className={
                splitLayout
                  ? "min-h-[74svh] transition-transform duration-150 group-hover:-translate-y-1"
                  : "min-h-[88svh] transition-transform duration-150 group-hover:-translate-y-1"
              }
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
