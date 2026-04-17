import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import tennisClub from "@/assets/tennis-club.jpg";
import { Heart, Trophy, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildBreadcrumbs } from "@/lib/seo-schemas";

const SocialResponsibility = () => {
  const { t, lang } = useLanguage();
  const icons = [Heart, Trophy, Users];

  return (
    <div className="min-h-screen">
      <SEO
        path="/responsabilidade-social"
        titlePt="Responsabilidade Social & Patrocínios — VLINGTON Properties"
        titleEn="Social Responsibility & Sponsorships — VLINGTON Properties"
        descriptionPt="Responsabilidade social VLINGTON Properties: patrocínios desportivos, apoio à comunidade local e iniciativas em Torres Vedras e Oeste de Portugal."
        descriptionEn="VLINGTON Properties social responsibility: sports sponsorships, local community support and initiatives across Torres Vedras and Portugal's West Coast."
        jsonLd={buildBreadcrumbs([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: lang === "en" ? "Social Responsibility" : "Responsabilidade Social", path: "/responsabilidade-social" },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img
          src={tennisClub}
          alt="Clube de Ténis de Torres Vedras patrocinado pela VLINGTON Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-dark-deep/20" />
        <div className="relative container mx-auto px-6 pb-12 md:pb-16">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            {t.social.label}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            {t.social.heading1}
            <span className="text-gradient-gold block">{t.social.heading2}</span>
          </h1>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg mb-16">
            {t.social.intro}
          </p>

          <div className="grid sm:grid-cols-3 gap-10 mb-24">
            {t.social.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <div key={item.title} className="group">
                  <Icon className="h-8 w-8 text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300" />
                  <h3 className="text-foreground font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tennis Club Feature */}
          <div className="border-t border-border pt-20">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-2">
                <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
                  {t.social.sponsorLabel}
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  {t.social.tennisTitle}
                </h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  {t.social.tennisP1}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.social.tennisP2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialResponsibility;
