import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import lifestyleHero from "@/assets/lifestyle-hero.jpg";

const LifestyleSection = () => {
  const { t } = useLanguage();

  return (
    <section id="lifestyle" className="relative py-0">
      <div className="relative h-screen min-h-[700px] overflow-hidden">
        <img
          src={lifestyleHero}
          alt="Silver Coast Portugal"
          className="w-full h-full object-cover"
          loading="lazy"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-6 text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-light">
            {t.lifestyle.label}
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-primary-foreground max-w-3xl leading-tight mb-4">
            {t.lifestyle.heroSub}
          </h2>
          <p className="text-primary-foreground/60 text-sm md:text-base max-w-xl mb-8 font-light">
            {t.lifestyle.heroHeading}
          </p>
          <Link
            to="/lifestyle"
            className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-500"
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
