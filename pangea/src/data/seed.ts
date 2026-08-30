import type { Application, Match, Rating } from "@/types";

export const seedApplications: Application[] = [
  {
    id: "a1",
    missionId: "m1",
    talentId: "t1",
    status: "pending",
    message:
      "I led commissioning on a 150kW microgrid outside Tamale last year — very similar scope. Available from the 20th.",
    createdAt: "2026-08-19",
    origin: "apply",
  },
  {
    id: "a2",
    missionId: "m2",
    talentId: "t2",
    status: "pending",
    message: "",
    createdAt: "2026-08-14",
    origin: "recruit",
  },
  {
    id: "a3",
    missionId: "m9",
    talentId: "t9",
    status: "accepted",
    message: "Based in Porto, know the site. Can start immediately.",
    createdAt: "2026-07-20",
    origin: "apply",
  },
  {
    id: "a4",
    missionId: "m13",
    talentId: "t7",
    status: "accepted",
    message: "",
    createdAt: "2026-06-10",
    origin: "recruit",
  },
  {
    id: "a5",
    missionId: "m8",
    talentId: "t8",
    status: "shortlisted",
    message: "1,200+ dives across the Coral Triangle, most recently in the Philippines. Portfolio attached.",
    createdAt: "2026-08-12",
    origin: "apply",
  },
];

export const seedMatches: Match[] = [
  {
    id: "match1",
    missionId: "m9",
    talentId: "t9",
    companyId: "c1",
    status: "active",
    matchedAt: "2026-07-21",
  },
  {
    id: "match2",
    missionId: "m13",
    talentId: "t7",
    companyId: "c7",
    status: "completed",
    matchedAt: "2026-06-11",
    completedAt: "2026-07-25",
  },
];

export const seedRatings: Rating[] = [
  {
    id: "r1",
    missionId: "m13",
    fromId: "c7",
    toId: "t7",
    score: 5,
    comment:
      "Lin delivered a structural plan that used a third less concrete than our baseline and still hit every code requirement. Would hire again without hesitation.",
    createdAt: "2026-07-26",
  },
  {
    id: "r2",
    missionId: "m13",
    fromId: "t7",
    toId: "c7",
    score: 5,
    comment: "Clear brief, fast decisions, paid on time. One of the smoothest missions I've done.",
    createdAt: "2026-07-27",
  },
];

/** Demo session anchors — who "you" are before switching roles. */
export const DEMO_TALENT_ID = "t1";
export const DEMO_COMPANY_ID = "c1";
