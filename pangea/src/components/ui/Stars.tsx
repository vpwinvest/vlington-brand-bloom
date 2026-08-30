import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <Star className="h-3.5 w-3.5 fill-horizon-500 text-horizon-500" />
      <span className="text-sm font-medium text-ink-700">{rating.toFixed(1)}</span>
    </span>
  );
}
