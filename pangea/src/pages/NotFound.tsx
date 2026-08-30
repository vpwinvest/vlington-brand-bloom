import { Link } from "react-router-dom";
import { Wordmark } from "@/components/layout/Wordmark";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper-200 flex flex-col items-center justify-center gap-6 text-center px-6">
      <Wordmark />
      <div>
        <h1 className="font-display text-3xl text-ink">This mission doesn't exist.</h1>
        <p className="mt-2 text-ink-500">The page you're looking for wandered off somewhere.</p>
      </div>
      <Link to="/">
        <Button>Back to Pangea</Button>
      </Link>
    </div>
  );
}
