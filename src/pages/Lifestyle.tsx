import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import {
  ArrowRight, Heart, Shield, Sun, Wallet,
  Globe2, Plane, MapPin,
  Stethoscope, GraduationCap, TramFront,
  UtensilsCrossed, Landmark,
} from "lucide-react";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleGastro from "@/assets/lifestyle-gastro.jpg";
import lifestyleCulture from "@/assets/lifestyle-culture.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";

import actSurf from "@/assets/activities/surf-ericeira.jpg";
import actGolf from "@/assets/activities/golf-praia-del-rey.jpg";
import actTenis from "@/assets/activities/tenis-padel.jpg";
import actEquitacao from "@/assets/activities/equitacao-portonovo.jpg";
import actCiclismo from "@/assets/activities/ciclismo.jpg";
import actHiking from "@/assets/activities/hiking-montejunto.jpg";

const activityImages = [actSurf, actGolf, actTenis, actEquitacao, actCiclismo, actHiking];
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

      {/* 1 — HERO */}
      <section className="relative h-screen min-h-[640px]">
        <img
          src={lifestyleHero}
          alt="Portugal — Costa de Prata"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/55 to-dark-deep/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-light">
            {t.lifestyle.label}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-primary-foreground max-w-4xl leading-[1.1] mb-6">
            {t.lifestyle.heroHeading}
          </h1>
          <div className="w-12 h-px bg-gold/60 mb-6" />
          <h2 className="text-base md:text-lg font-light text-gold tracking-[0.25em] uppercase mb-8">
            Think Beyond
          </h2>
          <p className="text-primary-foreground/75 text-base md:text-xl font-light max-w-2xl">
            {t.lifestyle.heroSub}
          </p>
        </div>
      </section>

      {/* 2 — THINK BEYOND (filosofia) */}
      <section className="py-24 md:py-32 bg-dark-deep">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-8 block font-light">
            {t.lifestyle.thinkBeyondLabel}
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-10 leading-[1.15]">
            {t.lifestyle.thinkBeyondHeading}
          </h2>
          <div className="w-12 h-px bg-gold/40 mx-auto mb-10" />
          <p className="text-primary-foreground/70 text-base md:text-lg leading-[1.9] font-light">
            {t.lifestyle.thinkBeyondText}
          </p>
          <p className="text-primary-foreground/55 text-sm md:text-base leading-[1.9] font-light mt-6">
            {t.lifestyle.intro}
          </p>
        </div>
      </section>

      {/* 3 — HOSPITALIDADE */}
      <section className="py-20 md:py-28 bg-dark/40 border-y border-gold/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-5">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.hospitalityLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight text-primary-foreground mb-8 leading-tight">
                {t.lifestyle.hospitalityHeading}
              </h2>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <p className="text-primary-foreground/65 text-base leading-[1.85] font-light">
                {t.lifestyle.hospitalityText}
              </p>
            </div>
            <div className="lg:col-span-7 relative">
              <img
                src={lifestyleCulture}
                alt="Hospitalidade portuguesa"
                className="w-full rounded-sm object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 — QUALIDADE DE VIDA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
              {t.lifestyle.qualityLifeLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-[1.15]">
              {t.lifestyle.qualityLifeHeading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 max-w-6xl mx-auto">
            {t.lifestyle.qualityLifeItems.map((item, i) => {
              const Icon = qualityIcons[i];
              return (
                <div
                  key={i}
                  className="bg-dark-deep p-8 md:p-10 hover:bg-dark/60 transition-colors duration-500"
                >
                  <Icon className="h-6 w-6 text-gold mb-6" strokeWidth={1.2} />
                  <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — LOCALIZAÇÃO (3 continentes) */}
      <section className="py-24 md:py-32 bg-dark/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
              {t.lifestyle.locationLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-8 leading-[1.15]">
              {t.lifestyle.locationHeading}
            </h2>
            <div className="w-10 h-px bg-gold/40 mx-auto mb-8" />
            <p className="text-primary-foreground/65 text-base md:text-lg font-light leading-[1.85]">
              {t.lifestyle.locationText}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.lifestyle.locationItems.map((item, i) => {
              const Icon = locationIcons[i];
              return (
                <div
                  key={i}
                  className="text-center border border-gold/15 rounded-sm p-8 hover:border-gold/40 transition-colors duration-500"
                >
                  <Icon className="h-7 w-7 text-gold mx-auto mb-5" strokeWidth={1.2} />
                  <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — OUTDOOR & DESPORTO */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
              {t.lifestyle.activitiesLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-8 leading-[1.15]">
              {t.lifestyle.activitiesHeading}
            </h2>
            <div className="w-10 h-px bg-gold/40 mx-auto mb-8" />
            <p className="text-primary-foreground/65 text-base md:text-lg font-light leading-[1.85]">
              {t.lifestyle.activitiesIntro}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {t.lifestyle.activitiesItems.map((item, i) => (
              <div key={i} className="group relative overflow-hidden rounded-sm aspect-[4/3]">
                <img
                  src={activityImages[i]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-primary-foreground text-base font-light mb-1 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gold text-[10px] tracking-[0.25em] uppercase">
                    {(item as any).location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — SERVIÇOS E INFRAESTRUTURAS */}
      <section className="py-24 md:py-32 bg-dark/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
              {t.lifestyle.servicesLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-[1.15]">
              {t.lifestyle.servicesHeading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.lifestyle.servicesItems.map((item, i) => {
              const Icon = servicesIcons[i];
              return (
                <div
                  key={i}
                  className="border border-gold/15 rounded-sm p-8 hover:border-gold/40 transition-colors duration-500"
                >
                  <Icon className="h-6 w-6 text-gold mb-6" strokeWidth={1.2} />
                  <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 — GASTRONOMIA & CULTURA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Gastronomia */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <img
                src={lifestyleGastro}
                alt="Gastronomia da Região Oeste"
                className="w-full rounded-sm object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.gastroLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight text-primary-foreground mb-8 leading-tight">
                {t.lifestyle.gastroHeading}
              </h2>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <div className="space-y-6">
                {t.lifestyle.gastroItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <UtensilsCrossed className="h-4 w-4 text-gold shrink-0 mt-1" strokeWidth={1.2} />
                    <div>
                      <h3 className="text-primary-foreground text-sm font-light mb-1 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cultura & Proximidade */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.cultureLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight text-primary-foreground mb-8 leading-tight">
                {t.lifestyle.cultureHeading}
              </h2>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <div className="space-y-6">
                {t.lifestyle.cultureItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {i === 0 ? (
                      <MapPin className="h-4 w-4 text-gold shrink-0 mt-1" strokeWidth={1.2} />
                    ) : (
                      <Landmark className="h-4 w-4 text-gold shrink-0 mt-1" strokeWidth={1.2} />
                    )}
                    <div>
                      <h3 className="text-primary-foreground text-sm font-light mb-1 tracking-wide">
                        {item.title}
                      </h3>
                      <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <img
                src={lifestyleBeach}
                alt="Costa de Prata"
                className="w-full rounded-sm object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                <p className="text-primary-foreground/75 text-[10px] tracking-[0.25em] uppercase">
                  Ericeira · Costa de Prata
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9 — CTA FINAL */}
      <section className="py-28 md:py-40 bg-dark/40 border-t border-gold/10">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-8 block font-light">
            Think Beyond
          </span>
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-6 leading-[1.15]">
            {t.lifestyle.closingHeading}
          </h2>
          <p className="text-primary-foreground/65 text-base md:text-lg max-w-xl mx-auto mb-12 font-light leading-[1.85]">
            {t.lifestyle.closingText}
          </p>
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 100)}
            className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold/10 transition-all duration-500"
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
