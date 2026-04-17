import { Globe } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/i18n/translations";
import { cn } from "@/lib/utils";

interface LanguageOption {
  code: Lang;
  flag: string;
  native: string;
  english: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "pt", flag: "🇵🇹", native: "Português", english: "Portuguese" },
  { code: "en", flag: "🇬🇧", native: "English", english: "English" },
  { code: "fr", flag: "🇫🇷", native: "Français", english: "French" },
  { code: "de", flag: "🇩🇪", native: "Deutsch", english: "German" },
  { code: "it", flag: "🇮🇹", native: "Italiano", english: "Italian" },
  { code: "zh", flag: "🇨🇳", native: "中文", english: "Chinese" },
  { code: "ja", flag: "🇯🇵", native: "日本語", english: "Japanese" },
  { code: "ru", flag: "🇷🇺", native: "Русский", english: "Russian" },
  { code: "uk", flag: "🇺🇦", native: "Українська", english: "Ukrainian" },
  { code: "ar", flag: "🇸🇦", native: "العربية", english: "Arabic" },
  { code: "hi", flag: "🇮🇳", native: "हिन्दी", english: "Hindi" },
];

interface LanguageSwitcherProps {
  variant?: "navbar" | "compact";
}

const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          className={cn(
            "flex items-center gap-1.5 transition-colors duration-300 text-primary-foreground/70 hover:text-gold",
            variant === "compact" ? "text-xs" : "text-sm tracking-wider"
          )}
        >
          <Globe className={variant === "compact" ? "h-4 w-4" : "h-4 w-4"} strokeWidth={1.5} />
          <span className="uppercase">{current.code}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-dark-deep border-primary-foreground/10 text-primary-foreground max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary-foreground/90 text-lg tracking-wider uppercase font-light">
            Select Language
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {LANGUAGES.map((l) => {
            const isActive = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md border transition-all text-left",
                  isActive
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-primary-foreground/10 hover:border-gold/50 hover:bg-primary-foreground/5 text-primary-foreground/80"
                )}
              >
                <span className="text-2xl leading-none" aria-hidden>
                  {l.flag}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{l.native}</span>
                  <span className="text-[10px] uppercase tracking-wider opacity-60">
                    {l.english}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSwitcher;
