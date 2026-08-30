import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Languages, MapPin, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Textarea } from "@/components/ui/Input";
import { Stars } from "@/components/ui/Stars";
import { useAppState } from "@/state/AppStateContext";
import { formatCurrency } from "@/lib/utils";

const availabilityLabel = {
  available: "Available now",
  open: "Open to missions",
  unavailable: "Not available",
} as const;

export default function TalentProfileView() {
  const { talentId } = useParams();
  const { talents, missions, role, currentCompany, applicationFor, recruitTalent } = useAppState();
  const [selectedMissionId, setSelectedMissionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);

  const talent = talents.find((t) => t.id === talentId);
  if (!talent) return <Navigate to="/talent" replace />;

  const myOpenMissions = currentCompany
    ? missions.filter((m) => m.companyId === currentCompany.id && m.status === "open")
    : [];

  function handleRecruit() {
    if (!selectedMissionId) return;
    recruitTalent(selectedMissionId, talent!.id, message);
    setSent(true);
    setShowForm(false);
  }

  return (
    <div className="container py-8">
      <Link to="/talent" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        All talent
      </Link>

      <div className="mt-5 grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <div className="flex items-start gap-4">
            <Avatar src={talent.avatarUrl} name={talent.name} size="xl" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-2xl sm:text-3xl text-ink">{talent.name}</h1>
                {talent.verified && <BadgeCheck className="h-5 w-5 text-earth-500" />}
              </div>
              <p className="text-ink-600">{talent.headline}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-ink-400">
                <MapPin className="h-3.5 w-3.5" />
                {talent.location.city}, {talent.location.country}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <StatChip label="Rating"><Stars rating={talent.rating} /></StatChip>
            <StatChip label="Missions completed">{talent.missionsCompleted}</StatChip>
            <StatChip label="Experience">{talent.yearsExperience} yrs</StatChip>
            <Badge tone={talent.availability === "unavailable" ? "neutral" : "earth"} className="self-center">
              {availabilityLabel[talent.availability]}
            </Badge>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg text-ink mb-2">About</h2>
            <p className="text-ink-600 leading-relaxed">{talent.bio}</p>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-lg text-ink mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {talent.skills.map((s) => (
                <Badge key={s} tone="neutral">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-ink-500">
            <Languages className="h-4 w-4" />
            {talent.languages.join(", ")}
          </div>

          {talent.pastMissions.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg text-ink mb-3">Mission history</h2>
              <div className="flex flex-col gap-2">
                {talent.pastMissions.map((pm, i) => (
                  <Card key={i} className="p-4 flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-horizon-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-ink-700">{pm.title}</p>
                      <p className="text-xs text-ink-400">
                        {pm.company} · {pm.year}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-5">
            <p className="font-display text-2xl text-ink">{formatCurrency(talent.dayRateUsd)}<span className="text-sm font-sans text-ink-400"> / day</span></p>

            {role === "company" && (
              <div className="mt-5">
                {sent ? (
                  <div className="rounded-xl bg-earth-50 px-4 py-3 text-sm text-earth-700">
                    Recruit invite sent to {talent.name}.
                  </div>
                ) : showForm ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-ink-600">Which mission?</p>
                    <div className="flex flex-col gap-2">
                      {myOpenMissions.length === 0 && (
                        <p className="text-sm text-ink-400">You don't have any open missions to recruit for.</p>
                      )}
                      {myOpenMissions.map((m) => {
                        const already = applicationFor(m.id, talent.id);
                        return (
                          <Chip
                            key={m.id}
                            label={m.title}
                            active={selectedMissionId === m.id}
                            onClick={() => !already && setSelectedMissionId(m.id)}
                            className={already ? "opacity-40 pointer-events-none" : ""}
                          />
                        );
                      })}
                    </div>
                    <Textarea
                      rows={3}
                      placeholder="Tell them why this mission is a fit"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={handleRecruit} disabled={!selectedMissionId}>
                      Send recruit invite
                    </Button>
                    <Button variant="ghost" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={() => setShowForm(true)}>
                    Recruit {talent.name.split(" ")[0]}
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-paper-50 px-3.5 py-2">
      <p className="text-[11px] text-ink-400">{label}</p>
      <div className="mt-0.5 text-sm font-medium text-ink-700">{children}</div>
    </div>
  );
}
