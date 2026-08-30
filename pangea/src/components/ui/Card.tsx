import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl bg-paper-50 border border-ink-100 shadow-card", className)}
      {...props}
    />
  );
}
