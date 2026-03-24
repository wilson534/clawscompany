import type { OfficeId } from "@/lib/opc-types";

export type LiveOfficeConfig = {
  officeId: string;
  sourceOfficeId: OfficeId;
  floor: number;
  floorLabel: string;
  floorTitle: string;
  officeTitle: string;
  previewVariant: string;
  port: number;
  agentIds: string[];
};

export type LiveFloorConfig = {
  floor: number;
  floorLabel: string;
  departmentId: OfficeId;
  floorTitle: string;
  officeIds: string[];
  previewOfficeId: string;
};

export const liveOffices: LiveOfficeConfig[] = [
  {
    officeId: "growth",
    sourceOfficeId: "growth",
    floor: 1,
    floorLabel: "1F",
    floorTitle: "增长部",
    officeTitle: "增长部 / Launch Room",
    previewVariant: "growth-launch",
    port: 19101,
    agentIds: ["growth-operator"],
  },
  {
    officeId: "release",
    sourceOfficeId: "release",
    floor: 2,
    floorLabel: "2F",
    floorTitle: "发行部",
    officeTitle: "发行部 / Screenshot Studio",
    previewVariant: "release-shot",
    port: 19102,
    agentIds: ["release-publisher"],
  },
  {
    officeId: "release-meta",
    sourceOfficeId: "release",
    floor: 2,
    floorLabel: "2F",
    floorTitle: "发行部",
    officeTitle: "发行部 / Metadata Desk",
    previewVariant: "release-meta",
    port: 19114,
    agentIds: ["release-publisher"],
  },
  {
    officeId: "qa",
    sourceOfficeId: "qa",
    floor: 3,
    floorLabel: "3F",
    floorTitle: "QA 部",
    officeTitle: "QA 部 / Gate Room",
    previewVariant: "qa-gate",
    port: 19103,
    agentIds: ["qa-inspector"],
  },
  {
    officeId: "engineering",
    sourceOfficeId: "engineering",
    floor: 4,
    floorLabel: "4F",
    floorTitle: "工程部",
    officeTitle: "工程部 / Shell Bay",
    previewVariant: "engineering-shell",
    port: 19104,
    agentIds: ["eng-bald"],
  },
  {
    officeId: "engineering-build",
    sourceOfficeId: "engineering",
    floor: 4,
    floorLabel: "4F",
    floorTitle: "工程部",
    officeTitle: "工程部 / Build Bay",
    previewVariant: "engineering-build",
    port: 19113,
    agentIds: ["eng-builder", "team-shi"],
  },
  {
    officeId: "design",
    sourceOfficeId: "design",
    floor: 5,
    floorLabel: "5F",
    floorTitle: "设计部",
    officeTitle: "设计部 / Atelier",
    previewVariant: "design-studio",
    port: 19105,
    agentIds: ["design-director", "team-randy"],
  },
  {
    officeId: "investment",
    sourceOfficeId: "investment",
    floor: 6,
    floorLabel: "6F",
    floorTitle: "产品投资部",
    officeTitle: "产品投资部 / Committee Room",
    previewVariant: "investment-committee",
    port: 19106,
    agentIds: ["pm-investor"],
  },
  {
    officeId: "intel",
    sourceOfficeId: "intel",
    floor: 7,
    floorLabel: "7F",
    floorTitle: "情报部",
    officeTitle: "情报部 / Signal Scan",
    previewVariant: "intel-scan",
    port: 19107,
    agentIds: ["intel-scout"],
  },
  {
    officeId: "intel-synth",
    sourceOfficeId: "intel",
    floor: 7,
    floorLabel: "7F",
    floorTitle: "情报部",
    officeTitle: "情报部 / Synth Room",
    previewVariant: "intel-synth",
    port: 19112,
    agentIds: ["intel-synth", "team-zhang"],
  },
  {
    officeId: "partner",
    sourceOfficeId: "partner",
    floor: 8,
    floorLabel: "8F",
    floorTitle: "外交部",
    officeTitle: "外交部 / Outreach Room",
    previewVariant: "partner-outreach",
    port: 19108,
    agentIds: ["partner-scout", "bd-operator"],
  },
  {
    officeId: "team",
    sourceOfficeId: "team",
    floor: 9,
    floorLabel: "9F",
    floorTitle: "Team Office",
    officeTitle: "Team Office / Narrative Room",
    previewVariant: "team-story",
    port: 19109,
    agentIds: ["team-peng", "team-zhang"],
  },
  {
    officeId: "team-builder",
    sourceOfficeId: "team",
    floor: 9,
    floorLabel: "9F",
    floorTitle: "Team Office",
    officeTitle: "Team Office / Builder Room",
    previewVariant: "team-build",
    port: 19111,
    agentIds: ["team-randy", "team-shi"],
  },
  {
    officeId: "founder",
    sourceOfficeId: "founder",
    floor: 10,
    floorLabel: "10F",
    floorTitle: "Founder",
    officeTitle: "Founder Office / Command Deck",
    previewVariant: "founder-command",
    port: 19110,
    agentIds: ["founder-em01"],
  },
];

