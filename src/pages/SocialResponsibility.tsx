import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import tennisClub from "@/assets/tennis-club.jpg";
import { Heart, Trophy, Users } from "lucide-react";

const SocialResponsibility = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <img
          src={tennisClub}
          alt="Clube de Ténis de Torres Vedras patrocinado pela VLINGTON Properties"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-deep via-dark-deep/60 to-dark-deep/20" />
        <div className="relative container mx-auto px-6 pb-12 md:pb-16">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            Responsabilidade Social
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
            Patrocínios &
            <span className="text-gradient-gold block">Comunidade</span>
          </h1>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg mb-16">
            A VLINGTON Properties acredita que o sucesso se constrói em
            comunidade. Por isso, investimos ativamente no apoio ao desporto e
            ao desenvolvimento social da região.
          </p>

          <div className="grid sm:grid-cols-3 gap-10 mb-24">
            {[
              {
                icon: Heart,
                title: "Compromisso Social",
                desc: "Contribuímos para o bem-estar das comunidades onde desenvolvemos os nossos projetos.",
              },
              {
                icon: Trophy,
                title: "Apoio ao Desporto",
                desc: "Acreditamos que o desporto promove valores essenciais — disciplina, superação e espírito de equipa.",
              },
              {
                icon: Users,
                title: "Desenvolvimento Local",
                desc: "Investimos no crescimento e na valorização das regiões onde estamos presentes.",
              },
            ].map((item) => (
              <div key={item.title} className="group">
                <item.icon className="h-8 w-8 text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300" />
                <h3 className="text-foreground font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tennis Club Feature */}
          <div className="border-t border-border pt-20">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-2">
                <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
                  Patrocínio
                </p>
                <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Clube de Ténis de Torres Vedras
                </h2>
              </div>
              <div className="md:col-span-3">
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  A VLINGTON Properties apoia orgulhosamente o Clube de Ténis de
                  Torres Vedras, contribuindo para o desenvolvimento do desporto
                  na região e incentivando a prática desportiva em todas as
                  idades.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Valores que também nos definem enquanto empresa — disciplina,
                  superação e espírito de equipa — encontram no desporto a sua
                  expressão mais autêntica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialResponsibility;
