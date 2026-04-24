import aboutBg from "@/assets/about-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="bg-background pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
      aria-label="Sobre VLINGTON Properties — Comprar imóveis de luxo em Portugal | Buy property Portugal Silver Coast"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 items-center">
          <div>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-light">
              {t.about.label}
            </p>
             <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-light text-foreground mb-5 md:mb-6 leading-[1.15]">
              {t.about.heading1}
              <span className="text-gradient-gold block">{t.about.heading2}</span>
            </h2>
            <div className="w-12 h-px bg-gold/40 mb-5 md:mb-6" />
            <p className="text-muted-foreground leading-[1.65] md:leading-[1.7] font-light mb-4 text-[15px] md:text-base">
              {t.about.p1}
            </p>
            <p className="text-muted-foreground leading-[1.65] md:leading-[1.7] font-light mb-6 md:mb-7 text-[15px] md:text-base">
              {t.about.p2}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-4 md:gap-x-5 md:gap-y-0">
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">20+</span>
                <p className="text-[10px] md:text-[10px] lg:text-xs tracking-[0.18em] lg:tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat1}
                </p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">20M€+</span>
                <p className="text-[10px] md:text-[10px] lg:text-xs tracking-[0.18em] lg:tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat2}
                </p>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-light text-gradient-gold">101%</span>
                <p className="text-[10px] md:text-[10px] lg:text-xs tracking-[0.18em] lg:tracking-[0.25em] uppercase text-muted-foreground mt-1 font-light">
                  {t.about.stat3}
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-4 md:mt-0 md:ml-6">
            <img
              src={aboutBg}
              alt="Casa de luxo em Portugal — interior arquitetura contemporânea VLINGTON | Luxury home Portugal Silver Coast"
              className="w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[430px] xl:h-[500px] object-cover"
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

