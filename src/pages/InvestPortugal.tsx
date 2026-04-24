import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAboutSeoContent } from "@/i18n/seoContent";
import { buildBreadcrumbs } from "@/lib/seo-schemas";
import { Check, MapPin, Users, Workflow } from "lucide-react";

const InvestPortugal = () => {
  const { lang } = useLanguage();
  const seo = getAboutSeoContent(lang);

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

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-16 bg-dark-deep text-primary-foreground">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-light">
            {seo.sectionLabel}
          </p>
          <h1 className="text-4xl md:text-6xl font-extralight leading-[1.1] mb-8">
            {seo.h2Invest}
          </h1>
          <div className="w-12 h-px bg-gold/40 mb-10" />
          <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light mb-6 max-w-3xl">
            {seo.investP1}
          </p>
          <p className="text-primary-foreground/75 text-base md:text-lg leading-[1.9] font-light max-w-3xl">
            {seo.investP2}
          </p>
        </div>
      </section>

      {/* WHY INVEST */}
      <section id="why" className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                {seo.h2Why}
              </h2>
              <div className="w-10 h-px bg-gold/60 mb-8" />
              <p className="text-muted-foreground leading-[1.85] mb-6">{seo.whyP1}</p>
              <p className="text-muted-foreground leading-[1.85]">{seo.whyP2}</p>
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
      </section>

      {/* SILVER COAST */}
      <section id="costa" className="bg-dark/40 border-y border-gold/10 py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight max-w-3xl">
            {seo.h2Coast}
          </h2>
          <div className="w-10 h-px bg-gold/60 mb-8" />
          <p className="text-muted-foreground leading-[1.85] mb-6 max-w-3xl">{seo.coastP1}</p>
          <p className="text-muted-foreground leading-[1.85] mb-12 max-w-3xl">{seo.coastP2}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {seo.coastTowns.map((town, i) => (
              <div
                key={i}
                className="border border-gold/15 rounded-sm p-7 hover:border-gold/40 transition-colors duration-500 bg-background"
              >
                <MapPin className="h-5 w-5 text-gold mb-4" strokeWidth={1.4} />
                <h3 className="text-foreground text-lg font-semibold mb-2">{town.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{town.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO FOR */}
      <section id="para-quem" className="bg-background py-24 md:py-32">
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
                className="border border-gold/15 rounded-sm p-7 hover:border-gold/40 transition-colors duration-500"
              >
                <h3 className="text-foreground text-base font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="processo" className="bg-dark/40 border-y border-gold/10 py-24 md:py-32">
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
                    className="border-l-2 border-gold/40 pl-5 py-2 hover:border-gold transition-colors bg-background"
                  >
                    <h3 className="text-foreground font-semibold mb-1">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE TEASER */}
      <section className="bg-background py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
            {seo.h2Lifestyle}
          </h2>
          <div className="w-10 h-px bg-gold/60 mb-8" />
          <p className="text-muted-foreground leading-[1.85] mb-6">{seo.lifestyleP1}</p>
          <p className="text-muted-foreground leading-[1.85]">{seo.lifestyleP2}</p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default InvestPortugal;
