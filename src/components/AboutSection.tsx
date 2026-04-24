import aboutBg from "@/assets/about-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="bg-background pt-6 pb-16 md:pt-10 md:pb-24"
      aria-label="Sobre VLINGTON Properties — Comprar imóveis de luxo em Portugal | Buy property Portugal Silver Coast"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-5 font-light">
              {t.about.label}
            </p>
            <h2 className="text-2xl md:text-5xl font-light text-foreground mb-6 md:mb-8 leading-[1.2]">
              {t.about.heading1}
              <span className="text-gradient-gold block">{t.about.heading2}</span>
            </h2>
            <div className="w-12 h-px bg-gold/40 mb-6 md:mb-8" />
            <p className="text-muted-foreground leading-[1.85] font-light mb-5 text-[15px] md:text-base">
              {t.about.p1}
            </p>
            <p className="text-muted-foreground leading-[1.85] font-light mb-8 md:mb-10 text-[15px] md:text-base">
              {t.about.p2}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-12">
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">20+</span>
                <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat1}
                </p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">20M€+</span>
                <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat2}
                </p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">101%</span>
                <p className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat3}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-4 md:mt-0 md:ml-6">
            <img
              src={aboutBg}
              alt="Casa de luxo em Portugal — interior arquitetura contemporânea VLINGTON | Luxury home Portugal Silver Coast"
              className="w-full h-[280px] sm:h-[360px] md:h-[500px] object-cover"
              loading="lazy"
              width={800}
              height={500}
            />
            <div className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 w-16 h-16 md:w-32 md:h-32 border border-gold/30 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

