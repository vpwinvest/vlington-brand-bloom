import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import {
  Sun, UtensilsCrossed, Landmark, MapPin, ArrowRight,
  Thermometer, CloudSun, Snowflake, GraduationCap,
  Heart, Shield, Wallet, Globe2, Stethoscope, TramFront, Plane,
} from "lucide-react";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleSurf from "@/assets/lifestyle-surf.jpg";
import lifestyleGastro from "@/assets/lifestyle-gastro.jpg";
import lifestyleCulture from "@/assets/lifestyle-culture.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";
import lifestyleActivities from "@/assets/lifestyle-activities.jpg";
import lifestyleEducation from "@/assets/lifestyle-education.jpg";

import actSurf from "@/assets/activities/surf-ericeira.jpg";
import actGolf from "@/assets/activities/golf-praia-del-rey.jpg";
import actTenis from "@/assets/activities/tenis-padel.jpg";
import actEquitacao from "@/assets/activities/equitacao-portonovo.jpg";
import actCiclismo from "@/assets/activities/ciclismo.jpg";
import actHiking from "@/assets/activities/hiking-montejunto.jpg";

const activityImages = [actSurf, actGolf, actTenis, actEquitacao, actCiclismo, actHiking];
const climateIcons = [Sun, Thermometer, CloudSun, Snowflake];
const qualityIcons = [Shield, Sun, Wallet, Heart];
const locationIcons = [Globe2, Plane, MapPin];
const servicesIcons = [Stethoscope, GraduationCap, TramFront, Shield];

const Lifestyle = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen bg-dark-deep">
      <SEO
        path="/lifestyle"
        titlePt="Porquê viver em Portugal — Think Beyond | VLINGTON Lifestyle"
        titleEn="Why Live in Portugal — Think Beyond | VLINGTON Lifestyle"
        descriptionPt="Hospitalidade, qualidade de vida, segurança, clima e localização estratégica. Descubra porque Portugal é o destino ideal para viver."
        descriptionEn="Hospitality, quality of life, safety, climate and strategic location. Discover why Portugal is the ideal destination to live."
        jsonLd={buildBreadcrumbs([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: "Lifestyle", path: "/lifestyle" },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[600px]">
        <img src={lifestyleHero} alt="Portugal — Silver Coast" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-6 font-light">{t.lifestyle.label}</span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground max-w-4xl leading-tight mb-4">
            {t.lifestyle.heroHeading}
          </h1>
          <h2 className="text-lg md:text-2xl font-light text-gold tracking-[0.2em] mb-6 uppercase">
            {t.lifestyle.heroH2}
          </h2>
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

      {/* Think Beyond */}
      <section className="py-20 md:py-28 bg-dark/50 border-y border-gold/10">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-6 block font-light">{t.lifestyle.thinkBeyondLabel}</span>
          <h2 className="text-3xl md:text-5xl font-light text-primary-foreground mb-8 leading-tight">
            {t.lifestyle.thinkBeyondHeading}
          </h2>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed font-light">
            {t.lifestyle.thinkBeyondText}
          </p>
        </div>
      </section>

      {/* Hospitality */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.hospitalityLabel}</span>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-8">{t.lifestyle.hospitalityHeading}</h2>
              <p className="text-primary-foreground/60 text-sm md:text-base leading-relaxed font-light">
                {t.lifestyle.hospitalityText}
              </p>
            </div>
            <div className="relative">
              <img src={lifestyleCulture} alt="Hospitalidade portuguesa" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality of Life */}
      <section className="py-16 md:py-24 bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.qualityLifeLabel}</span>
            <h2 className="text-2xl md:text-4xl font-light text-primary-foreground max-w-3xl mx-auto">{t.lifestyle.qualityLifeHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {t.lifestyle.qualityLifeItems.map((item, i) => {
              const Icon = qualityIcons[i];
              return (
                <div key={i} className="border border-primary-foreground/10 rounded-sm p-6 hover:border-gold/30 transition-colors duration-500">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold inline-flex mb-4"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-primary-foreground text-sm font-medium mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
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

      {/* Outdoor & Sport (reduced) */}
      <section className="py-16 md:py-24 bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.activitiesLabel}</span>
            <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-6">{t.lifestyle.activitiesHeading}</h2>
            <p className="text-primary-foreground/60 text-sm md:text-base font-light leading-relaxed">{t.lifestyle.activitiesIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.lifestyle.activitiesItems.map((item, i) => {
              const img = activityImages[i];
              return (
                <div key={i} className="group relative overflow-hidden rounded-sm aspect-[3/2]">
                  <img
                    src={img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/80 via-dark-deep/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-primary-foreground text-sm font-medium">{item.title}</h3>
                    <p className="text-gold text-xs tracking-wider">{(item as any).location}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location — 3 continents */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.locationLabel}</span>
            <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-6">{t.lifestyle.locationHeading}</h2>
            <p className="text-primary-foreground/60 text-sm md:text-base font-light leading-relaxed">{t.lifestyle.locationText}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.lifestyle.locationItems.map((item, i) => {
              const Icon = locationIcons[i];
              return (
                <div key={i} className="text-center border border-primary-foreground/10 rounded-sm p-6 hover:border-gold/30 transition-colors duration-500">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold inline-flex mb-4"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-primary-foreground text-sm font-medium mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services & Infrastructure */}
      <section className="py-16 md:py-24 bg-dark/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.servicesLabel}</span>
            <h2 className="text-2xl md:text-4xl font-light text-primary-foreground">{t.lifestyle.servicesHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.lifestyle.servicesItems.map((item, i) => {
              const Icon = servicesIcons[i];
              return (
                <div key={i} className="border border-primary-foreground/10 rounded-sm p-6 hover:border-gold/30 transition-colors duration-500">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold inline-flex mb-4"><Icon className="h-5 w-5" /></div>
                  <h3 className="text-primary-foreground text-sm font-medium mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
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
              <img src={lifestyleCulture} alt="Carnaval de Torres Vedras" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/70 text-xs tracking-wider">Carnaval · Torres Vedras</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block font-light">{t.lifestyle.educationLabel}</span>
              <h2 className="text-2xl md:text-4xl font-light text-primary-foreground mb-6">{t.lifestyle.educationHeading}</h2>
              <p className="text-primary-foreground/60 text-sm md:text-base font-light leading-relaxed">{t.lifestyle.educationIntro}</p>
            </div>
            <div className="relative">
              <img src={lifestyleEducation} alt="Education" className="w-full rounded-sm object-cover aspect-[4/3]" loading="lazy" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.lifestyle.educationItems.map((item, i) => (
              <div key={i} className="border border-primary-foreground/10 rounded-sm p-6 hover:border-gold/30 transition-colors duration-500">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-2 rounded-lg bg-gold/10 text-gold shrink-0"><GraduationCap className="h-5 w-5" /></div>
                  <div>
                    <h3 className="text-primary-foreground text-sm font-medium mb-1">{item.title}</h3>
                    <p className="text-gold text-xs tracking-wider">{(item as any).distance}</p>
                  </div>
                </div>
                <p className="text-primary-foreground/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
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
