import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import lifestyleHero from "@/assets/lifestyle-hero.jpg";

const LifestyleSection = () => {
  const { t } = useLanguage();

  return (
    <section id="lifestyle" className="relative py-0">
      <div className="relative h-[calc(100svh-56px)] min-h-[560px] md:min-h-[700px] overflow-hidden">
        <img
          src={lifestyleHero}
          alt="Costa de Prata Portugal — Silver Coast lifestyle: surf em Ericeira e Peniche, praias de Baleal e Areia Branca, golf, ténis, equitação e natureza junto ao mar"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 px-6 text-center">
          <span className="text-gold text-[10px] md:text-xs tracking-[0.3em] uppercase mb-3 md:mb-4 font-light">
            {t.lifestyle.label}
          </span>
          <h2 className="text-2xl md:text-5xl font-light text-primary-foreground max-w-3xl leading-tight mb-3 md:mb-4">
            {t.lifestyle.heroHeading}
          </h2>
          <p className="text-gold/80 text-[10px] md:text-sm tracking-[0.25em] uppercase mb-6 md:mb-8 font-light">
            {t.lifestyle.heroH2}
          </p>
          <Link
            to="/lifestyle"
            className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-6 md:px-8 py-3 text-xs md:text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-500"
          >
            {t.lifestyleSection.cta}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
