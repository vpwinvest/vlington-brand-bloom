import aboutBg from "@/assets/about-bg.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
              Sobre Nós
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
              Excelência em cada
              <span className="text-gradient-gold block">detalhe</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A VLINGTON Properties dedica-se ao investimento e desenvolvimento de projetos imobiliários de
              excelência, combinando arquitetura contemporânea com ambientes naturais de
              exceção. Cada projeto é pensado ao pormenor para proporcionar experiências
              de vida únicas.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Com uma visão que vai além do convencional — "Think Beyond" — procuramos
              redefinir os padrões do mercado imobiliário de luxo, criando espaços que
              inspiram e elevam.
            </p>
            <div className="flex gap-12">
              <div>
                <span className="text-3xl font-bold text-gradient-gold">20+</span>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Anos de experiência</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient-gold">20M€+</span>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Em projetos</p>
              </div>
              <div>
                <span className="text-3xl font-bold text-gradient-gold">101%</span>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-1">Dedicação</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={aboutBg}
              alt="Modern luxury interior"
              className="w-full h-[500px] object-cover"
              loading="lazy"
              width={1920}
              height={1080}
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
