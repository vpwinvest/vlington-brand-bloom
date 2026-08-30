import type { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper-200">
      <Header />
      <main className="pb-24 md:pb-12">{children}</main>
      <BottomNav />
    </div>
  );
}
