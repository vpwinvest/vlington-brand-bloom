import { NavLink } from "react-router-dom";
import { Compass, Users, LayoutGrid, CircleUserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/missions", label: "Missions", icon: Compass },
  { to: "/talent", label: "Talent", icon: Users },
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/profile", label: "Profile", icon: CircleUserRound },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink-100 bg-paper-50/95 backdrop-blur pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="flex items-stretch justify-between px-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                isActive ? "text-ink" : "text-ink-400"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
