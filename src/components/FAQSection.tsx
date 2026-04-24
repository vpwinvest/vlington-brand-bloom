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
          className="w-full flex items-center justify-between gap-6 py-4 border-y border-gold/20 group"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-4 text-left">
            <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-light">
              FAQ
            </span>
            <span className="text-foreground text-sm md:text-base font-light group-hover:text-gold transition-colors">
              {seo.faqHeading}
            </span>
          </div>
          <span className="shrink-0 text-gold">
            {expanded ? <Minus size={18} /> : <Plus size={18} />}
          </span>
        </button>

        {expanded && (
          <div className="pt-6 animate-fade-in">
            <p className="text-muted-foreground text-sm md:text-base font-light leading-[1.85] mb-6">
              {seo.faqIntro}
            </p>
            <div className="divide-y divide-gold/15 border-y border-gold/15">
              {faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-4 text-left group"
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-sm md:text-base text-foreground font-light leading-snug group-hover:text-gold transition-colors">
                        {faq.q}
                      </h3>
                      <span className="shrink-0 mt-1 text-gold">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-5 pr-10">
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
