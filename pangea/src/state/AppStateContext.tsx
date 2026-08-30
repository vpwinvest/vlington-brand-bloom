import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  Application,
  ApplicationStatus,
  CompanyProfile,
  Match,
  Mission,
  Rating,
  Role,
  TalentProfile,
} from "@/types";
import { companies as seedCompanies } from "@/data/companies";
import { talents as seedTalents } from "@/data/talent";
import { missions as seedMissions } from "@/data/missions";
import {
  DEMO_COMPANY_ID,
  DEMO_TALENT_ID,
  seedApplications,
  seedMatches,
  seedRatings,
} from "@/data/seed";

const STORAGE_KEY = "pangea_state_v1";

interface PersistedState {
  role: Role | null;
  talentProfileId: string | null;
  companyProfileId: string | null;
  talents: TalentProfile[];
  companies: CompanyProfile[];
  missions: Mission[];
  applications: Application[];
  matches: Match[];
  ratings: Rating[];
}

function defaultState(): PersistedState {
  return {
    role: null,
    talentProfileId: null,
    companyProfileId: null,
    talents: seedTalents,
    companies: seedCompanies,
    missions: seedMissions,
    applications: seedApplications,
    matches: seedMatches,
    ratings: seedRatings,
  };
}

function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

interface AppStateValue extends PersistedState {
  currentTalent: TalentProfile | null;
  currentCompany: CompanyProfile | null;
  setRole: (role: Role) => void;
  useDemoIdentity: (role: Role) => void;
  saveTalentProfile: (profile: Omit<TalentProfile, "id" | "missionsCompleted" | "rating" | "ratingCount" | "pastMissions" | "verified">) => void;
  saveCompanyProfile: (profile: Omit<CompanyProfile, "id" | "missionsPosted" | "rating" | "ratingCount" | "verified">) => void;
  applyToMission: (missionId: string, message: string) => void;
  recruitTalent: (missionId: string, talentId: string, message: string) => void;
  respondToApplication: (applicationId: string, status: ApplicationStatus) => void;
  completeMatch: (matchId: string) => void;
  submitRating: (missionId: string, toId: string, score: number, comment: string) => void;
  applicationFor: (missionId: string, talentId: string) => Application | undefined;
  signOut: () => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentTalent = useMemo(
    () => state.talents.find((t) => t.id === state.talentProfileId) ?? null,
    [state.talents, state.talentProfileId]
  );
  const currentCompany = useMemo(
    () => state.companies.find((c) => c.id === state.companyProfileId) ?? null,
    [state.companies, state.companyProfileId]
  );

  const setRole = useCallback((role: Role) => {
    setState((s) => ({ ...s, role }));
  }, []);

  const useDemoIdentity = useCallback((role: Role) => {
    setState((s) => ({
      ...s,
      role,
      talentProfileId: role === "talent" ? DEMO_TALENT_ID : s.talentProfileId,
      companyProfileId: role === "company" ? DEMO_COMPANY_ID : s.companyProfileId,
    }));
  }, []);

  const saveTalentProfile: AppStateValue["saveTalentProfile"] = useCallback((profile) => {
    setState((s) => {
      const id = s.talentProfileId ?? `t-custom-${Date.now()}`;
      const existing = s.talents.find((t) => t.id === id);
      const next: TalentProfile = {
        id,
        missionsCompleted: existing?.missionsCompleted ?? 0,
        rating: existing?.rating ?? 0,
        ratingCount: existing?.ratingCount ?? 0,
        pastMissions: existing?.pastMissions ?? [],
        verified: existing?.verified ?? false,
        ...profile,
      };
      const talents = existing
        ? s.talents.map((t) => (t.id === id ? next : t))
        : [...s.talents, next];
      return { ...s, talents, talentProfileId: id, role: "talent" };
    });
  }, []);

  const saveCompanyProfile: AppStateValue["saveCompanyProfile"] = useCallback((profile) => {
    setState((s) => {
      const id = s.companyProfileId ?? `c-custom-${Date.now()}`;
      const existing = s.companies.find((c) => c.id === id);
      const next: CompanyProfile = {
        id,
        missionsPosted: existing?.missionsPosted ?? 0,
        rating: existing?.rating ?? 0,
        ratingCount: existing?.ratingCount ?? 0,
        verified: existing?.verified ?? false,
        ...profile,
      };
      const companies = existing
        ? s.companies.map((c) => (c.id === id ? next : c))
        : [...s.companies, next];
      return { ...s, companies, companyProfileId: id, role: "company" };
    });
  }, []);

