import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper-50 hover:bg-ink-800 active:bg-ink-700",
  secondary: "bg-horizon-500 text-paper-50 hover:bg-horizon-600 active:bg-horizon-700",
  outline: "border border-ink-200 text-ink bg-transparent hover:bg-ink-50",
  ghost: "text-ink bg-transparent hover:bg-ink-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-full",
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-13 px-7 text-base rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none whitespace-nowrap",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
