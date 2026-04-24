import aboutBg from "@/assets/about-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAboutSeoContent } from "@/i18n/seoContent";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutSection = () => {
  const { t, lang } = useLanguage();
  const seo = getAboutSeoContent(lang);

  return (
    <section
      id="about"
      className="bg-background"
      aria-label="Sobre VLINGTON Properties — Comprar imóveis de luxo em Portugal | Buy property Portugal Silver Coast"
    >
      {/* ============= INTRO / BRAND ============= */}
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
                {t.about.label}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
                {t.about.heading1}
                <span className="text-gradient-gold block">{t.about.heading2}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.about.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                {t.about.p2}
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="text-3xl font-bold text-gradient-gold">20+</span>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {t.about.stat1}
                  </p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gradient-gold">20M€+</span>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {t.about.stat2}
                  </p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gradient-gold">101%</span>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {t.about.stat3}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src={aboutBg}
                alt="Casa de luxo em Portugal — interior arquitetura contemporânea VLINGTON | Luxury home Portugal Silver Coast"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                width={800}
                height={500}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ============= SEO TEASER (single block) ============= */}
      <div className="bg-dark-deep text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
            {seo.sectionLabel}
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight leading-[1.15] mb-10">
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
      </div>
    </section>
  );
};

export default AboutSection;
