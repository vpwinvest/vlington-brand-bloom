import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { FAQ_INVESTORS_PT, FAQ_INVESTORS_EN, buildFAQSchema } from "@/lib/seo-schemas";
import { getAboutSeoContent } from "@/i18n/seoContent";

const FAQ = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);
  const faqs = lang === "pt" ? FAQ_INVESTORS_PT : FAQ_INVESTORS_EN;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        path="/faq"
        titlePt="FAQ — Comprar e Investir em Imóveis em Portugal | VLINGTON"
        titleEn="FAQ — Buying and Investing in Property in Portugal | VLINGTON"
        descriptionPt="Perguntas frequentes sobre comprar casa em Portugal: Golden Visa, NHR, D7, processo de compra para estrangeiros, fiscalidade e investimento imobiliário na Costa de Prata."
        descriptionEn="Frequently asked questions about buying property in Portugal: Golden Visa, NHR, D7, purchase process for foreigners, taxation and real estate investment on the Silver Coast."
        jsonLd={buildFAQSchema(lang)}
      />
      <Navbar />

      <main className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-light mb-6">
              FAQ
            </p>
            <h1 className="text-3xl md:text-5xl font-light text-foreground leading-[1.15] mb-6">
              {seo.faqHeading}
            </h1>
            <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />
            <p className="text-foreground/75 text-base md:text-lg leading-[1.85] max-w-2xl mx-auto">
              {seo.faqIntro}
            </p>
          </div>

          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              const panelId = `faq-item-${i}`;
              const buttonId = `faq-trigger-${i}`;
              return (
                <div key={i}>
                  <h2 className="m-0">
                    <button
                      id={buttonId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="w-full flex items-start justify-between gap-6 py-6 text-left group focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <span className="text-base md:text-lg text-foreground font-medium leading-snug group-hover:text-gold group-focus-visible:text-gold transition-colors">
                        {faq.q}
                      </span>
                      <span className="shrink-0 mt-1 text-gold" aria-hidden="true">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                    </button>
                  </h2>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="pb-6 pr-10 animate-fade-in"
                    >
                      <p className="text-foreground/80 text-base leading-[1.85]">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FAQ;
