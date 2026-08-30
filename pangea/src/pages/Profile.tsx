import { Link } from "react-router-dom";
import { BadgeCheck, LogOut, MapPin, Pencil, RotateCcw } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stars } from "@/components/ui/Stars";
import { useAppState } from "@/state/AppStateContext";
import { formatCurrency } from "@/lib/utils";

const availabilityLabel = {
  available: "Available now",
  open: "Open to missions",
  unavailable: "Not available",
} as const;

export default function Profile() {
  const { role, currentTalent, currentCompany, signOut, resetDemo } = useAppState();

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="font-display text-3xl text-ink">Your profile</h1>

      {role === "talent" && currentTalent && (
        <Card className="mt-6 p-6">
          <div className="flex items-start gap-4">
            <Avatar src={currentTalent.avatarUrl} name={currentTalent.name} size="xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display text-2xl text-ink">{currentTalent.name}</h2>
                {currentTalent.verified && <BadgeCheck className="h-5 w-5 text-earth-500" />}
              </div>
              <p className="text-ink-600">{currentTalent.headline}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-ink-400">
                <MapPin className="h-3.5 w-3.5" />
                {currentTalent.location.city}, {currentTalent.location.country}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Stars rating={currentTalent.rating} />
            <span className="text-sm text-ink-400">{currentTalent.missionsCompleted} missions completed</span>
            <Badge tone={currentTalent.availability === "unavailable" ? "neutral" : "earth"}>
              {availabilityLabel[currentTalent.availability]}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {currentTalent.skills.map((s) => (
              <Badge key={s} tone="neutral">
                {s}
              </Badge>
            ))}
          </div>

          <p className="mt-4 font-display text-lg text-ink">{formatCurrency(currentTalent.dayRateUsd)} / day</p>

          <div className="mt-6 flex gap-2">
            <Link to="/onboarding/talent">
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" />
                Edit profile
              </Button>
            </Link>
          </div>
        </Card>
      )}

      {role === "company" && currentCompany && (
        <Card className="mt-6 p-6">
          <div className="flex items-start gap-4">
            <Avatar src={currentCompany.logoUrl} name={currentCompany.name} size="xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display text-2xl text-ink">{currentCompany.name}</h2>
                {currentCompany.verified && <BadgeCheck className="h-5 w-5 text-earth-500" />}
              </div>
              <p className="text-ink-600">{currentCompany.industry}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-ink-400">
                <MapPin className="h-3.5 w-3.5" />
                {currentCompany.location.city}, {currentCompany.location.country}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Stars rating={currentCompany.rating || 0} />
            <span className="text-sm text-ink-400">{currentCompany.missionsPosted} missions posted</span>
          </div>

          {currentCompany.bio && <p className="mt-4 text-ink-600 leading-relaxed">{currentCompany.bio}</p>}

          <div className="mt-6 flex gap-2">
            <Link to="/onboarding/company">
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" />
                Edit profile
              </Button>
            </Link>
          </div>
        </Card>
      )}

      <div className="mt-8 flex flex-col gap-2 items-start">
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="h-3.5 w-3.5" />
          Switch role / sign out
        </Button>
        <Button variant="ghost" size="sm" onClick={resetDemo}>
          <RotateCcw className="h-3.5 w-3.5" />
          Reset demo data
        </Button>
      </div>
    </div>
  );
}
