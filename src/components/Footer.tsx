import logoSymbol from "@/assets/logo-vlington-symbol.png";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-dark-deep border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoSymbol} alt="VLINGTON" className="h-6 w-auto opacity-60" />
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/missao-visao"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              {t.footer.missionVision}
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <Link
              to="/responsabilidade-social"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              {t.footer.socialResponsibility}
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <Link
              to="/sustentabilidade"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              {t.footer.sustainability}
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <Link
              to="/politica-privacidade"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              {t.footer.privacy}
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <Link
              to="/termos-condicoes"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              {t.footer.terms}
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <p className="text-primary-foreground/40 text-xs tracking-wider">
              © {new Date().getFullYear()} VLINGTON Properties. {t.footer.rights}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/vlington/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/vlington-properties/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/vlington.properties"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