  const applicationFor = useCallback(
    (missionId: string, talentId: string) =>
      state.applications.find((a) => a.missionId === missionId && a.talentId === talentId),
    [state.applications]
  );

  const applyToMission = useCallback((missionId: string, message: string) => {
    setState((s) => {
      if (!s.talentProfileId) return s;
      if (s.applications.some((a) => a.missionId === missionId && a.talentId === s.talentProfileId))
        return s;
      const application: Application = {
        id: `a-${Date.now()}`,
        missionId,
        talentId: s.talentProfileId,
        status: "pending",
        message,
        createdAt: new Date().toISOString().slice(0, 10),
        origin: "apply",
      };
      return {
        ...s,
        applications: [...s.applications, application],
        missions: s.missions.map((m) =>
          m.id === missionId ? { ...m, applicantsCount: m.applicantsCount + 1 } : m
        ),
      };
    });
  }, []);

  const recruitTalent = useCallback((missionId: string, talentId: string, message: string) => {
    setState((s) => {
      if (!s.companyProfileId) return s;
      if (s.applications.some((a) => a.missionId === missionId && a.talentId === talentId)) return s;
      const application: Application = {
        id: `a-${Date.now()}`,
        missionId,
        talentId,
        status: "pending",
        message,
        createdAt: new Date().toISOString().slice(0, 10),
        origin: "recruit",
      };
      return { ...s, applications: [...s.applications, application] };
    });
  }, []);

  const respondToApplication = useCallback((applicationId: string, status: ApplicationStatus) => {
    setState((s) => {
      const application = s.applications.find((a) => a.id === applicationId);
      if (!application) return s;
      const applications = s.applications.map((a) =>
        a.id === applicationId ? { ...a, status } : a
      );
      let matches = s.matches;
      if (status === "accepted" && !matches.some((m) => m.missionId === application.missionId && m.talentId === application.talentId)) {
        const mission = s.missions.find((m) => m.id === application.missionId);
        if (mission) {
          matches = [
            ...matches,
            {
              id: `match-${Date.now()}`,
              missionId: application.missionId,
              talentId: application.talentId,
              companyId: mission.companyId,
              status: "active",
              matchedAt: new Date().toISOString().slice(0, 10),
            },
          ];
        }
      }
      return { ...s, applications, matches };
    });
  }, []);

  const completeMatch = useCallback((matchId: string) => {
    setState((s) => ({
      ...s,
      matches: s.matches.map((m) =>
        m.id === matchId
          ? { ...m, status: "completed", completedAt: new Date().toISOString().slice(0, 10) }
          : m
      ),
      missions: s.missions.map((mi) => {
        const match = s.matches.find((m) => m.id === matchId);
        return match && mi.id === match.missionId ? { ...mi, status: "completed" } : mi;
      }),
    }));
  }, []);

  const submitRating = useCallback((missionId: string, toId: string, score: number, comment: string) => {
    setState((s) => {
      const fromId = s.role === "talent" ? s.talentProfileId : s.companyProfileId;
      if (!fromId) return s;
      const rating: Rating = {
        id: `r-${Date.now()}`,
        missionId,
        fromId,
        toId,
        score,
        comment,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      const talents = s.talents.map((t) =>
        t.id === toId
          ? {
              ...t,
              ratingCount: t.ratingCount + 1,
              rating: Number(((t.rating * t.ratingCount + score) / (t.ratingCount + 1)).toFixed(2)),
              missionsCompleted: t.missionsCompleted + 1,
            }
          : t
      );
      const companiesList = s.companies.map((c) =>
        c.id === toId
          ? {
              ...c,
              ratingCount: c.ratingCount + 1,
              rating: Number(((c.rating * c.ratingCount + score) / (c.ratingCount + 1)).toFixed(2)),
            }
          : c
      );
      return { ...s, ratings: [...s.ratings, rating], talents, companies: companiesList };
    });
  }, []);

  const signOut = useCallback(() => {
    setState((s) => ({ ...s, role: null, talentProfileId: null, companyProfileId: null }));
  }, []);

  const resetDemo = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setState(defaultState());
  }, []);

  const value: AppStateValue = {
    ...state,
    currentTalent,
    currentCompany,
    setRole,
    useDemoIdentity,
    saveTalentProfile,
    saveCompanyProfile,
    applyToMission,
    recruitTalent,
    respondToApplication,
    completeMatch,
    submitRating,
    applicationFor,
    signOut,
    resetDemo,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
