import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Leaf, TreePine, Droplets, Sun } from "lucide-react";
import sustainabilityHero from "@/assets/sustainability-hero.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildBreadcrumbs } from "@/lib/seo-schemas";

const Sustainability = () => {
  const { t, lang } = useLanguage();
  const icons = [Leaf, Sun, Droplets, TreePine];

  return (
    <div className="min-h-screen">
      <SEO
        path="/sustentabilidade"
        titlePt="Sustentabilidade — VLINGTON Properties | Construção Eco em Portugal"
        titleEn="Sustainability — VLINGTON Properties | Eco-Friendly Building Portugal"
        descriptionPt="Construção sustentável em Portugal: eficiência energética, energia solar, gestão de água e materiais ecológicos nos projetos VLINGTON Properties."
        descriptionEn="Sustainable building in Portugal: energy efficiency, solar power, water management and eco materials across VLINGTON Properties' projects."
        jsonLd={buildBreadcrumbs([
          { name: lang === "en" ? "Home" : "Início", path: "/" },
          { name: lang === "en" ? "Sustainability" : "Sustentabilidade", path: "/sustentabilidade" },
        ])}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img
          src={sustainabilityHero}
          alt="Think Beyond — Sustentabilidade VLINGTON Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-dark-deep/20" />
        <div className="relative container mx-auto px-6 pb-12 md:pb-16">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            {t.sustainability.label}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            {t.sustainability.heading}
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-20 text-lg">
            {t.sustainability.intro}
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {t.sustainability.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <div key={item.title} className="group">
                  <Icon className="h-8 w-8 text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300" />
                  <h3 className="text-foreground font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-24 border-l border-gold/30 pl-8 max-w-2xl">
            <p className="text-muted-foreground leading-relaxed">
              {t.sustainability.closing}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Sustainability;
