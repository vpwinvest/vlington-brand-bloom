import { useState } from "react";
import { cn, initials } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className={cn("rounded-full object-cover bg-ink-100 shrink-0", sizes[size], className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "rounded-full bg-earth-100 text-earth-700 font-display flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
    >
      {initials(name)}
    </div>
  );
}
