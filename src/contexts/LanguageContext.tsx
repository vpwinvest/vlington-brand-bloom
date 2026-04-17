import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type Translations } from "@/i18n/translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGS: Lang[] = ["pt", "en", "zh", "fr", "de", "ja", "it", "uk", "ru", "ar", "hi"];
const RTL_LANGS: Lang[] = ["ar"];
const STORAGE_KEY = "vlington-lang";

const detectBrowserLang = (): Lang => {
  if (typeof navigator === "undefined") return "pt";
  const candidates = [
    ...(navigator.languages || []),
    navigator.language,
  ].filter(Boolean);

  for (const raw of candidates) {
    const lower = raw.toLowerCase();
    // Direct match for primary subtag (e.g. "pt", "en", "zh")
    const primary = lower.split("-")[0] as Lang;
    if (SUPPORTED_LANGS.includes(primary)) {
      // Special: zh-tw / zh-hk fall back to zh (Simplified) — acceptable
      return primary;
    }
  }
  return "pt";
};

const applyHtmlAttributes = (lang: Lang) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
    const detected = detectBrowserLang();
    // Persist the auto-detected choice so subsequent visits respect it
    localStorage.setItem(STORAGE_KEY, detected);
    return detected;
  });

  useEffect(() => {
    applyHtmlAttributes(lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export { SUPPORTED_LANGS, RTL_LANGS };
