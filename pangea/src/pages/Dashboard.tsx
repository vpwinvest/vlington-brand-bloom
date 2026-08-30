import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { RatingForm } from "@/components/shared/RatingForm";
import { useAppState } from "@/state/AppStateContext";
import { formatDate } from "@/lib/utils";

export default function Dashboard() {
  const { role } = useAppState();
  if (role === "company") return <CompanyDashboard />;
  return <TalentDashboard />;
}

function SectionTitle({ children, count }: { children: React.ReactNode; count?: number }) {
  return (
    <h2 className="font-display text-xl text-ink mt-10 mb-3 flex items-center gap-2">
      {children}
      {count !== undefined && <span className="text-sm font-sans text-ink-400">({count})</span>}
    </h2>
  );
}

function TalentDashboard() {
  const { missions, companies, applications, matches, ratings, currentTalent, completeMatch, submitRating } =
    useAppState();
  if (!currentTalent) return null;

  const myMatches = matches.filter((m) => m.talentId === currentTalent.id);
  const active = myMatches.filter((m) => m.status === "active");
  const completed = myMatches.filter((m) => m.status === "completed");
  const pendingApps = applications.filter(
    (a) => a.talentId === currentTalent.id && (a.status === "pending" || a.status === "shortlisted")
  );

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="font-display text-3xl text-ink">Your missions</h1>
      <p className="mt-1.5 text-ink-500">Everything you've applied to, matched on, and completed.</p>

      <SectionTitle count={active.length}>Active</SectionTitle>
      {active.length === 0 && <EmptyRow text="No active missions right now." />}
      <div className="flex flex-col gap-3">
        {active.map((match) => {
          const mission = missions.find((m) => m.id === match.missionId);
          const company = companies.find((c) => c.id === match.companyId);
          if (!mission) return null;
          return (
            <MissionRow key={match.id} title={mission.title} subtitle={company?.name} location={`${mission.location.city}, ${mission.location.country}`} avatarSrc={company?.logoUrl} avatarName={company?.name}>
              <Button size="sm" variant="outline" onClick={() => completeMatch(match.id)}>
                Mark complete
              </Button>
            </MissionRow>
          );
        })}
      </div>

      <SectionTitle count={pendingApps.length}>Applications in progress</SectionTitle>
      {pendingApps.length === 0 && <EmptyRow text="No open applications." />}
      <div className="flex flex-col gap-3">
        {pendingApps.map((app) => {
          const mission = missions.find((m) => m.id === app.missionId);
          const company = mission ? companies.find((c) => c.id === mission.companyId) : undefined;
          if (!mission) return null;
          return (
            <MissionRow key={app.id} title={mission.title} subtitle={company?.name} location={formatDate(app.createdAt)} avatarSrc={company?.logoUrl} avatarName={company?.name}>
              <Badge tone={app.status === "shortlisted" ? "horizon" : "neutral"}>{app.status}</Badge>
            </MissionRow>
          );
        })}
      </div>

      <SectionTitle count={completed.length}>Completed</SectionTitle>
      {completed.length === 0 && <EmptyRow text="Nothing completed yet — your track record starts here." />}
      <div className="flex flex-col gap-3">
        {completed.map((match) => {
          const mission = missions.find((m) => m.id === match.missionId);
          const company = companies.find((c) => c.id === match.companyId);
          if (!mission) return null;
          const myRating = ratings.find((r) => r.missionId === mission.id && r.fromId === currentTalent.id);
          const theirRating = ratings.find((r) => r.missionId === mission.id && r.toId === currentTalent.id);
          return (
            <Card key={match.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar src={company?.logoUrl} name={company?.name ?? ""} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{mission.title}</p>
                  <p className="text-xs text-ink-400">{company?.name}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-earth-500 shrink-0" />
              </div>
              {theirRating && (
                <div className="mt-3 rounded-xl bg-earth-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-earth-700">{company?.name} rated you</p>
                    <Stars rating={theirRating.score} />
                  </div>
                  {theirRating.comment && <p className="mt-1 text-sm text-ink-600">"{theirRating.comment}"</p>}
                </div>
              )}
              <div className="mt-3">
                {myRating ? (
                  <p className="text-sm text-ink-400">You rated this mission {myRating.score}/5.</p>
                ) : (
                  <RateInline onSubmit={(score, comment) => submitRating(mission.id, match.companyId, score, comment)} target={company?.name ?? "company"} />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CompanyDashboard() {
  const { missions, talents, applications, matches, ratings, currentCompany, completeMatch, submitRating } =
    useAppState();
  if (!currentCompany) return null;

  const myMissions = missions.filter((m) => m.companyId === currentCompany.id);
  const myMatches = matches.filter((m) => m.companyId === currentCompany.id);
  const active = myMatches.filter((m) => m.status === "active");
  const completed = myMatches.filter((m) => m.status === "completed");

  return (
    <div className="container py-8 max-w-3xl">
      <h1 className="font-display text-3xl text-ink">Mission dashboard</h1>
      <p className="mt-1.5 text-ink-500">Track applicants, matches and completed missions.</p>

      <SectionTitle count={myMissions.length}>Your missions</SectionTitle>
      <div className="flex flex-col gap-3">
        {myMissions.map((mission) => {
          const missionApps = applications.filter((a) => a.missionId === mission.id);
          const pendingCount = missionApps.filter((a) => a.status === "pending").length;
          return (
            <Link key={mission.id} to={`/missions/${mission.id}`}>
              <Card className="p-4 flex items-center gap-3 hover:border-ink-300 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{mission.title}</p>
                  <p className="flex items-center gap-1 text-xs text-ink-400">
                    <MapPin className="h-3 w-3" />
                    {mission.location.city}, {mission.location.country}
                  </p>
                </div>
                {pendingCount > 0 && <Badge tone="horizon">{pendingCount} new</Badge>}
                <Badge
                  tone={
                    mission.status === "open" ? "earth" : mission.status === "in_progress" ? "horizon" : "neutral"
                  }
                >
                  {mission.status.replace("_", " ")}
                </Badge>
              </Card>
            </Link>
          );
        })}
      </div>

      <SectionTitle count={active.length}>Active matches</SectionTitle>
      {active.length === 0 && <EmptyRow text="No active matches right now." />}
      <div className="flex flex-col gap-3">
        {active.map((match) => {
          const mission = missions.find((m) => m.id === match.missionId);
          const talent = talents.find((t) => t.id === match.talentId);
          if (!mission || !talent) return null;
          return (
            <MissionRow key={match.id} title={mission.title} subtitle={talent.name} location={talent.headline} avatarSrc={talent.avatarUrl} avatarName={talent.name}>
              <Button size="sm" variant="outline" onClick={() => completeMatch(match.id)}>
                Mark complete
              </Button>
            </MissionRow>
          );
        })}
      </div>

      <SectionTitle count={completed.length}>Completed</SectionTitle>
      {completed.length === 0 && <EmptyRow text="Nothing completed yet." />}
      <div className="flex flex-col gap-3">
        {completed.map((match) => {
          const mission = missions.find((m) => m.id === match.missionId);
          const talent = talents.find((t) => t.id === match.talentId);
          if (!mission || !talent) return null;
          const myRating = ratings.find((r) => r.missionId === mission.id && r.fromId === currentCompany.id);
          const theirRating = ratings.find((r) => r.missionId === mission.id && r.toId === currentCompany.id);
          return (
            <Card key={match.id} className="p-4">
              <div className="flex items-center gap-3">
                <Avatar src={talent.avatarUrl} name={talent.name} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-ink truncate">{mission.title}</p>
                  <p className="text-xs text-ink-400">{talent.name}</p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-earth-500 shrink-0" />
              </div>
              {theirRating && (
                <div className="mt-3 rounded-xl bg-earth-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-earth-700">{talent.name} rated you</p>
                    <Stars rating={theirRating.score} />
                  </div>
                  {theirRating.comment && <p className="mt-1 text-sm text-ink-600">"{theirRating.comment}"</p>}
                </div>
              )}
              <div className="mt-3">
                {myRating ? (
                  <p className="text-sm text-ink-400">You rated this mission {myRating.score}/5.</p>
                ) : (
                  <RateInline onSubmit={(score, comment) => submitRating(mission.id, talent.id, score, comment)} target={talent.name} />
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function MissionRow({
  title,
  subtitle,
  location,
  avatarSrc,
  avatarName,
  children,
}: {
  title: string;
  subtitle?: string;
  location: string;
  avatarSrc?: string;
  avatarName?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-4 flex items-center gap-3">
      <Avatar src={avatarSrc} name={avatarName ?? title} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-ink truncate">{title}</p>
        <p className="text-xs text-ink-400 truncate">
          {subtitle ? `${subtitle} · ` : ""}
          {location}
        </p>
      </div>
      {children}
    </Card>
  );
}

function EmptyRow({ text }: { text: string }) {
  return <p className="text-sm text-ink-400">{text}</p>;
}

function RateInline({ onSubmit, target }: { onSubmit: (score: number, comment: string) => void; target: string }) {
  const [open, setOpen] = useState(false);
  if (!open)
    return (
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Rate {target}
      </Button>
    );
  return <RatingForm onSubmit={onSubmit} onCancel={() => setOpen(false)} />;
}
