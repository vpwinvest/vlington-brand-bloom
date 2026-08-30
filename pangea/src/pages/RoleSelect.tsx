import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, UserRound } from "lucide-react";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";
import { useAppState } from "@/state/AppStateContext";

export default function RoleSelect() {
  const navigate = useNavigate();
  const { useDemoIdentity } = useAppState();

  function tryDemo(role: "talent" | "company") {
    useDemoIdentity(role);
    navigate(role === "talent" ? "/missions" : "/dashboard");
  }

  return (
    <div className="min-h-screen bg-paper-200 flex flex-col">
      <header className="container flex h-20 items-center">
        <Link to="/">
          <Wordmark />
        </Link>
      </header>

      <main className="flex-1 container flex flex-col justify-center py-10">
        <div className="max-w-lg">
          <h1 className="font-display text-3xl sm:text-4xl text-ink">How are you joining Pangea?</h1>
          <p className="mt-3 text-ink-500">You can always add the other side of your profile later.</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 gap-5 max-w-3xl">
          <RoleCard
            icon={UserRound}
            title="I'm talent"
            body="Discover missions worldwide, apply to the ones that fit, and build a portable reputation."
            onSetup={() => navigate("/onboarding/talent")}
            onDemo={() => tryDemo("talent")}
          />
          <RoleCard
            icon={Briefcase}
            title="I'm a company"
            body="Post missions, recruit vetted talent directly, and manage every mission from one place."
            onSetup={() => navigate("/onboarding/company")}
            onDemo={() => tryDemo("company")}
          />
        </div>
      </main>
    </div>
  );
}

function RoleCard({
  icon: Icon,
  title,
  body,
  onSetup,
  onDemo,
}: {
  icon: typeof UserRound;
  title: string;
  body: string;
  onSetup: () => void;
  onDemo: () => void;
}) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-paper-50 p-6 flex flex-col">
      <div className="h-11 w-11 rounded-full bg-horizon-100 flex items-center justify-center">
        <Icon className="h-5 w-5 text-horizon-600" />
      </div>
      <h2 className="mt-5 font-display text-xl text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-500 flex-1">{body}</p>
      <div className="mt-6 flex flex-col gap-2">
        <Button onClick={onSetup}>
          Set up profile
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={onDemo}>
          Skip with a demo profile
        </Button>
      </div>
    </div>
  );
}
