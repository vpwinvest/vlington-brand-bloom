import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import {
  ArrowRight, Heart, Shield, Sun, Wallet,
  Globe2, Plane, MapPin, ChevronDown,
  Stethoscope, GraduationCap, TramFront,
  UtensilsCrossed, Landmark,
} from "lucide-react";

import lifestyleHero from "@/assets/lifestyle-hero.jpg";
import lifestyleGastro from "@/assets/lifestyle-gastro.jpg";
import lifestyleHospitality from "@/assets/lifestyle-hospitality.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";
import lifestyleHeroVideo from "@/assets/lifestyle-hero-video.mp4.asset.json";

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

/* ---------- Reveal on scroll ---------- */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* ---------- Animated counter ---------- */
const Counter = ({
  end,
  suffix = "",
  duration = 1800,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(end * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

const Lifestyle = () => {
  const { t, lang } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stats = [
    { value: 300, suffix: "+", label: lang === "en" ? "Sunny days/year" : "Dias de sol/ano" },
    { value: 7, suffix: "º", label: lang === "en" ? "Safest country" : "País mais seguro" },
    { value: 3, suffix: "", label: lang === "en" ? "Continents away" : "Continentes à mão" },
    { value: 850, suffix: "km", label: lang === "en" ? "Atlantic coast" : "Costa atlântica" },
  ];

  return (
    <div className="min-h-screen bg-dark-deep overflow-x-hidden">
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

      {/* 1 — HERO with VIDEO BACKGROUND */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0004})`,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={lifestyleHero}
            className="w-full h-full object-cover"
          >
            <source src={lifestyleHeroVideo.url} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/55 to-dark-deep/40" />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <span className="text-gold text-xs tracking-[0.4em] uppercase mb-8 font-light animate-fade-in">
            {t.lifestyle.label}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-primary-foreground max-w-4xl leading-[1.1] mb-6 animate-fade-in">
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
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/60 animate-bounce">
          <ChevronDown className="h-6 w-6" strokeWidth={1.2} />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-dark-deep border-y border-gold/15">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-extralight text-gold mb-2">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-primary-foreground/55 text-[10px] md:text-xs tracking-[0.25em] uppercase font-light">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2 — THINK BEYOND */}
      <section className="py-24 md:py-32 bg-dark-deep relative">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <Reveal>
            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-8 block font-light">
              {t.lifestyle.thinkBeyondLabel}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-10 leading-[1.15]">
              {t.lifestyle.thinkBeyondHeading}
            </h2>
            <div className="w-12 h-px bg-gold/40 mx-auto mb-10" />
          </Reveal>
          <Reveal delay={240}>
            <p className="text-primary-foreground/70 text-base md:text-lg leading-[1.9] font-light">
              {t.lifestyle.thinkBeyondText}
            </p>
            <p className="text-primary-foreground/55 text-sm md:text-base leading-[1.9] font-light mt-6">
              {t.lifestyle.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3 — HOSPITALIDADE */}
      <section className="py-20 md:py-28 bg-dark/40 border-y border-gold/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <Reveal className="lg:col-span-5">
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
            </Reveal>
            <Reveal delay={200} className="lg:col-span-7">
              <div className="relative group overflow-hidden rounded-sm">
                <img
                  src={lifestyleHospitality}
                  alt="Hospitalidade portuguesa — pão e vinho numa vila tradicional"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-[1500ms]"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/30 transition-all duration-700 rounded-sm" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4 — QUALIDADE DE VIDA */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.qualityLifeLabel}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-[1.15]">
                {t.lifestyle.qualityLifeHeading}
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.lifestyle.qualityLifeItems.map((item, i) => {
              const Icon = qualityIcons[i];
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group relative border border-gold/15 rounded-sm p-8 hover:border-gold/50 hover:-translate-y-2 transition-all duration-500 h-full bg-dark-deep/50">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    <Icon className="h-7 w-7 text-gold mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
                    <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5 — LOCALIZAÇÃO */}
      <section className="py-24 md:py-32 bg-dark/40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--gold)) 0%, transparent 60%)`,
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
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
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.lifestyle.locationItems.map((item, i) => {
              const Icon = locationIcons[i];
              return (
                <Reveal key={i} delay={i * 150}>
                  <div className="group text-center border border-gold/15 rounded-sm p-8 hover:border-gold/50 hover:-translate-y-2 transition-all duration-500 bg-dark-deep/50 h-full">
                    <Icon className="h-8 w-8 text-gold mx-auto mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" strokeWidth={1.2} />
                    <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — OUTDOOR & DESPORTO */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
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
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {t.lifestyle.activitiesItems.map((item, i) => (
              <Reveal key={i} delay={(i % 3) * 120}>
                <div className="group relative overflow-hidden rounded-sm aspect-[4/3] cursor-pointer">
                  <img
                    src={activityImages[i]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/40 to-transparent group-hover:from-dark-deep/95 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold text-[10px] tracking-[0.25em] uppercase mb-1">
                      {(item as any).location}
                    </p>
                    <h3 className="text-primary-foreground text-lg font-light tracking-wide">
                      {item.title}
                    </h3>
                    <div className="w-0 group-hover:w-12 h-px bg-gold mt-3 transition-all duration-700" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — SERVIÇOS */}
      <section className="py-24 md:py-32 bg-dark/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Reveal>
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.servicesLabel}
              </span>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-[1.15]">
                {t.lifestyle.servicesHeading}
              </h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {t.lifestyle.servicesItems.map((item, i) => {
              const Icon = servicesIcons[i];
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="group border border-gold/15 rounded-sm p-8 hover:border-gold/50 hover:-translate-y-2 transition-all duration-500 bg-dark-deep/50 h-full">
                    <Icon className="h-7 w-7 text-gold mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
                    <h3 className="text-primary-foreground text-base font-light mb-3 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-primary-foreground/55 text-xs leading-[1.8] font-light">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 — GASTRONOMIA & CULTURA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 md:mb-32">
            <Reveal className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative group overflow-hidden rounded-sm">
                <img
                  src={lifestyleGastro}
                  alt="Gastronomia da Região Oeste"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-[1500ms]"
                  loading="lazy"
                />
              </div>
            </Reveal>
            <Reveal delay={200} className="lg:col-span-5 order-1 lg:order-2">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.gastroLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight text-primary-foreground mb-8 leading-tight">
                {t.lifestyle.gastroHeading}
              </h2>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <div className="space-y-6">
                {t.lifestyle.gastroItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <UtensilsCrossed className="h-4 w-4 text-gold shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" strokeWidth={1.2} />
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
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <span className="text-gold text-xs tracking-[0.4em] uppercase mb-6 block font-light">
                {t.lifestyle.cultureLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-extralight text-primary-foreground mb-8 leading-tight">
                {t.lifestyle.cultureHeading}
              </h2>
              <div className="w-10 h-px bg-gold/40 mb-8" />
              <div className="space-y-6">
                {t.lifestyle.cultureItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start group">
                    {i === 0 ? (
                      <MapPin className="h-4 w-4 text-gold shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" strokeWidth={1.2} />
                    ) : (
                      <Landmark className="h-4 w-4 text-gold shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" strokeWidth={1.2} />
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
            </Reveal>
            <Reveal delay={200} className="lg:col-span-7">
              <div className="relative group overflow-hidden rounded-sm">
                <img
                  src={lifestyleBeach}
                  alt="Costa de Prata"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-[1500ms]"
                  loading="lazy"
                />
                <div className="absolute bottom-4 left-4 bg-dark-deep/80 backdrop-blur-sm px-4 py-2 rounded-sm">
                  <p className="text-primary-foreground/75 text-[10px] tracking-[0.25em] uppercase">
                    Ericeira · Costa de Prata
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9 — CTA FINAL */}
      <section className="relative py-28 md:py-40 bg-dark/40 border-t border-gold/10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--gold)) 0%, transparent 70%)`,
          }}
        />
        <div className="container mx-auto px-6 text-center max-w-3xl relative">
          <Reveal>
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
              className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold/10 hover:border-gold transition-all duration-500"
            >
              {t.lifestyle.closingCta}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Lifestyle;
