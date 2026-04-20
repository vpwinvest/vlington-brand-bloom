import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import LifestyleSection from "@/components/LifestyleSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildFAQSchema } from "@/lib/seo-schemas";

const Index = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen">
      <SEO
        path="/"
        titlePt="Casas de Luxo Junto à Praia em Portugal | Costa de Prata, Ericeira, Peniche, Nazaré — VLINGTON"
        titleEn="Luxury Beachfront Homes Portugal | Silver Coast, Ericeira, Peniche, Nazaré — VLINGTON"
        descriptionPt="Imóveis de luxo junto à praia na Costa de Prata — Ericeira, Peniche, Baleal, Areia Branca, Nazaré, Torres Vedras. Casas perto de Lisboa para surf, golf, ténis, equitação, natureza e mar."
        descriptionEn="Luxury beachfront property on Portugal's Silver Coast — Ericeira, Peniche, Baleal, Areia Branca, Nazaré, Torres Vedras. Villas near Lisbon for surf, golf, tennis, equestrian and nature lovers."
        jsonLd={buildFAQSchema(lang)}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <LifestyleSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
