import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAboutSeoContent } from "@/i18n/seoContent";

const InvestTeaserSection = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);

  return (
    <section
      id="invest-teaser"
      className="bg-dark-deep text-primary-foreground py-24 md:py-32"
      aria-label="Invest in Portugal — Silver Coast property investment"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">
          {seo.sectionLabel}
        </p>
        <h2 className="text-3xl md:text-5xl font-light leading-[1.15] mb-10">
          {seo.h2Invest}
        </h2>
        <div className="w-12 h-px bg-gold/40 mb-10" />
        <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light mb-6 max-w-3xl">
          {seo.investP1}
        </p>
        <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light max-w-3xl mb-12">
          {seo.investP2}
        </p>

        <Link
          to="/investir"
          className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-gold/10 transition-all duration-500"
        >
          {lang === "en" ? "Discover the Silver Coast" : "Descobrir a Costa de Prata"}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default InvestTeaserSection;
