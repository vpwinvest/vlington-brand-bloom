import heroBg from "@/assets/hero-bg.jpg";

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
        <p
          className="text-gold text-sm md:text-base tracking-widest-xl uppercase mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          Think Beyond
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest-xl text-primary-foreground mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          VLINGTON
        </h1>
        <p
          className="text-lg md:text-xl tracking-widest-xl text-primary-foreground/70 uppercase mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.7s", opacity: 0 }}
        >
          Properties
        </p>
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="inline-block px-10 py-4 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-dark-deep transition-all duration-500"
          >
            Descobrir Projetos
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
        <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0" />
      </div>
    </section>
  );
};

export default HeroSection;
