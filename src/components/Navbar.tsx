import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logoNavbar from "@/assets/logo-navbar.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: "Lifestyle", href: "#lifestyle" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: { href: string; isRoute?: boolean }) => {
    e.preventDefault();
    setMenuOpen(false);
    if (link.isRoute) {
      navigate(link.href);
    } else if (isHome) {
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + link.href);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const showSolid = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showSolid
          ? "bg-dark-deep/95 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-3">
          <img src={logoNavbar} alt="VLINGTON Properties" className="h-8 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Language Switcher */}
          <LanguageSwitcher variant="compact" />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primary-foreground"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-dark-deep/95 backdrop-blur-md px-6 pb-6 pt-2 animate-fade-in">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="block py-3 text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors border-b border-primary-foreground/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
