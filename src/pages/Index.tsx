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
        titlePt="VLINGTON Properties — Casas de Luxo em Portugal | Think Beyond"
        titleEn="VLINGTON Properties — Luxury Real Estate Portugal | Villas Near Lisbon"
        descriptionPt="Imóveis de luxo em Portugal junto ao mar — Torres Vedras, Ericeira, Nazaré e Lisboa. Investimento imobiliário, Golden Visa, NHR. Apoio total a investidores estrangeiros."
        descriptionEn="Luxury real estate Portugal — villas near Lisbon, houses for sale Ericeira, Silver Coast investment property. Golden Visa, NHR & D7 Visa guidance for foreign investors."
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
