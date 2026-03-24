export type OfficeHotspot = {
  agentId: string;
  left: number;
  top: number;
};

export const officeHotspots: Record<string, OfficeHotspot[]> = {
  founder: [{ agentId: "founder-em01", left: 27, top: 60 }],
  team: [
    { agentId: "team-peng", left: 17, top: 66 },
    { agentId: "team-zhang", left: 41, top: 67 },
  ],
  "team-builder": [
    { agentId: "team-randy", left: 32, top: 66 },
    { agentId: "team-shi", left: 67, top: 62 },
  ],
  partner: [
    { agentId: "partner-scout", left: 33, top: 60 },
    { agentId: "bd-operator", left: 79, top: 58 },
  ],
  intel: [{ agentId: "intel-scout", left: 24, top: 66 }],
  "intel-synth": [
    { agentId: "intel-synth", left: 31, top: 64 },
    { agentId: "team-zhang", left: 61, top: 62 },
  ],
  investment: [{ agentId: "pm-investor", left: 24, top: 65 }],
  design: [
    { agentId: "design-director", left: 23, top: 66 },
    { agentId: "team-randy", left: 54, top: 66 },
  ],
  engineering: [{ agentId: "eng-bald", left: 24, top: 66 }],
  "engineering-build": [
    { agentId: "eng-builder", left: 34, top: 66 },
    { agentId: "team-shi", left: 61, top: 63 },
  ],
  qa: [{ agentId: "qa-inspector", left: 72, top: 34 }],
  release: [{ agentId: "release-publisher", left: 28, top: 66 }],
  "release-meta": [{ agentId: "release-publisher", left: 29, top: 66 }],
  growth: [{ agentId: "growth-operator", left: 21, top: 67 }],
};
