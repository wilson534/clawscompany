import { notFound } from "next/navigation";
import { OfficeLiveShell } from "@/components/office-live-shell";
import { getOfficeById } from "@/lib/opc";
import { getLiveOfficeByOfficeId } from "@/lib/live-offices";

type PageProps = {
  params: Promise<{ officeId: string }>;
  searchParams: Promise<{ agent?: string }>;
};

export default async function OfficePage({ params, searchParams }: PageProps) {
  const { officeId } = await params;
  const { agent } = await searchParams;
  const live = getLiveOfficeByOfficeId(officeId);
  const office = live ? getOfficeById(live.sourceOfficeId) : undefined;

  if (!office || !live) {
    notFound();
  }

  return <OfficeLiveShell live={live} selectedAgentId={agent} />;
}
