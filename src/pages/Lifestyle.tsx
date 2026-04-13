import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  Sun, Waves, UtensilsCrossed, Landmark, MapPin, ArrowRight,
  Wind, Thermometer, CloudSun, Snowflake,
  Fish, Bike, Footprints, Mountain, Flag, Sailboat, Trophy, CircleDot, Dribbble
} from "lucide-react";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleSurf from "@/assets/lifestyle-surf.jpg";
import lifestyleGastro from "@/assets/lifestyle-gastro.jpg";
import lifestyleCulture from "@/assets/lifestyle-culture.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";
import lifestyleActivities from "@/assets/lifestyle-activities.jpg";

const activityIcons = [Waves, Fish, Trophy, CircleDot, Bike, Sailboat, Footprints, Mountain, Flag, Dribbble];
const climateIcons = [Sun, Thermometer, CloudSun, Snowflake];

const Lifestyle = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-deep">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px]">
        <img src={lifestyleHero} alt="Silver Coast" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">{t.lifestyle.label}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground max-w-4xl leading-tight mb-6">
            {t.lifestyle.heroHeading}
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl font-light">{t.lifestyle.heroSub}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed font-light">
            {t.lifestyle.intro}
          </p>
        </div>
      </section>

      {/* Climate */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.climateLabel}</span>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{t.lifestyle.climateHeading}</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {t.lifestyle.climateItems.map((item, i) => {
                  const Icon = climateIcons[i];
                  return (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0"><Icon className="h-5 w-5" /></div>
                      <div>
                        <h3 className="text-primary-foreground text-sm font-medium mb-1">{item.title}</h3>
                        <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <img src={lifestyleBeach} alt="Praias do Oeste" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Ericeira</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities & Sport */}
      <section className="py-16 md:py-24 bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.activitiesLabel}</span>
            <h2 className="text-2xl md:text-4xl font-light text-primary-foreground">{t.lifestyle.activitiesHeading}</h2>
          </div>

          {/* Image grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            <div className="relative md:col-span-2">
              <img src={lifestyleSurf} alt="Surf Ericeira" className="w-full h-full object-cover rounded-sm aspect-[16/9]" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Surf · Ericeira & Peniche</p>
              </div>
            </div>
            <div className="relative">
              <img src={lifestyleActivities} alt="Ténis" className="w-full h-full object-cover rounded-sm aspect-[16/9] md:aspect-auto" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Ténis</p>
              </div>
            </div>
          </div>

          {/* Activity items grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.lifestyle.activitiesItems.map((item, i) => {
              const Icon = activityIcons[i] || Waves;
              return (
                <div key={i} className="flex gap-4 items-start p-4 border border-primary-foreground/5 rounded-sm hover:border-gold/20 transition-colors">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0"><Icon className="h-5 w-5" /></div>
                  <div>
                    <h3 className="text-primary-foreground text-sm font-medium mb-1">{item.title}</h3>
                    <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gastronomy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img src={lifestyleGastro} alt="Gastronomia do Oeste" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Gastronomia · Região Oeste</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.gastroLabel}</span>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{t.lifestyle.gastroHeading}</h2>
              <div className="space-y-6">
                {t.lifestyle.gastroItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0"><UtensilsCrossed className="h-5 w-5" /></div>
                    <div>
                      <h3 className="text-primary-foreground text-sm font-medium mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Proximity */}
      <section className="py-16 md:py-24 bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.cultureLabel}</span>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-10">{t.lifestyle.cultureHeading}</h2>
              <div className="space-y-6">
                {t.lifestyle.cultureItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0">
                      {i === 0 ? <MapPin className="h-5 w-5" /> : <Landmark className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="text-primary-foreground text-sm font-medium mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={lifestyleCulture} alt="Ericeira" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Ericeira · Cultura & Vida Social</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-4">{t.lifestyle.closingHeading}</h2>
          <p className="text-primary-foreground/60 text-sm md:text-base max-w-xl mx-auto mb-10 font-light">{t.lifestyle.closingText}</p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3 text-sm tracking-widest uppercase hover:bg-gold/10 transition-all duration-500"
          >
            {t.lifestyle.closingCta}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Lifestyle;
