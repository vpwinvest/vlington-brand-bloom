import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import LifestyleSection from "@/components/LifestyleSection";
import FAQSection from "@/components/FAQSection";
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
        titlePt="Comprar Casa de Luxo em Portugal — Costa de Prata, Ericeira, Peniche, Nazaré | VLINGTON"
        titleEn="Buy Property Portugal — Luxury Homes Silver Coast, Ericeira, Peniche, Nazaré | VLINGTON"
        descriptionPt="Comprar casa de luxo em Portugal junto à praia — Costa de Prata, Ericeira, Peniche, Baleal, Areia Branca, Nazaré, Torres Vedras. Investimento imobiliário a 30-60 min de Lisboa, ideal para surf, golf, ténis e qualidade de vida."
        descriptionEn="Buy property in Portugal — luxury homes on the Silver Coast near Lisbon. Beachfront real estate in Ericeira, Peniche, Baleal, Areia Branca, Nazaré and Torres Vedras. Surf lifestyle, golf, tennis and the best places to live in Portugal — invest with VLINGTON."
        jsonLd={buildFAQSchema(lang)}
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <LifestyleSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
