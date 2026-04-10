import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, TreePine, Droplets, Sun } from "lucide-react";

const Sustainability = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background">
        <div className="container mx-auto px-6">
          <p className="text-gold text-xs tracking-widest-xl uppercase mb-4">
            Compromisso Ambiental
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight">
            Sustentabilidade
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mb-20 text-lg">
            A atividade imobiliária tem um impacto relevante no território e nas
            comunidades. A VLINGTON Properties assume essa realidade como uma
            responsabilidade ambiental permanente.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {[
              {
                icon: Leaf,
                title: "Materiais Sustentáveis",
                desc: "Seleção criteriosa de materiais com menor pegada ecológica e maior durabilidade.",
              },
              {
                icon: Sun,
                title: "Eficiência Energética",
                desc: "Projetos orientados para a maximização do aproveitamento da luz e energia natural.",
              },
              {
                icon: Droplets,
                title: "Gestão de Recursos",
                desc: "Soluções integradas para a utilização responsável de água e recursos naturais.",
              },
              {
                icon: TreePine,
                title: "Integração Paisagística",
                desc: "Respeito pela envolvente natural e valorização da paisagem existente.",
              },
            ].map((item) => (
              <div key={item.title} className="group">
                <item.icon className="h-8 w-8 text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300" />
                <h3 className="text-foreground font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 border-l border-gold/30 pl-8 max-w-2xl">
            <p className="text-muted-foreground leading-relaxed">
              Construir com consciência é construir com futuro. Na VLINGTON,
              cada decisão de projeto considera o seu impacto ambiental — porque
              acreditamos que a excelência e a sustentabilidade caminham lado a lado.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Sustainability;
