import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "horizon" | "earth" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-ink-100 text-ink-700",
  horizon: "bg-horizon-100 text-horizon-700",
  earth: "bg-earth-100 text-earth-700",
  outline: "border border-ink-200 text-ink-600",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