export const liveFloors: LiveFloorConfig[] = [
  {
    floor: 10,
    floorLabel: "10F",
    departmentId: "founder",
    floorTitle: "Founder",
    officeIds: ["founder"],
    previewOfficeId: "founder",
  },
  {
    floor: 9,
    floorLabel: "9F",
    departmentId: "team",
    floorTitle: "Team Office",
    officeIds: ["team", "team-builder"],
    previewOfficeId: "team",
  },
  {
    floor: 8,
    floorLabel: "8F",
    departmentId: "partner",
    floorTitle: "外交部",
    officeIds: ["partner"],
    previewOfficeId: "partner",
  },
  {
    floor: 7,
    floorLabel: "7F",
    departmentId: "intel",
    floorTitle: "情报部",
    officeIds: ["intel", "intel-synth"],
    previewOfficeId: "intel",
  },
  {
    floor: 6,
    floorLabel: "6F",
    departmentId: "investment",
    floorTitle: "产品投资部",
    officeIds: ["investment"],
    previewOfficeId: "investment",
  },
  {
    floor: 5,
    floorLabel: "5F",
    departmentId: "design",
    floorTitle: "设计部",
    officeIds: ["design"],
    previewOfficeId: "design",
  },
  {
    floor: 4,
    floorLabel: "4F",
    departmentId: "engineering",
    floorTitle: "工程部",
    officeIds: ["engineering", "engineering-build"],
    previewOfficeId: "engineering",
  },
  {
    floor: 3,
    floorLabel: "3F",
    departmentId: "qa",
    floorTitle: "QA 部",
    officeIds: ["qa"],
    previewOfficeId: "qa",
  },
  {
    floor: 2,
    floorLabel: "2F",
    departmentId: "release",
    floorTitle: "发行部",
    officeIds: ["release", "release-meta"],
    previewOfficeId: "release",
  },
  {
    floor: 1,
    floorLabel: "1F",
    departmentId: "growth",
    floorTitle: "增长部",
    officeIds: ["growth"],
    previewOfficeId: "growth",
  },
];

export function getLiveOfficeByOfficeId(officeId: string) {
  return liveOffices.find((item) => item.officeId === officeId);
}

export function getLiveOfficesByFloor(floor: number | string) {
  return liveOffices.filter((item) => String(item.floor) === String(floor));
}

export function getLiveFloorByFloor(floor: number | string) {
  return liveFloors.find((item) => String(item.floor) === String(floor));
}

export function getPreviewOfficeByFloor(floor: number | string) {
  const floorConfig = getLiveFloorByFloor(floor);
  return floorConfig ? getLiveOfficeByOfficeId(floorConfig.previewOfficeId) : undefined;
}

export function getLiveUrlByOfficeId(officeId: string) {
  const config = getLiveOfficeByOfficeId(officeId);
  return config ? `http://127.0.0.1:${config.port}` : null;
}
