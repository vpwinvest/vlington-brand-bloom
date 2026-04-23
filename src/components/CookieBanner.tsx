import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const STORAGE_KEY = "vlington-cookie-consent";

type Consent = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (consent: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* noop */
    }
    setVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => persist({ essential: true, analytics: true, marketing: true, ts: Date.now() });
  const rejectAll = () => persist({ essential: true, analytics: false, marketing: false, ts: Date.now() });
  const saveCustom = () => persist({ essential: true, analytics, marketing, ts: Date.now() });

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6"
    >
      <div className="max-w-5xl mx-auto bg-dark-deep/95 backdrop-blur-md border border-gold/20 rounded-sm shadow-2xl">
        {!showSettings ? (
          <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <p className="text-primary-foreground/80 text-xs md:text-sm leading-relaxed flex-1 font-light">
              {t.footer.cookieMsg}{" "}
              <Link to="/politica-privacidade" className="text-gold hover:underline">
                {t.footer.privacy}
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="text-primary-foreground/70 hover:text-gold text-xs tracking-wider uppercase px-4 py-2 border border-primary-foreground/20 hover:border-gold/40 transition-colors"
              >
                {t.footer.cookieSettings}
              </button>
              <button
                onClick={rejectAll}
                className="text-primary-foreground/70 hover:text-gold text-xs tracking-wider uppercase px-4 py-2 border border-primary-foreground/20 hover:border-gold/40 transition-colors"
              >
                {t.footer.cookieReject}
              </button>
              <button
                onClick={acceptAll}
                className="text-dark-deep bg-gold hover:bg-gold/90 text-xs tracking-wider uppercase px-4 py-2 transition-colors"
              >
                {t.footer.cookieAccept}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-primary-foreground text-sm tracking-wider uppercase">
                {t.footer.cookieSettings}
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                aria-label="Close"
                className="text-primary-foreground/50 hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary-foreground/10">
                <div>
                  <p className="text-primary-foreground text-xs font-medium mb-1">{t.footer.cookieEssential}</p>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{t.footer.cookieEssentialDesc}</p>
                </div>
                <span className="text-gold text-xs tracking-wider uppercase shrink-0">✓</span>
              </div>
              {/* Analytics */}
              <label className="flex items-start justify-between gap-4 pb-4 border-b border-primary-foreground/10 cursor-pointer">
                <div>
                  <p className="text-primary-foreground text-xs font-medium mb-1">{t.footer.cookieAnalytics}</p>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{t.footer.cookieAnalyticsDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="accent-gold mt-1"
                />
              </label>
              {/* Marketing */}
              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-primary-foreground text-xs font-medium mb-1">{t.footer.cookieMarketing}</p>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{t.footer.cookieMarketingDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="accent-gold mt-1"
                />
              </label>
            </div>
            <div className="flex flex-wrap justify-end gap-2 md:gap-3 mt-6">
              <button
                onClick={rejectAll}
                className="text-primary-foreground/70 hover:text-gold text-xs tracking-wider uppercase px-4 py-2 border border-primary-foreground/20 hover:border-gold/40 transition-colors"
              >
                {t.footer.cookieReject}
              </button>
              <button
                onClick={saveCustom}
                className="text-dark-deep bg-gold hover:bg-gold/90 text-xs tracking-wider uppercase px-4 py-2 transition-colors"
              >
                {t.footer.cookieSave}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
