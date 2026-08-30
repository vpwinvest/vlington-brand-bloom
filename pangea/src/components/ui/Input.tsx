import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-12 w-full rounded-xl border border-ink-200 bg-paper-50 px-4 text-[15px] text-ink placeholder:text-ink-400 outline-none transition-colors focus:border-ink-400",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-ink-200 bg-paper-50 px-4 py-3 text-[15px] text-ink placeholder:text-ink-400 outline-none transition-colors focus:border-ink-400 resize-none",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
