import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { MissionCard } from "@/components/mission/MissionCard";
import { useAppState } from "@/state/AppStateContext";

export default function MissionFeed() {
  const { missions, companies, currentTalent } = useAppState();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(missions.map((m) => m.category))),
    [missions]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return missions
      .filter((m) => m.status === "open" || m.status === "in_progress")
      .filter((m) => (category ? m.category === category : true))
      .filter((m) =>
        q
          ? m.title.toLowerCase().includes(q) ||
            m.skillsRequired.some((s) => s.toLowerCase().includes(q)) ||
            `${m.location.city} ${m.location.country}`.toLowerCase().includes(q)
          : true
      );
  }, [missions, query, category]);

  return (
    <div className="container py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-ink">
          {currentTalent ? `Missions for you, ${currentTalent.name.split(" ")[0]}` : "Missions"}
        </h1>
        <p className="mt-1.5 text-ink-500">Real work, anywhere. Filtered by what you can actually do.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skill, title or location"
            className="pl-11"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          <Chip label="All" active={category === null} onClick={() => setCategory(null)} />
          {categories.map((c) => (
            <Chip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-400">{filtered.length} missions</p>

      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            company={companies.find((c) => c.id === mission.companyId)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-ink-400">No missions match those filters yet.</div>
      )}
    </div>
  );
}
