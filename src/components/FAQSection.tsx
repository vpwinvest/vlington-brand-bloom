import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FAQ_INVESTORS_PT, FAQ_INVESTORS_EN } from "@/lib/seo-schemas";
import { getAboutSeoContent } from "@/i18n/seoContent";

const FAQSection = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);
  const faqs = lang === "pt" ? FAQ_INVESTORS_PT : FAQ_INVESTORS_EN;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-dark-deep text-primary-foreground"
      aria-label="Frequently asked questions about buying property in Portugal"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-extralight leading-[1.15] mb-6">
            {seo.faqHeading}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
          <p className="text-primary-foreground/70 text-base md:text-lg font-light max-w-2xl mx-auto leading-[1.85]">
            {seo.faqIntro}
          </p>
        </div>

        <div className="divide-y divide-gold/15 border-y border-gold/15">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base md:text-lg text-primary-foreground font-light leading-snug group-hover:text-gold transition-colors">
                    {faq.q}
                  </h3>
                  <span className="shrink-0 mt-1 text-gold">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-10">
                    <p className="text-primary-foreground/65 text-sm md:text-base leading-[1.85] font-light">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
