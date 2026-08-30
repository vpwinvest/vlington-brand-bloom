export type Role = "talent" | "company";

export type Availability = "available" | "open" | "unavailable";

export interface Location {
  city: string;
  country: string;
  countryCode: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  bio: string;
  location: Location;
  skills: string[];
  languages: string[];
  yearsExperience: number;
  availability: Availability;
  dayRateUsd: number;
  missionsCompleted: number;
  rating: number;
  ratingCount: number;
  verified: boolean;
  pastMissions: { title: string; company: string; year: number }[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  bio: string;
  location: Location;
  website: string;
  verified: boolean;
  missionsPosted: number;
  rating: number;
  ratingCount: number;
}

export type MissionStatus = "open" | "in_progress" | "completed" | "closed";

export interface Mission {
  id: string;
  companyId: string;
  title: string;
  category: string;
  skillsRequired: string[];
  location: Location;
  remote: boolean;
  duration: string;
  startDate: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  description: string;
  status: MissionStatus;
  createdAt: string;
  applicantsCount: number;
}

export type ApplicationStatus =
  | "pending"
  | "shortlisted"
  | "accepted"
  | "declined"
  | "withdrawn";

export interface Application {
  id: string;
  missionId: string;
  talentId: string;
  status: ApplicationStatus;
  message: string;
  createdAt: string;
  origin: "apply" | "recruit";
}

export type MatchStatus = "active" | "completed";

export interface Match {
  id: string;
  missionId: string;
  talentId: string;
  companyId: string;
  status: MatchStatus;
  matchedAt: string;
  completedAt?: string;
}

export interface Rating {
  id: string;
  missionId: string;
  fromId: string;
  toId: string;
  score: number;
  comment: string;
  createdAt: string;
}
