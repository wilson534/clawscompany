import Link from "next/link";
import { notFound } from "next/navigation";
import { PixelOfficePreview } from "@/components/pixel-office-preview";
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#182231_0%,#0f1620_42%,#090e14_100%)] px-3 py-3 md:px-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="rounded-full border border-white/10 bg-[rgba(7,11,17,0.56)] px-4 py-2 text-sm font-semibold tracking-[0.18em] text-white/92 backdrop-blur-sm">
          {floor.floorLabel} / {floor.floorTitle}
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/" className="opc-nav-chip">
            返回总部
          </Link>
        </div>
      </div>

      <section className={`grid gap-4 ${splitLayout ? "xl:grid-cols-2" : ""}`}>
        {offices.map((office) => (
          <Link key={office.officeId} href={`/office/${office.officeId}`} className="group block">
            <PixelOfficePreview
              config={office}
              title={office.officeTitle}
              subtitle={splitLayout ? floor.floorTitle : "点击进入对应办公室 live"}
              ctaLabel="进入办公室"
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
