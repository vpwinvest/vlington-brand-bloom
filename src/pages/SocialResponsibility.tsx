import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tennisClub from "@/assets/tennis-club.jpg";

const SocialResponsibility = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            Responsabilidade Social
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Patrocínios &<span className="text-gradient-gold block">Comunidade</span>
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-16">
            A VLINGTON Properties acredita que o sucesso se constrói em comunidade.
            Por isso, investimos ativamente no apoio ao desporto e ao desenvolvimento
            social da região.
          </p>

          {/* Tennis Club */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={tennisClub}
                alt="Clube de Ténis de Torres Vedras patrocinado pela VLINGTON Properties"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                width={1920}
                height={1440}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/30" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                Clube de Ténis de Torres Vedras
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                A VLINGTON Properties apoia orgulhosamente o Clube de Ténis de Torres
                Vedras, contribuindo para o desenvolvimento do desporto na região e
                incentivando a prática desportiva em todas as idades.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Acreditamos que o desporto promove valores essenciais — disciplina,
                superação e espírito de equipa — valores que também nos definem enquanto
                empresa.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SocialResponsibility;
