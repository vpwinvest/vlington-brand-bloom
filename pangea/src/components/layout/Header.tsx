import { NavLink, useNavigate } from "react-router-dom";
import { Compass, Users, LayoutGrid } from "lucide-react";
import { Wordmark } from "./Wordmark";
import { Avatar } from "@/components/ui/Avatar";
import { useAppState } from "@/state/AppStateContext";
import { cn } from "@/lib/utils";

const links = [
  { to: "/missions", label: "Missions", icon: Compass },
  { to: "/talent", label: "Talent", icon: Users },
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
];

export function Header() {
  const { role, currentTalent, currentCompany } = useAppState();
  const navigate = useNavigate();
  const identity = role === "talent" ? currentTalent : currentCompany;

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-paper-100/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <NavLink to="/missions" className="flex items-center gap-2">
          <Wordmark />
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-ink text-paper-50" : "text-ink-600 hover:bg-ink-50"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 rounded-full border border-ink-100 py-1 pl-1 pr-3 hover:border-ink-300 transition-colors"
        >
          <Avatar
            src={"avatarUrl" in (identity ?? {}) ? (identity as { avatarUrl: string }).avatarUrl : (identity as { logoUrl?: string })?.logoUrl}
            name={identity?.name ?? "You"}
            size="sm"
          />
          <span className="hidden sm:inline text-sm font-medium text-ink-700 max-w-[8rem] truncate">
            {identity?.name ?? "You"}
          </span>
        </button>
      </div>
    </header>
  );
}
