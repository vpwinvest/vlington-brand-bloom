import aboutBg from "@/assets/about-hero.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAboutSeoContent } from "@/i18n/seoContent";
import { Check, MapPin, Users, Workflow } from "lucide-react";

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

      {/* ============= SEO LONG-FORM CONTENT ============= */}
      <div className="bg-dark-deep text-primary-foreground py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
            {seo.sectionLabel}
          </p>

          {/* H2 #1 — Buy property Portugal */}
          <h2 className="text-3xl md:text-5xl font-extralight leading-[1.15] mb-10">
            {seo.h2Invest}
          </h2>
          <div className="w-12 h-px bg-gold/40 mb-10" />
          <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light mb-6 max-w-3xl">
            {seo.investP1}
          </p>
          <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light max-w-3xl">
            {seo.investP2}
          </p>
        </div>
      </div>

      {/* ============= H2 #2 — Why invest ============= */}
      <div className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                {seo.h2Why}
              </h2>
              <div className="w-10 h-px bg-gold/60 mb-8" />
              <p className="text-muted-foreground leading-[1.85] mb-6">
                {seo.whyP1}
              </p>
              <p className="text-muted-foreground leading-[1.85]">
                {seo.whyP2}
              </p>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-6">
                {seo.whyBullets.map((b, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-foreground font-semibold mb-1">{b.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============= H2 #3 — Silver Coast ============= */}
      <div className="bg-dark/40 border-y border-gold/10 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight max-w-3xl">
            {seo.h2Coast}
          </h2>
          <div className="w-10 h-px bg-gold/60 mb-8" />
          <p className="text-muted-foreground leading-[1.85] mb-6 max-w-3xl">
            {seo.coastP1}
          </p>
          <p className="text-muted-foreground leading-[1.85] mb-12 max-w-3xl">
            {seo.coastP2}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seo.coastTowns.map((town, i) => (
              <div
                key={i}
                className="border border-gold/15 rounded-sm p-7 hover:border-gold/40 transition-colors duration-500"
              >
                <MapPin className="h-5 w-5 text-gold mb-4" strokeWidth={1.4} />
                <h3 className="text-foreground text-lg font-semibold mb-2">{town.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{town.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============= H2 #4 — Lifestyle ============= */}
      <div className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            {seo.h2Lifestyle}
          </h2>
          <div className="w-10 h-px bg-gold/60 mb-8" />
          <p className="text-muted-foreground leading-[1.85] mb-6">
            {seo.lifestyleP1}
          </p>
          <p className="text-muted-foreground leading-[1.85]">
            {seo.lifestyleP2}
          </p>
        </div>
      </div>

      {/* ============= H2 #5 — Who for ============= */}
      <div className="bg-dark/40 border-y border-gold/10 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Users className="h-7 w-7 text-gold mx-auto mb-6" strokeWidth={1.4} />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {seo.h2WhoFor}
            </h2>
            <p className="text-muted-foreground leading-[1.85]">{seo.whoForIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {seo.whoForItems.map((item, i) => (
              <div
                key={i}
                className="border border-gold/15 rounded-sm p-7 hover:border-gold/40 transition-colors duration-500 bg-background"
              >
                <h3 className="text-foreground text-base font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============= H2 #6 — Process ============= */}
      <div className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Workflow className="h-7 w-7 text-gold mb-6" strokeWidth={1.4} />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                {seo.h2Process}
              </h2>
              <div className="w-10 h-px bg-gold/60 mb-8" />
              <p className="text-muted-foreground leading-[1.85]">{seo.processP1}</p>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-5">
                {seo.processSteps.map((s, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-gold/40 pl-5 py-2 hover:border-gold transition-colors"
                  >
                    <h3 className="text-foreground font-semibold mb-1">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
