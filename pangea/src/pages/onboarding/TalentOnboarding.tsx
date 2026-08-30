import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";
import { useAppState } from "@/state/AppStateContext";
import type { Availability } from "@/types";

const SKILL_OPTIONS = [
  "Solar PV Design",
  "Expedition Medicine",
  "Cinematography",
  "Menu Development",
  "Precision Irrigation",
  "Critical Care",
  "Structural Design",
  "Coral Restoration",
  "Event Production",
  "Site Engineering",
  "Vessel Operations",
  "Project Management",
];

const AVAILABILITY: { value: Availability; label: string }[] = [
  { value: "available", label: "Available now" },
  { value: "open", label: "Open to offers" },
  { value: "unavailable", label: "Not available" },
];

export default function TalentOnboarding() {
  const navigate = useNavigate();
  const { saveTalentProfile, currentTalent } = useAppState();

  const [name, setName] = useState(currentTalent?.name ?? "");
  const [headline, setHeadline] = useState(currentTalent?.headline ?? "");
  const [bio, setBio] = useState(currentTalent?.bio ?? "");
  const [city, setCity] = useState(currentTalent?.location.city ?? "");
  const [country, setCountry] = useState(currentTalent?.location.country ?? "");
  const [skills, setSkills] = useState<string[]>(currentTalent?.skills ?? []);
  const [years, setYears] = useState(currentTalent?.yearsExperience?.toString() ?? "");
  const [rate, setRate] = useState(currentTalent?.dayRateUsd?.toString() ?? "");
  const [availability, setAvailability] = useState<Availability>(currentTalent?.availability ?? "available");
  const [languages, setLanguages] = useState(currentTalent?.languages?.join(", ") ?? "");

  function toggleSkill(skill: string) {
    setSkills((s) => (s.includes(skill) ? s.filter((x) => x !== skill) : [...s, skill]));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveTalentProfile({
      name: name || "New Talent",
      avatarUrl: currentTalent?.avatarUrl ?? `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name || "pangea-talent")}&backgroundColor=FFE3CC`,
      headline: headline || "Mission-ready specialist",
      bio,
      location: { city: city || "Remote", country: country || "Global", countryCode: "XX" },
      skills: skills.length ? skills : ["Generalist"],
      languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
      yearsExperience: Number(years) || 0,
      availability,
      dayRateUsd: Number(rate) || 0,
    });
    navigate("/missions");
  }

  return (
    <div className="min-h-screen bg-paper-200">
      <header className="container flex h-20 items-center justify-between">
        <Link to="/start" className="flex items-center gap-2 text-ink-500 hover:text-ink">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </Link>
        <Wordmark />
      </header>

      <main className="container max-w-xl pb-16">
        <h1 className="font-display text-3xl text-ink">Build your talent profile</h1>
        <p className="mt-2 text-ink-500">This is what companies see when they discover you.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <Field label="Full name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Amara Osei" required />
          </Field>

          <Field label="Headline">
            <Input
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Solar microgrid engineer"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="City">
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Accra" />
            </Field>
            <Field label="Country">
              <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ghana" />
            </Field>
          </div>

          <Field label="About">
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="What kind of missions are you great at?"
            />
          </Field>

          <Field label="Skills">
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <Chip key={skill} label={skill} active={skills.includes(skill)} onClick={() => toggleSkill(skill)} />
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Years of experience">
              <Input type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)} />
            </Field>
            <Field label="Day rate (USD)">
              <Input type="number" min={0} value={rate} onChange={(e) => setRate(e.target.value)} />
            </Field>
          </div>

          <Field label="Languages">
            <Input
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              placeholder="English, French"
            />
          </Field>

          <Field label="Availability">
            <div className="flex gap-2">
              {AVAILABILITY.map((a) => (
                <Chip
                  key={a.value}
                  label={a.label}
                  active={availability === a.value}
                  onClick={() => setAvailability(a.value)}
                />
              ))}
            </div>
          </Field>

          <Button type="submit" size="lg" className="mt-2">
            Enter Pangea
          </Button>
        </form>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-ink-600 mb-2">{label}</span>
      {children}
    </label>
  );
}
