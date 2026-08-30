import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { useAppState } from "@/state/AppStateContext";

export default function CompanyOnboarding() {
  const navigate = useNavigate();
  const { saveCompanyProfile, currentCompany } = useAppState();

  const [name, setName] = useState(currentCompany?.name ?? "");
  const [industry, setIndustry] = useState(currentCompany?.industry ?? "");
  const [bio, setBio] = useState(currentCompany?.bio ?? "");
  const [city, setCity] = useState(currentCompany?.location.city ?? "");
  const [country, setCountry] = useState(currentCompany?.location.country ?? "");
  const [website, setWebsite] = useState(currentCompany?.website ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    saveCompanyProfile({
      name: name || "New Company",
      logoUrl: currentCompany?.logoUrl ?? `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(name || "pangea-company")}&backgroundColor=1F5F49`,
      industry: industry || "General",
      bio,
      location: { city: city || "Remote", country: country || "Global", countryCode: "XX" },
      website,
    });
    navigate("/dashboard");
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
        <h1 className="font-display text-3xl text-ink">Set up your company</h1>
        <p className="mt-2 text-ink-500">This is what talent sees on every mission you post.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <Field label="Company name">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Aurora Renewables" required />
          </Field>

          <Field label="Industry">
            <Input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Renewable Energy"
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="City">
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Nairobi" />
            </Field>
            <Field label="Country">
              <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Kenya" />
            </Field>
          </div>

          <Field label="About">
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="What kind of missions do you post?"
            />
          </Field>

          <Field label="Website">
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="company.example" />
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
