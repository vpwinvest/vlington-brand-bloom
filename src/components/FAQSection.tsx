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
      className="py-24 md:py-28 bg-background"
      aria-label="Frequently asked questions about buying property in Portugal"
    >
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-light mb-4">
            FAQ
          </p>
          <h2 className="text-2xl md:text-3xl font-normal text-foreground leading-snug">
            {seo.faqHeading}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls="faq-panel"
          className="w-full flex items-center justify-between gap-6 py-5 px-6 bg-foreground/5 hover:bg-foreground/[0.07] border border-foreground/10 group focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
        >
          <span className="text-foreground text-sm md:text-base font-medium tracking-wide">
            {expanded
              ? lang === "en" ? "Hide questions" : "Ocultar perguntas"
              : lang === "en" ? "View frequently asked questions" : "Ver perguntas frequentes"}
          </span>
          <span className="shrink-0 text-gold" aria-hidden="true">
            {expanded ? <Minus size={20} /> : <Plus size={20} />}
          </span>
        </button>

        {expanded && (
          <div
            id="faq-panel"
            role="region"
            aria-label="FAQ"
            className="mt-8 animate-fade-in"
          >
            <p className="text-foreground/80 text-base leading-[1.8] mb-8">
              {seo.faqIntro}
            </p>
            <div className="divide-y divide-foreground/10 border-y border-foreground/10">
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
                        className="w-full flex items-start justify-between gap-6 py-5 text-left group focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="text-base md:text-lg text-foreground font-medium leading-snug group-hover:text-gold group-focus-visible:text-gold transition-colors">
                          {faq.q}
                        </span>
                        <span className="shrink-0 mt-1 text-gold" aria-hidden="true">
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className="pb-6 pr-10 animate-fade-in"
                      >
                        <p className="text-foreground/85 text-base leading-[1.85]">
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
