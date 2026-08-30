import { Link } from "react-router-dom";
import { MapPin, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Stars } from "@/components/ui/Stars";
import type { TalentProfile } from "@/types";

const availabilityTone = {
  available: "earth",
  open: "horizon",
  unavailable: "neutral",
} as const;

const availabilityLabel = {
  available: "Available now",
  open: "Open to missions",
  unavailable: "Not available",
} as const;

export function TalentCard({ talent }: { talent: TalentProfile }) {
  return (
    <Link to={`/talent/${talent.id}`} className="block">
      <Card className="p-5 hover:border-ink-300 transition-colors h-full flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Avatar src={talent.avatarUrl} name={talent.name} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-lg text-ink truncate">{talent.name}</h3>
              {talent.verified && <BadgeCheck className="h-4 w-4 text-earth-500 shrink-0" />}
            </div>
            <p className="text-sm text-ink-600 truncate">{talent.headline}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-400">
              <MapPin className="h-3 w-3" />
              {talent.location.city}, {talent.location.country}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {talent.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} tone="neutral">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-ink-100">
          <div className="flex items-center gap-3">
            <Stars rating={talent.rating} />
            <span className="text-xs text-ink-400">{talent.missionsCompleted} missions</span>
          </div>
          <Badge tone={availabilityTone[talent.availability]}>{availabilityLabel[talent.availability]}</Badge>
        </div>
      </Card>
    </Link>
  );
}
