import logoSymbol from "@/assets/logo-vlington-symbol.png";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-dark-deep border-t border-primary-foreground/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoSymbol} alt="VLINGTON" className="h-6 w-auto opacity-60" />
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link
              to="/responsabilidade-social"
              className="text-primary-foreground/40 hover:text-gold transition-colors duration-300 text-xs tracking-wider uppercase"
            >
              Responsabilidade Social & Patrocínios
            </Link>
            <span className="hidden md:inline text-primary-foreground/20">|</span>
            <p className="text-primary-foreground/40 text-xs tracking-wider">
              © {new Date().getFullYear()} VLINGTON Properties. Todos os direitos reservados.
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
