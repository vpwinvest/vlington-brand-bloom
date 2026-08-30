import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Chip({ label, active, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-ink text-paper-50 border-ink"
          : "bg-transparent text-ink-600 border-ink-200 hover:border-ink-400",
        className
      )}
    >
      {label}
    </button>
  );
}
