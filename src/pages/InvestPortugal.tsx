import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAboutSeoContent } from "@/i18n/seoContent";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import { Link } from "react-router-dom";
import {
  Check, MapPin, Users, Workflow, ArrowRight, ArrowDown,
  TrendingUp, Globe2, ShieldCheck, Sparkles,
} from "lucide-react";

import investHero from "@/assets/invest-hero.jpg";
import investArchitecture from "@/assets/invest-architecture.jpg";
import investCoastMap from "@/assets/invest-coast-map.jpg";
import lifestyleBeach from "@/assets/lifestyle-beach.jpg";

// ========== Reveal-on-scroll wrapper ==========
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
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

// ========== Animated counter ==========
const Counter = ({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(end * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
};

const InvestPortugal = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);
  const [activeTown, setActiveTown] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whyIcons = [ShieldCheck, TrendingUp, Sparkles, Globe2];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        path="/investir"
        titlePt="Investir em Portugal — Imobiliário de Luxo na Costa de Prata | VLINGTON"
        titleEn="Invest in Portugal — Luxury Real Estate on the Silver Coast | VLINGTON"
        descriptionPt="Porquê investir em imobiliário em Portugal: Costa de Prata, Ericeira, Peniche, Nazaré, Torres Vedras. Valorização, fiscalidade NHR/IFICI, D7 e o processo de compra."
        descriptionEn="Why invest in Portugal real estate: Silver Coast, Ericeira, Peniche, Nazaré, Torres Vedras. Appreciation, NHR/IFICI tax regime, D7 visa and the buying process."
        jsonLd={buildBreadcrumbs([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: lang === "en" ? "Invest in Portugal" : "Investir em Portugal", path: "/investir" },
        ])}
      />
      <Navbar />

      {/* ============ HERO PARALLAX ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${scrollY * 0.4}px) scale(1.1)` }}
        >
          <img
            src={investHero}
            alt="Costa de Prata Portugal — falésias atlânticas ao pôr-do-sol"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deep/40 via-dark-deep/30 to-dark-deep" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <Reveal>
            <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 font-light">
              {seo.sectionLabel}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-primary-foreground max-w-5xl leading-[1.05] mb-8">
              {seo.h2Invest}
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <div className="w-16 h-px bg-gold/60 mb-8" />
          </Reveal>
          <Reveal delay={450}>
            <p className="text-primary-foreground/75 text-base md:text-lg font-light max-w-2xl leading-[1.85] mb-12">
              {lang === "en"
                ? "Where the Atlantic meets opportunity — Portugal's most refined coastal investment."
                : "Onde o Atlântico encontra a oportunidade — o investimento costeiro mais refinado de Portugal."}
            </p>
          </Reveal>
          <Reveal delay={600}>
            <a
              href="#why"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("why")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex flex-col items-center gap-3 text-gold/80 hover:text-gold transition-colors"
            >
              <span className="text-xs tracking-[0.3em] uppercase font-light">
                {lang === "en" ? "Discover" : "Descobrir"}
              </span>
              <ArrowDown className="h-5 w-5 animate-bounce" strokeWidth={1.4} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="bg-dark-deep border-y border-gold/10 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {[
              { value: 12, suffix: "%", label: lang === "en" ? "Annual appreciation" : "Valorização anual" },
              { value: 8, suffix: "%", label: lang === "en" ? "Rental yields" : "Yields arrendamento" },
              { value: 300, suffix: "+", label: lang === "en" ? "Days of sun" : "Dias de sol" },
              { value: 60, suffix: " min", label: lang === "en" ? "From Lisbon" : "De Lisboa" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 100} className="text-center">
                <div className="text-4xl md:text-5xl font-extralight text-gradient-gold mb-3">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="text-xs tracking-[0.25em] uppercase text-primary-foreground/55 font-light">
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY INVEST ============ */}
      <section id="why" className="bg-background py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
                {lang === "en" ? "Why Portugal" : "Porquê Portugal"}
              </p>
              <h2 className="text-3xl md:text-5xl font-extralight text-foreground mb-8 leading-[1.15]">
                {seo.h2Why}
              </h2>
              <div className="w-12 h-px bg-gold/60 mb-8" />
              <p className="text-muted-foreground leading-[1.85] mb-6">{seo.whyP1}</p>
              <p className="text-muted-foreground leading-[1.85]">{seo.whyP2}</p>
            </Reveal>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {seo.whyBullets.map((b, i) => {
                const Icon = whyIcons[i];
                return (
                  <Reveal key={i} delay={i * 120}>
                    <div className="group h-full border border-gold/15 rounded-sm p-7 hover:border-gold/50 hover:bg-gold/[0.02] hover:-translate-y-1 transition-all duration-500 cursor-default">
                      <Icon className="h-7 w-7 text-gold mb-5 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.3} />
                      <h3 className="text-foreground text-base font-semibold mb-3 leading-snug">{b.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ARCHITECTURE PARALLAX QUOTE ============ */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${(scrollY - 1200) * 0.2}px) scale(1.1)` }}
        >
          <img
            src={investArchitecture}
            alt="Arquitetura contemporânea junto ao Atlântico"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1600}
            height={1200}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-deep/85 via-dark-deep/60 to-dark-deep/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 max-w-4xl">
            <Reveal>
              <p className="text-gold text-xs tracking-[0.5em] uppercase mb-6 font-light">
                {lang === "en" ? "Vision" : "Visão"}
              </p>
              <blockquote className="text-2xl md:text-4xl lg:text-5xl font-extralight text-primary-foreground leading-[1.2] max-w-3xl">
                {lang === "en"
                  ? "“We don't sell houses. We design lives by the Atlantic.”"
                  : "“Não vendemos casas. Projetamos vidas junto ao Atlântico.”"}
              </blockquote>
              <div className="w-12 h-px bg-gold/60 mt-8" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ SILVER COAST — TOWNS GRID ============ */}
      <section id="costa" className="bg-dark-deep text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 mb-16 items-end">
            <Reveal className="lg:col-span-7">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
                {lang === "en" ? "The Region" : "A Região"}
              </p>
              <h2 className="text-3xl md:text-5xl font-extralight leading-[1.15]">
                {seo.h2Coast}
              </h2>
              <div className="w-12 h-px bg-gold/60 mt-8" />
            </Reveal>
            <Reveal className="lg:col-span-5" delay={150}>
              <p className="text-primary-foreground/70 leading-[1.85] mb-4">{seo.coastP1}</p>
              <p className="text-primary-foreground/55 text-sm leading-[1.85]">{seo.coastP2}</p>
            </Reveal>
          </div>

          {/* Coast image */}
          <Reveal>
            <div className="relative aspect-[21/9] mb-16 overflow-hidden rounded-sm group">
              <img
                src={investCoastMap}
                alt="Vila tradicional na Costa de Prata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                loading="lazy"
                width={1600}
                height={685}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 bg-dark-deep/80 backdrop-blur-sm px-5 py-3 rounded-sm border border-gold/20">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase">Costa de Prata · Portugal</p>
              </div>
            </div>
          </Reveal>

          {/* Interactive towns */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {seo.coastTowns.map((town, i) => {
              const isActive = activeTown === i;
              return (
                <Reveal key={i} delay={i * 80}>
                  <button
                    onClick={() => setActiveTown(isActive ? null : i)}
                    onMouseEnter={() => setActiveTown(i)}
                    className={`group relative w-full text-left border rounded-sm p-7 transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "border-gold/60 bg-gold/[0.04] -translate-y-1"
                        : "border-gold/15 hover:border-gold/40 hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <MapPin className={`h-5 w-5 transition-all duration-500 ${isActive ? "text-gold scale-110" : "text-gold/70"}`} strokeWidth={1.4} />
                      <span className="text-gold/40 text-xs tracking-[0.2em] font-light">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className={`text-lg font-light mb-3 tracking-wide transition-colors ${isActive ? "text-gold" : "text-primary-foreground"}`}>
                      {town.title}
                    </h3>
                    <p className="text-primary-foreground/60 text-sm leading-relaxed">{town.desc}</p>
                    <div
                      className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-700 ${
                        isActive ? "w-full" : "w-0 group-hover:w-1/3"
                      }`}
                    />
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHO FOR ============ */}
      <section id="para-quem" className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <Users className="h-7 w-7 text-gold mx-auto mb-6" strokeWidth={1.3} />
            <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
              {lang === "en" ? "Our Clients" : "Os Nossos Clientes"}
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight text-foreground mb-8 leading-[1.15]">
              {seo.h2WhoFor}
            </h2>
            <div className="w-12 h-px bg-gold/60 mx-auto mb-8" />
            <p className="text-muted-foreground leading-[1.85]">{seo.whoForIntro}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {seo.whoForItems.map((item, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="group relative h-full border border-gold/15 rounded-sm p-7 hover:border-gold/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden bg-background">
                  <div className="absolute top-0 right-0 text-gold/10 text-6xl font-extralight leading-none p-4 group-hover:text-gold/20 transition-colors">
                    0{i + 1}
                  </div>
                  <h3 className="text-foreground text-base font-semibold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="processo" className="bg-dark-deep text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <Workflow className="h-7 w-7 text-gold mb-6" strokeWidth={1.3} />
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
                {lang === "en" ? "The Process" : "O Processo"}
              </p>
              <h2 className="text-3xl md:text-5xl font-extralight mb-8 leading-[1.15]">
                {seo.h2Process}
              </h2>
              <div className="w-12 h-px bg-gold/60 mb-8" />
              <p className="text-primary-foreground/70 leading-[1.85]">{seo.processP1}</p>
            </Reveal>

            <div className="lg:col-span-7">
              <ol className="relative">
                <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/40 via-gold/15 to-transparent" />
                {seo.processSteps.map((s, i) => (
                  <Reveal key={i} delay={i * 150} className="relative pl-20 pb-10 last:pb-0">
                    <div className="absolute left-0 top-0 w-14 h-14 rounded-full border border-gold/40 bg-dark-deep flex items-center justify-center text-gold text-lg font-extralight group-hover:border-gold transition-colors">
                      0{i + 1}
                    </div>
                    <div className="border border-gold/15 rounded-sm p-6 hover:border-gold/40 hover:bg-gold/[0.02] transition-all duration-500">
                      <h3 className="text-primary-foreground text-lg font-light mb-2 tracking-wide">
                        {s.title.replace(/^\d+\.\s*/, "")}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm leading-[1.85]">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LIFESTYLE TEASER ============ */}
      <section className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal className="lg:col-span-5">
              <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
                Lifestyle
              </p>
              <h2 className="text-3xl md:text-4xl font-extralight text-foreground mb-8 leading-[1.15]">
                {seo.h2Lifestyle}
              </h2>
              <div className="w-12 h-px bg-gold/60 mb-8" />
              <p className="text-muted-foreground leading-[1.85] mb-6">{seo.lifestyleP1}</p>
              <p className="text-muted-foreground leading-[1.85] mb-10">{seo.lifestyleP2}</p>
              <Link
                to="/lifestyle"
                className="group inline-flex items-center gap-3 border border-gold/40 text-gold px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-gold/10 transition-all duration-500"
              >
                {lang === "en" ? "Explore the Lifestyle" : "Explorar o Lifestyle"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={150}>
              <div className="relative group overflow-hidden rounded-sm">
                <img
                  src={lifestyleBeach}
                  alt="Praia da Costa de Prata — lifestyle"
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative py-28 md:py-40 bg-dark-deep border-t border-gold/15 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ transform: `translateY(${(scrollY - 4500) * 0.15}px)` }}
        >
          <img src={investHero} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-deep via-dark-deep/85 to-dark-deep" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-3xl">
          <Reveal>
            <Sparkles className="h-7 w-7 text-gold mx-auto mb-8" strokeWidth={1.3} />
            <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground mb-8 leading-[1.15]">
              {lang === "en"
                ? "Ready to invest in Portugal?"
                : "Pronto para investir em Portugal?"}
            </h2>
            <p className="text-primary-foreground/65 text-base md:text-lg max-w-xl mx-auto mb-12 font-light leading-[1.85]">
              {lang === "en"
                ? "Speak with our team and discover the right property for your project — confidentially, without obligation."
                : "Fale com a nossa equipa e descubra o imóvel certo para o seu projeto — com total confidencialidade e sem compromisso."}
            </p>
            <Link
              to="/#contact"
              onClick={() => setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100)}
              className="group inline-flex items-center gap-3 bg-gold text-dark-deep px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold/90 transition-all duration-500 hover:gap-5"
            >
              {lang === "en" ? "Get in touch" : "Falar com a equipa"}
              <ArrowRight className="h-4 w-4 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default InvestPortugal;
