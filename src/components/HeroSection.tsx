import heroBg from "@/assets/hero-bg.jpg";
import logoNegative from "@/assets/logo-negative.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Luxury villa with infinity pool at sunset"
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
          className="animate-fade-in-up"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="inline-block px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
          >
            Descobrir Projetos
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
        <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
      </div>
    </section>
  );
};

export default HeroSection;
