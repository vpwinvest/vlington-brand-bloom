import aboutBg from "@/assets/about-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
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
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">{t.about.stat1}</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient-gold">20M€+</span>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">{t.about.stat2}</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient-gold">101%</span>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">{t.about.stat3}</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <img
              src={aboutBg}
              alt="Modern luxury interior"
              className="w-full h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
