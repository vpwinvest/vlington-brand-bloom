import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FAQ_INVESTORS_PT, FAQ_INVESTORS_EN } from "@/lib/seo-schemas";
import { getAboutSeoContent } from "@/i18n/seoContent";

const FAQSection = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);
  const faqs = lang === "pt" ? FAQ_INVESTORS_PT : FAQ_INVESTORS_EN;
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="faq"
      className="py-16 md:py-20 bg-background"
      aria-label="Frequently asked questions about buying property in Portugal"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="faq-panel"
          className="w-full flex items-center justify-between gap-6 py-4 border-y border-gold/20 group focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          <div className="flex items-center gap-4 text-left">
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-light">
              FAQ
            </span>
            <span className="text-foreground text-sm md:text-base font-light group-hover:text-gold group-focus-visible:text-gold transition-colors">
              {seo.faqHeading}
            </span>
          </div>
          <span className="shrink-0 text-gold" aria-hidden="true">
            {expanded ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>

        {expanded && (
          <div id="faq-panel" role="region" aria-label="FAQ" className="pt-6 animate-fade-in">
            <p className="text-muted-foreground text-sm md:text-base font-light leading-[1.85] mb-6">
              {seo.faqIntro}
            </p>
            <div className="divide-y divide-gold/15 border-y border-gold/15">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                const panelId = `faq-item-${i}`;
                const buttonId = `faq-trigger-${i}`;
                return (
                  <div key={i}>
                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="w-full flex items-start justify-between gap-6 py-4 text-left group focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                      >
                        <span className="text-sm md:text-base text-foreground font-light leading-snug group-hover:text-gold group-focus-visible:text-gold transition-colors">
                          {faq.q}
                        </span>
                        <span className="shrink-0 mt-1 text-gold" aria-hidden="true">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="pb-5 pr-10"
                      >
                        <p className="text-muted-foreground text-sm leading-[1.85] font-light">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
