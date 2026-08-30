import { Link } from "react-router-dom";
import { ArrowRight, Compass, Handshake, Sparkles, Star } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { MissionCard } from "@/components/mission/MissionCard";
import { missions } from "@/data/missions";
import { companies } from "@/data/companies";
import { talents } from "@/data/talent";

const featuredMissions = missions.filter((m) => m.status === "open").slice(0, 3);

const locations = Array.from(new Set(missions.map((m) => `${m.location.city}, ${m.location.country}`)));

const steps = [
  {
    icon: Compass,
    title: "Discover",
    body: "Browse real missions and real talent — filtered by skill, location and timing, not job titles.",
  },
  {
    icon: Handshake,
    title: "Apply or recruit",
    body: "Talent applies to missions they want. Companies recruit talent they've found. Either direction, same trust.",
  },
  {
    icon: Sparkles,
    title: "Match",
    body: "Once both sides confirm, the mission is locked in — dates, scope and budget, no back-and-forth.",
  },
  {
    icon: Star,
    title: "Complete & rate",
    body: "Finish the mission, rate each other, and carry that reputation to the next one, anywhere.",
  },
];

export default function Landing() {
  return (
    <div className="bg-paper-200">
      <header className="container flex h-20 items-center justify-between">
        <Wordmark />
        <Link to="/start">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </Link>
      </header>

      {/* Hero */}
      <section className="container pt-8 pb-16 md:pt-16 md:pb-24">
        <p className="text-sm font-medium tracking-[0.2em] text-horizon-600 uppercase">
          Talent without borders
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-ink">
          Your skills don't belong to one city.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-500">
          Pangea connects skilled people with short-term missions anywhere in the world — a solar
          engineer in Accra, a ship's doctor in Reykjavik, a chef in Zanzibar. Discover the work.
          Build the reputation. Go further.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/start">
            <Button size="lg" className="w-full sm:w-auto">
              I'm looking for missions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/start">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              I'm hiring talent
            </Button>
          </Link>
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl">
          <Stat value={`${missions.length}+`} label="live missions" />
          <Stat value={`${new Set(missions.map((m) => m.location.countryCode)).size}`} label="countries" />
          <Stat value="4.8" label="avg. rating" />
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-ink-100 bg-paper-50 py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[scroll_38s_linear_infinite] text-sm text-ink-400">
          {[...locations, ...locations].map((loc, i) => (
            <span key={i} className="flex items-center gap-2">
              {loc}
              <span className="text-ink-200">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-4xl text-ink max-w-md">
          One path, from discovery to reputation.
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <div key={title} className="rounded-2xl bg-paper-50 border border-ink-100 p-6">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-horizon-500" />
                <span className="font-display text-ink-200 text-2xl">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured missions */}
      <section className="container py-16 md:py-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-display text-3xl md:text-4xl text-ink">Live missions</h2>
          <Link to="/start" className="text-sm font-medium text-ink-600 hover:text-ink hidden sm:block">
            Explore all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              company={companies.find((c) => c.id === mission.companyId)}
            />
          ))}
        </div>
      </section>

      {/* Talent proof strip */}
      <section className="container pb-16 md:pb-24">
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-8">Talent already moving</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          {talents.slice(0, 8).map((t) => (
            <div
              key={t.id}
              className="shrink-0 w-56 rounded-2xl border border-ink-100 bg-paper-50 p-5 flex flex-col items-center text-center gap-3"
            >
              <Avatar src={t.avatarUrl} name={t.name} size="xl" />
              <div>
                <p className="font-display text-base text-ink">{t.name}</p>
                <p className="text-xs text-ink-500 mt-0.5">{t.headline}</p>
              </div>
              <p className="text-xs text-ink-400">
                {t.location.city}, {t.location.country}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="bg-ink py-24 md:py-32">
        <div className="container text-center">
          <p className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-paper-50 max-w-2xl mx-auto">
            "My skills can take me anywhere."
          </p>
          <Link to="/start" className="inline-block mt-10">
            <Button variant="secondary" size="lg">
              Join Pangea
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="container py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Wordmark />
        <p className="text-sm text-ink-400">© {new Date().getFullYear()} Pangea. Talent without borders.</p>
      </footer>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl text-ink">{value}</p>
      <p className="text-xs text-ink-400 mt-0.5">{label}</p>
    </div>
  );
}
