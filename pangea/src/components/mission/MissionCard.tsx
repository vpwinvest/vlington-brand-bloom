import { Link } from "react-router-dom";
import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import type { CompanyProfile, Mission } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function MissionCard({ mission, company }: { mission: Mission; company?: CompanyProfile }) {
  return (
    <Link to={`/missions/${mission.id}`} className="block">
      <Card className="p-5 hover:border-ink-300 transition-colors h-full flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar src={company?.logoUrl} name={company?.name ?? "Company"} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink-700 truncate">{company?.name}</p>
              <p className="flex items-center gap-1 text-xs text-ink-400">
                <MapPin className="h-3 w-3" />
                {mission.location.city}, {mission.location.country}
              </p>
            </div>
          </div>
          {mission.status === "open" && <Badge tone="earth">Open</Badge>}
          {mission.status === "in_progress" && <Badge tone="horizon">In progress</Badge>}
          {mission.status === "completed" && <Badge tone="neutral">Completed</Badge>}
        </div>

        <div>
          <h3 className="font-display text-lg leading-snug text-ink">{mission.title}</h3>
          <p className="mt-1 text-sm text-ink-500">
            {mission.duration} · from {mission.startDate}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {mission.skillsRequired.slice(0, 3).map((skill) => (
            <Badge key={skill} tone="neutral">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-ink-100">
          <p className="font-display text-base text-ink">
            {formatCurrency(mission.budgetMin, mission.currency)}–{formatCurrency(mission.budgetMax, mission.currency)}
          </p>
          <p className="flex items-center gap-1 text-xs text-ink-400">
            <Users className="h-3 w-3" />
            {mission.applicantsCount} applied
          </p>
        </div>
      </Card>
    </Link>
  );
}
