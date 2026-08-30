import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Calendar, Clock, MapPin, Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Stars } from "@/components/ui/Stars";
import { useAppState } from "@/state/AppStateContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const statusCopy: Record<ApplicationStatus, string> = {
  pending: "Application sent — awaiting response",
  shortlisted: "You've been shortlisted",
  accepted: "You're matched on this mission",
  declined: "Not selected for this mission",
  withdrawn: "Application withdrawn",
};

export default function MissionDetail() {
  const { missionId } = useParams();
  const { missions, companies, talents, applications, role, currentTalent, currentCompany, applyToMission, respondToApplication } =
    useAppState();
  const [message, setMessage] = useState("");
  const [showApplyForm, setShowApplyForm] = useState(false);

  const mission = missions.find((m) => m.id === missionId);
  if (!mission) return <Navigate to="/missions" replace />;
  const company = companies.find((c) => c.id === mission.companyId);

  const myApplication =
    role === "talent" && currentTalent
      ? applications.find((a) => a.missionId === mission.id && a.talentId === currentTalent.id)
      : undefined;

  const missionApplications = applications.filter((a) => a.missionId === mission.id);
  const isOwner = role === "company" && currentCompany?.id === mission.companyId;

  function submitApplication() {
    applyToMission(mission!.id, message);
    setShowApplyForm(false);
    setMessage("");
  }

  return (
    <div className="container py-8">
      <Link to="/missions" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        All missions
      </Link>

      <div className="mt-5 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            {mission.status === "open" && <Badge tone="earth">Open</Badge>}
            {mission.status === "in_progress" && <Badge tone="horizon">In progress</Badge>}
            {mission.status === "completed" && <Badge tone="neutral">Completed</Badge>}
            <Badge tone="outline">{mission.category}</Badge>
          </div>

          <h1 className="mt-3 font-display text-3xl sm:text-4xl text-ink leading-tight">{mission.title}</h1>

          <div className="mt-4 flex items-center gap-3 w-fit">
            <Avatar src={company?.logoUrl} name={company?.name ?? ""} />
            <div>
              <p className="text-sm font-medium text-ink-700 flex items-center gap-1">
                {company?.name}
                {company?.verified && <BadgeCheck className="h-4 w-4 text-earth-500" />}
              </p>
              {company && <Stars rating={company.rating} className="mt-0.5" />}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Info icon={MapPin} label="Location" value={`${mission.location.city}, ${mission.location.country}`} />
            <Info icon={Clock} label="Duration" value={mission.duration} />
            <Info icon={Calendar} label="Starts" value={formatDate(mission.startDate)} />
            <Info
              icon={Wallet}
              label="Budget"
              value={`${formatCurrency(mission.budgetMin, mission.currency)}–${formatCurrency(mission.budgetMax, mission.currency)}`}
            />
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg text-ink mb-2">About this mission</h2>
            <p className="text-ink-600 leading-relaxed">{mission.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg text-ink mb-2">Skills required</h2>
            <div className="flex flex-wrap gap-2">
              {mission.skillsRequired.map((s) => (
                <Badge key={s} tone="neutral">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {isOwner && (
            <div className="mt-10">
              <h2 className="font-display text-lg text-ink mb-3">
                Applicants ({missionApplications.length})
              </h2>
              {missionApplications.length === 0 && (
                <p className="text-sm text-ink-400">No applications yet.</p>
              )}
              <div className="flex flex-col gap-3">
                {missionApplications.map((app) => {
                  const talent = talents.find((t) => t.id === app.talentId);
                  if (!talent) return null;
                  return (
                    <Card key={app.id} className="p-4 flex items-start gap-3">
                      <Link to={`/talent/${talent.id}`}>
                        <Avatar src={talent.avatarUrl} name={talent.name} />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <Link to={`/talent/${talent.id}`} className="font-medium text-ink truncate">
                            {talent.name}
                          </Link>
                          <Badge
                            tone={
                              app.status === "accepted"
                                ? "earth"
                                : app.status === "declined"
                                  ? "neutral"
                                  : "horizon"
                            }
                          >
                            {app.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-ink-400">
                          {talent.headline} · {app.origin === "apply" ? "Applied" : "Recruited"} {formatDate(app.createdAt)}
                        </p>
                        {app.message && <p className="mt-1.5 text-sm text-ink-600">{app.message}</p>}
                        {app.status === "pending" && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" onClick={() => respondToApplication(app.id, "accepted")}>
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => respondToApplication(app.id, "shortlisted")}>
                              Shortlist
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => respondToApplication(app.id, "declined")}>
                              Decline
                            </Button>
                          </div>
                        )}
                        {app.status === "shortlisted" && (
                          <div className="mt-3 flex gap-2">
                            <Button size="sm" onClick={() => respondToApplication(app.id, "accepted")}>
                              Accept
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => respondToApplication(app.id, "declined")}>
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-5">
            <p className="font-display text-2xl text-ink">
              {formatCurrency(mission.budgetMin, mission.currency)}–{formatCurrency(mission.budgetMax, mission.currency)}
            </p>
            <p className="text-sm text-ink-400 mt-0.5">{mission.applicantsCount} people applied</p>

            {role === "talent" && (
              <div className="mt-5">
                {myApplication ? (
                  <div className="rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-600">
                    {statusCopy[myApplication.status]}
                  </div>
                ) : mission.status === "open" ? (
                  showApplyForm ? (
                    <div className="flex flex-col gap-3">
                      <Textarea
                        rows={4}
                        placeholder="Why are you a fit for this mission?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <Button onClick={submitApplication}>Send application</Button>
                      <Button variant="ghost" onClick={() => setShowApplyForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" onClick={() => setShowApplyForm(true)}>
                      Apply to mission
                    </Button>
                  )
                ) : (
                  <div className="rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-500">
                    This mission is no longer accepting applications.
                  </div>
                )}
              </div>
            )}

            {role === "company" && !isOwner && (
              <p className="mt-5 text-sm text-ink-400">Posted by another company on Pangea.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs text-ink-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-ink-700">{value}</p>
    </div>
  );
}
