import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { TalentCard } from "@/components/talent/TalentCard";
import { useAppState } from "@/state/AppStateContext";

export default function TalentDiscovery() {
  const { talents, currentCompany } = useAppState();
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState<string | null>(null);

  const topSkills = useMemo(() => {
    const counts = new Map<string, number>();
    talents.forEach((t) => t.skills.forEach((s) => counts.set(s, (counts.get(s) ?? 0) + 1)));
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([s]) => s);
  }, [talents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return talents
      .filter((t) => (skill ? t.skills.includes(skill) : true))
      .filter((t) =>
        q
          ? t.name.toLowerCase().includes(q) ||
            t.headline.toLowerCase().includes(q) ||
            t.skills.some((s) => s.toLowerCase().includes(q)) ||
            `${t.location.city} ${t.location.country}`.toLowerCase().includes(q)
          : true
      )
      .sort((a, b) => b.rating - a.rating);
  }, [talents, query, skill]);

  return (
    <div className="container py-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-ink">
          {currentCompany ? `Discover talent, ${currentCompany.name}` : "Discover talent"}
        </h1>
        <p className="mt-1.5 text-ink-500">Real people with real missions behind them — not resumes.</p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skill, name or location"
            className="pl-11"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          <Chip label="All skills" active={skill === null} onClick={() => setSkill(null)} />
          {topSkills.map((s) => (
            <Chip key={s} label={s} active={skill === s} onClick={() => setSkill(s)} />
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-400">{filtered.length} talent profiles</p>

      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((talent) => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-ink-400">No talent matches those filters yet.</div>
      )}
    </div>
  );
}
