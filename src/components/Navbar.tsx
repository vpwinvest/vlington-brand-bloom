import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import logoNavbar from "@/assets/logo-navbar.png";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lifestyleOpen, setLifestyleOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { t, lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  type LinkItem = { label: string; href: string; isRoute?: boolean };

  const links: LinkItem[] = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const lifestyleSubLinks: { label: string; path: string }[] = [
    { label: "Lifestyle", path: "/lifestyle" },
    { label: lang === "en" ? "Invest in Portugal" : "Investir em Portugal", path: "/investir" },
    { label: lang === "en" ? "Silver Coast" : "Costa de Prata", path: "/investir#costa" },
    { label: lang === "en" ? "Who We Work With" : "Para Quem Trabalhamos", path: "/investir#para-quem" },
    { label: lang === "en" ? "Buying Process" : "Processo de Compra", path: "/investir#processo" },
  ];

  const handleLinkClick = (e: React.MouseEvent, link: LinkItem) => {
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

  const handleSubLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setLifestyleOpen(false);
    const [route, hash] = path.split("#");
    navigate(route);
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
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
  const isLifestyleActive =
    location.pathname === "/lifestyle" ||
    location.pathname === "/investir" ||
    location.pathname === "/invest";

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
          {links.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Lifestyle dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setLifestyleOpen(true)}
            onMouseLeave={() => setLifestyleOpen(false)}
          >
            <button
              onClick={() => setLifestyleOpen((v) => !v)}
              className={`flex items-center gap-1 text-sm tracking-widest uppercase transition-colors duration-300 ${
                isLifestyleActive ? "text-gold" : "text-primary-foreground/80 hover:text-gold"
              }`}
            >
              Think Beyond
              <ChevronDown className="h-3 w-3" />
            </button>
            {lifestyleOpen && (
              <div className="absolute left-0 top-full pt-3 min-w-[260px]">
                <div className="bg-dark-deep/98 backdrop-blur-md border border-gold/15 shadow-xl py-2">
                  {lifestyleSubLinks.map((sub) => (
                    <a
                      key={sub.path}
                      href={sub.path}
                      onClick={(e) => handleSubLinkClick(e, sub.path)}
                      className="block px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-primary-foreground/75 hover:text-gold hover:bg-gold/5 transition-colors"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact (last) */}
          <a
            href={links[3].href}
            onClick={(e) => handleLinkClick(e, links[3])}
            className="text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors duration-300"
          >
            {links[3].label}
          </a>

          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-4 md:hidden">
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
          {links.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="block py-3 text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors border-b border-primary-foreground/10"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Lifestyle accordion */}
          <button
            onClick={() => setLifestyleOpen(!lifestyleOpen)}
            className="w-full flex items-center justify-between py-3 text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors border-b border-primary-foreground/10"
          >
            Think Beyond
            <ChevronDown
              className={`h-4 w-4 transition-transform ${lifestyleOpen ? "rotate-180" : ""}`}
            />
          </button>
          {lifestyleOpen && (
            <div className="pl-4 border-b border-primary-foreground/10">
              {lifestyleSubLinks.map((sub) => (
                <a
                  key={sub.path}
                  href={sub.path}
                  onClick={(e) => handleSubLinkClick(e, sub.path)}
                  className="block py-2.5 text-xs tracking-[0.2em] uppercase text-primary-foreground/65 hover:text-gold transition-colors"
                >
                  {sub.label}
                </a>
              ))}
            </div>
          )}

          <a
            href={links[3].href}
            onClick={(e) => handleLinkClick(e, links[3])}
            className="block py-3 text-sm tracking-widest uppercase text-primary-foreground/80 hover:text-gold transition-colors border-b border-primary-foreground/10"
          >
            {links[3].label}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
