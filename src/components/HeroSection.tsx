import { useState } from "react";
import { Play, X } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import logoNegative from "@/assets/logo-negative.png";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const { t, lang } = useLanguage();

  const videoId = lang === "en" ? "4Pzildo9hLQ" : "5y1BAoXmk-g";

  return (
    <>
      <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" aria-label="Casas de luxo em Portugal — Luxury homes in Portugal">
        <img
          src={heroBg}
          alt="Casa de luxo em Portugal com piscina infinity e vista mar — Luxury sea view villa in Portugal near Lisbon"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-dark-overlay" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="animate-fade-in-up mb-12"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            <img
              src={logoNegative}
              alt="VLINGTON Properties - Think Beyond"
              className="mx-auto h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          <div
            className="animate-fade-in-up mb-8"
            style={{ animationDelay: "0.7s", opacity: 0 }}
          >
            <button
              onClick={() => setVideoOpen(true)}
              className="group inline-flex items-center gap-3 text-gold/80 hover:text-gold transition-colors duration-300"
              aria-label={t.hero.playLabel}
            >
              <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-gold/60 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500">
                <Play size={22} className="ml-1" fill="currentColor" />
              </span>
              <span className="text-sm tracking-widest uppercase hidden sm:inline">{t.hero.watchVideo}</span>
            </button>
          </div>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "1s", opacity: 0 }}
          >
            <a
              href="#projects"
              className="inline-block px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
            >
              {t.hero.discoverProjects}
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
          <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
        </div>
      </section>

      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setVideoOpen(false)}
        >
          <button
            onClick={() => setVideoOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            aria-label={t.hero.closeVideo}
          >
            <X size={32} />
          </button>
          <div
            className="w-full max-w-4xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={t.hero.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
