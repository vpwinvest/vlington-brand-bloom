import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamBooth from "@/assets/team-booth.jpg";
import teamMeeting from "@/assets/team-meeting.jpg";

const MissionVision = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            Quem Somos
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-12 leading-tight">
            Missão &<span className="text-gradient-gold block">Visão</span>
          </h1>

          {/* Team Photos */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <img
              src={teamBooth}
              alt="Equipa VLINGTON Properties no stand"
              className="w-full h-[320px] object-cover"
              loading="lazy"
            />
            <img
              src={teamMeeting}
              alt="VLINGTON Properties em reunião com cliente"
              className="w-full h-[320px] object-cover object-top"
              loading="lazy"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Missão */}
            <div className="border-l border-gold/30 pl-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Missão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Desenvolver projetos imobiliários de excelência que combinam
                arquitetura contemporânea com ambientes naturais de exceção,
                criando espaços que inspiram e elevam a qualidade de vida.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cada projeto VLINGTON é pensado ao pormenor — desde a escolha do
                terreno até aos acabamentos — para proporcionar experiências de
                vida verdadeiramente únicas.
              </p>
            </div>

            {/* Visão */}
            <div className="border-l border-gold/30 pl-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Visão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Ser a referência no mercado imobiliário de luxo em Portugal,
                reconhecida pela inovação, qualidade e compromisso com a
                excelência em cada detalhe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com a filosofia <span className="text-gold font-semibold">"Think Beyond"</span>,
                procuramos ir além do convencional, redefinindo os padrões do
                setor e antecipando as necessidades de quem procura o
                extraordinário.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-foreground mb-12">Valores</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "Excelência", desc: "Rigor e qualidade em cada pormenor dos nossos projetos." },
                { title: "Inovação", desc: "Soluções criativas que desafiam o convencional." },
                { title: "Compromisso", desc: "Dedicação total aos nossos clientes e parceiros." },
                { title: "Sustentabilidade", desc: "Respeito pelo ambiente e pela comunidade envolvente." },
              ].map((v) => (
                <div key={v.title} className="group">
                  <div className="w-12 h-[2px] bg-gold/50 mb-4 group-hover:w-20 transition-all duration-300" />
                  <h3 className="text-foreground font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MissionVision;
