import { cn } from "@/lib/utils";

export function Wordmark({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "font-display text-xl tracking-tight select-none",
        dark ? "text-paper-50" : "text-ink",
        className
      )}
    >
      Pangea
    </span>
  );
}
