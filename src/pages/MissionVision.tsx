import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import teamBooth from "@/assets/team-booth.jpg";
import ceoPhoto from "@/assets/ceo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildBreadcrumbs } from "@/lib/seo-schemas";

const MissionVision = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEO
        path="/missao-visao"
        titlePt="Missão & Visão — VLINGTON Properties | Think Beyond"
        titleEn="Mission & Vision — VLINGTON Properties | Think Beyond"
        descriptionPt="A missão e visão da VLINGTON Properties: criar imóveis de luxo em Portugal que redefinem padrões. Conheça a nossa filosofia Think Beyond."
        descriptionEn="VLINGTON Properties' mission and vision: building luxury real estate in Portugal that redefines standards. Discover our Think Beyond philosophy."
        jsonLd={[
          buildBreadcrumbs([
            { name: lang === "en" ? "Home" : "Início", path: "/" },
            { name: lang === "en" ? "Mission & Vision" : "Missão & Visão", path: "/missao-visao" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Vítor Pereira",
            jobTitle: lang === "en" ? "CEO & Founder" : "CEO & Fundador",
            worksFor: {
              "@type": "Organization",
              name: "VLINGTON Properties",
              url: "https://www.vlington.com",
            },
          },
        ]}
      />
      <Navbar />
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img
          src={teamBooth}
          alt="Equipa VLINGTON Properties no stand"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-dark-deep/20" />
        <div className="relative container mx-auto px-6 pb-12 md:pb-16">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            {t.mission.label}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            {t.mission.heading1}<span className="text-gradient-gold block">{t.mission.heading2}</span>
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">

          {/* Missão + CEO + Visão */}
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">
            {/* Missão */}
            <div className="border-l border-gold/30 pl-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.mission.missionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.mission.missionP1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.mission.missionP2}
              </p>
            </div>

            {/* CEO circle */}
            <div className="flex flex-col items-center justify-start pt-2">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-gold/40 shadow-lg">
                <img
                  src={ceoPhoto}
                  alt="CEO da VLINGTON Properties"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <h3 className="text-foreground font-semibold text-sm mt-4 text-center">Vítor Pereira</h3>
              <p className="text-gold text-xs text-center">{t.mission.ceoRole}</p>
            </div>

            {/* Visão */}
            <div className="border-l border-gold/30 pl-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">{t.mission.visionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.mission.visionP1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t.mission.visionP2prefix}<span className="text-gold font-semibold">"Think Beyond"</span>{t.mission.visionP2suffix}
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-12">{t.mission.valuesTitle}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {t.mission.values.map((v) => (
                <div key={v.title} className="group">
                  <div className="w-12 h-[2px] bg-gold/50 mb-4 group-hover:w-20 transition-all duration-300" />
                  <h3 className="text-foreground font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MissionVision;
